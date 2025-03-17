import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiServiceAuth, endpoints } from '@/api/api';
import { toast } from 'sonner';

const apiHandle = apiServiceAuth;
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
}

// API key from environment variables
const getApiKey = () => process.env.NEXT_PUBLIC_API_KEY || '';

// Common headers for API requests
const getHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('api-key', getApiKey());
  return headers;
};

// Utility functions for managing cookies manually (without js-cookie)
const setCookie = (
  name: string,
  value: string,
  options: {
    expires?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
) => {
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

  document.cookie = cookieString; // Note: HttpOnly cannot be set via JS
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Lax;`;
};

// Zustand store with correct typing
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      userInfo: null,

      // Login function with specific error handling
      login: async (username: string, password: string): Promise<boolean> => {
        try {
          set({ loading: true, error: null });

          const response = await fetch(`${apiHandle}${endpoints.login}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ username, password }),
            credentials: 'include',
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 400) {
              // Không gọi checkAuth nếu lỗi 401 hoặc 400
              throw new Error(
                'Incorrect login information, please check your account and password'
              );
            }
            const { message } = await response.json();
            throw new Error(message || 'Login failed');
          }

          const { status, message } = await response.json();

          if (status === 'success') {
            setCookie('isAuthenticated', 'true', {
              expires: 7,
              secure: true,
              sameSite: 'Lax',
            });

            // Chỉ gọi checkAuth khi đăng nhập thành công (status 200)
            await get().checkAuth();
            set({ isAuthenticated: true, loading: false });
            toast.success('Login successful! Redirecting to home page..');
            return true;
          } else {
            throw new Error(message || 'Login failed');
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'An unknown error occurred';
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: errorMessage,
          });
          deleteCookie('isAuthenticated');
          localStorage.removeItem('auth-storage');
          toast.error(errorMessage);
          return false;
        }
      },

      // Fetch user information
      fetchUserInfo: async () => {
        if (!get().isAuthenticated) return;

        try {
          set({ loading: true });

          const response = await fetch(`${apiHandle}${endpoints.currentUser}`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }

          const { status, data } = await response.json();

          if (status === 'success' && data) {
            set({ userInfo: data, loading: false });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to fetch user information';
          set({ loading: false, error: errorMessage });
          toast.error(errorMessage);
        }
      },

      // Logout function
      logout: async () => {
        try {
          set({ loading: true });

          const response = await fetch(`${apiHandle}${endpoints.logout}`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to logout on server');
          }

          const { status, message } = await response.json();
          if (status !== 'success') {
            throw new Error(message || 'Logout failed');
          }

          // Xóa cookie và trạng thái
          deleteCookie('isAuthenticated');
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });
          localStorage.removeItem('auth-storage');

          toast.success('Log out successfully!');

          // Chuyển hướng ngay lập tức
          window.location.href = '/login';
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'An unknown error occurred';
          console.error('Error during logout:', errorMessage);

          // Xóa cookie và trạng thái
          deleteCookie('isAuthenticated');
          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: errorMessage,
          });
          localStorage.removeItem('auth-storage');

          // Chuyển hướng ngay lập tức
          window.location.href = '/login';
        }
      },

      // Check authentication status
      checkAuth: async () => {
        // Kiểm tra cookie trước khi gọi API
        const isAuthenticatedCookie = document.cookie.includes(
          'isAuthenticated=true'
        );
        if (!isAuthenticatedCookie) {
          set({ isAuthenticated: false, userInfo: null, loading: false });
          localStorage.removeItem('auth-storage');
          return;
        }

        try {
          const response = await fetch(`${apiHandle}${endpoints.currentUser}`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const { status, data } = await response.json();

          if (status === 'success' && data) {
            const userRole = data.role?.title;
            console.log('User role:', userRole);

            const allowedRoles = ['employee', 'admin', 'manager'];

            if (!allowedRoles.includes(userRole)) {
              console.warn(`Unauthorized role: ${userRole}. Logging out...`);
              toast.error('You do not have access. Logging out...');
              deleteCookie('isAuthenticated');
              localStorage.removeItem('auth-storage');
              get().logout();
              return;
            }

            setCookie('isAuthenticated', 'true', {
              expires: 7,
              secure: true,
              sameSite: 'Lax',
            });
            set({ isAuthenticated: true, userInfo: data, loading: false });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          console.error('checkAuth error:', error);
          deleteCookie('isAuthenticated');
          localStorage.removeItem('auth-storage');
          get().logout();
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
          ? { id: state.userInfo.id, role: state.userInfo.role } // Only store id and role
          : null,
      }),
    }
  )
);

// Utility function for making authenticated requests
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    ...getHeaders(),
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

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
