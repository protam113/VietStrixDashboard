import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiServiceAuth, endpoints } from '@/api/api';
import { toast } from 'sonner';
import { logDebug, logError, logWarn } from '@/lib/logger';

// Define proper types for user data
interface UserRole {
  id: string;
  title: string;
  slug: string;
}

interface UserData {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  name: string;
  email: string;
  dob: string;
  position: string;
  phone_number: string;
  contact: string;
  is_active: boolean;
  role: UserRole;
}

// Define minimal type for persisted user info (non-sensitive data only)
interface PersistedUserInfo {
  id: string;
  role: UserRole;
}

// Define the complete state type with proper typing
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userInfo: UserData | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

/**
 * ==========================
 * 📌 @CLASS AuthAPI
 * ==========================
 *
 * @desc Authentication API service responsible for user authentication operations such as login, logout, and fetching user details.
 * This class provides static methods to communicate with the authentication service.
 *
 * @method getApiKey - Retrieves the API key from environment variables for authentication.
 * @method getHeaders - Constructs the necessary headers for API requests, including content type and API key.
 * @method login - Sends a login request with the provided username and password, returning authentication status.
 * @method getCurrentUser - Fetches details of the currently authenticated user.
 * @method logout - Logs the user out by invalidating their session on the server.
 *
 * @example
 * ```ts
 * const { response, data } = await AuthAPI.login("user@example.com", "password123");
 * if (response.ok) {
 *    console.log("Login successful", data);
 * } else {
 *    console.error("Login failed", data);
 * }
 * ```
 */

class AuthAPI {
  /**
   * Retrieves the API key from environment variables.
   * @private
   * @returns {string} API key for authentication requests.
   */
  private static getApiKey() {
    return process.env.NEXT_PUBLIC_API_KEY || '';
  }

  /**
   * Constructs the necessary headers for API requests.
   * @private
   * @returns {Headers} HTTP headers with Content-Type and API key.
   */
  private static getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('api-key', this.getApiKey());
    return headers;
  }

  /**
   * Authenticates a user with their username and password.
   * @static
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{ response: Response, data: any }>} Response object and parsed data from API.
   */
  static async login(username: string, password: string) {
    const response = await fetch(`${apiServiceAuth}${endpoints.login}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    const data = await response.json();
    return { response, data };
  }

  /**
   * Fetches the currently authenticated user's details.
   * @static
   * @returns {Promise<{ response: Response, data: any }>} Response object and user data.
   */
  static async getCurrentUser() {
    const response = await fetch(`${apiServiceAuth}${endpoints.currentUser}`, {
      method: 'GET',
      headers: this.getHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    return { response, data };
  }

  /**
   * Logs the user out by clearing their session.
   * @static
   * @returns {Promise<{ response: Response, data: any }>} Response object and API response data.
   */
  static async logout() {
    const response = await fetch(`${apiServiceAuth}${endpoints.logout}`, {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    return { response, data };
  }
}

// Cookie management helpers
class CookieManager {
  static set(
    name: string,
    value: string,
    options: {
      expires?: number;
      secure?: boolean;
      sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
  ) {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    cookieString += '; path=/';

    if (options.secure && process.env.NODE_ENV === 'production')
      cookieString += '; Secure';

    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;

    document.cookie = cookieString;
  }

  static delete(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${
      process.env.NODE_ENV === 'production' ? 'Secure;' : ''
    } SameSite=Lax;`;
  }

  static check(name: string): boolean {
    return document.cookie.includes(`${name}=true`);
  }
}

// Centralized error handling
const handleAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

// Zustand store with correct typing and performance optimizations
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      userInfo: null,

      clearError: () => set({ error: null }),

      /**
       * ==========================
       * 📌 @HOOK useLoginAuthStore
       * ==========================
       *
       * @desc Custom hook for managing user authentication.
       * It provides login functionality, authentication state, and error handling.
       *
       * @returns {Object} Authentication store
       * @returns {boolean} return.isAuthenticated - Whether the user is authenticated.
       * @returns {User | null} return.userInfo - The currently logged-in user.
       * @returns {boolean} return.loading - Indicates if a login request is in progress.
       * @returns {string | null} return.error - Stores the error message if login fails.
       * @returns {(username: string, password: string) => Promise<boolean>} return.login - Handles user login.
       * @returns {() => Promise<void>} return.checkAuth - Validates user authentication status.
       */

      login: async (username: string, password: string): Promise<boolean> => {
        try {
          set({ loading: true, error: null });

          const { response, data } = await AuthAPI.login(username, password);

          if (!response.ok) {
            if (response.status === 401 || response.status === 400) {
              throw new Error(
                'Incorrect login information, please check your account and password'
              );
            }
            throw new Error(data.message || 'Login failed');
          }

          if (data.status === 'success') {
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              secure: true,
              sameSite: 'Lax',
            });

            // Only call checkAuth on successful login
            await get().checkAuth();
            // Fetch user info after successful login
            logDebug('User info fetched successfully');
            toast.success('Login successful! Redirecting to home page..');
            return true;
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          const errorMessage = handleAuthError(error);

          // Atomically update state to prevent multiple renders
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: errorMessage,
          });

          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');
          toast.error(errorMessage);
          return false;
        }
      },

      /**
       * ==========================
       * 📌 @HOOK useFetchUserInfo
       * ==========================
       *
       * @desc Custom hook for fetching user information.
       *
       * @returns {Object} User information store
       * @returns {User | null} return.userInfo - The currently logged-in user.
       * **/

      fetchUserInfo: async () => {
        if (!get().isAuthenticated) return;

        try {
          set({ loading: true });

          const { response, data } = await AuthAPI.getCurrentUser();

          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }

          if (data.status === 'success' && data.data) {
            // Only update userInfo to prevent unnecessary renders
            set({ userInfo: data.data, loading: false });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          const errorMessage = handleAuthError(error);
          set({ loading: false, error: errorMessage });
          toast.error(errorMessage);
        }
      },

      /**
       * ==========================
       * 📌 @HOOK logout
       * ==========================
       *
       * @desc Custom hook for handling user logout.
       *
       * @returns {Object} Logout store
       * @returns {() => Promise<void>} return.logout - Handles user logout.
       **/
      logout: async () => {
        try {
          set({ loading: true });

          // Try server logout but don't depend on it for local logout
          try {
            const { response } = await AuthAPI.logout();

            if (!response.ok) {
              console.warn(
                'Server logout failed, continuing with local logout'
              );
            }
          } catch (error) {
            // Log but proceed with local logout even if server logout fails
            logWarn('Server logout error:', error);
          }

          // Always perform local logout
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          toast.success('Log out successfully!');
          window.location.href = '/login';
        } catch (error) {
          // This catch block should rarely be hit due to the try/catch in the server logout
          logError('Catastrophic error during logout:', error);

          // Force logout anyway
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: handleAuthError(error),
          });

          window.location.href = '/login';
        }
      },

      /**
       * ==========================
       * 📌 @HOOK useCheckAuthStore
       * ==========================
       *
       * @desc Custom hook for checking user authentication status.
       *
       * @returns {Object} Authentication status store
       * @returns {boolean} return.isAuthenticated - Whether the user is authenticated.
       * @returns {() => Promise<void>} return.checkAuth - Validates user authentication status.
       * */

      checkAuth: async () => {
        // Check cookie first before making API call
        if (!CookieManager.check('isAuthenticated')) {
          set({ isAuthenticated: false, userInfo: null, loading: false });
          localStorage.removeItem('auth-storage');
          return;
        }

        try {
          set((state) => ({ ...state, loading: true })); // Only update loading

          const { response, data } = await AuthAPI.getCurrentUser();

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          if (data.status === 'success' && data.data) {
            const userRole = data.data.role?.title;
            const allowedRoles = ['employee', 'admin', 'manager'];

            if (!allowedRoles.includes(userRole)) {
              logWarn(`Unauthorized role: ${userRole}. Logging out...`);
              toast.error('You do not have access. Logging out...');

              // Clean up and logout
              CookieManager.delete('isAuthenticated');
              localStorage.removeItem('auth-storage');

              // Call logout without making another API call
              set({
                isAuthenticated: false,
                userInfo: null,
                loading: false,
                error: null,
              });

              window.location.href = '/login';
              return;
            }

            // Extend authentication cookie
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              secure: true,
              sameSite: 'Lax',
            });

            set({
              isAuthenticated: true,
              userInfo: data.data,
              loading: false,
            });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          logError('checkAuth error:', error);

          // Clean up and redirect
          CookieManager.delete('isAuthenticated');
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          // Skip calling get().logout() to avoid multiple API calls
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'auth-storage',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
      partialize: (
        state: AuthState
      ): { isAuthenticated: boolean; userInfo: PersistedUserInfo | null } => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo
          ? {
              id: state.userInfo.id,
              role: state.userInfo.role,
            }
          : null,
      }),
    }
  )
);

// Utility function for making authenticated requests with better error handling
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // Ensure a single function is used for building headers
  const headers = new Headers(options.headers);

  // Add auth headers
  headers.append('Content-Type', 'application/json');
  headers.append('api-key', process.env.NEXT_PUBLIC_API_KEY || '');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Logout on authentication failure
    if (response.status === 401) {
      useAuthStore.getState().logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
