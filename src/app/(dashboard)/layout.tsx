'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Loading from '@/components/Loading/shuffle-loader';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AuthProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * ==========================
   * 📌 @HOOK useAuthStore
   * ==========================
   *
   * @desc Hook to check authentication
   */
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  /**
   * ==========================
   * 📌 @USEFFECT useEffect
   * ==========================
   *
   * @desc Effect to check authentication
   */

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        await checkAuth();
        if (isMounted) setAuthChecked(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false; // Prevent state updates after unmount
    };
  }, [checkAuth]);

  /**
   * ==========================
   * 📌 @USEFFECT useEffect
   * ==========================
   *
   * @desc Effect to check authentication
   */

  useEffect(() => {
    if (authChecked && !loading && !isAuthenticated) {
      setTimeout(() => {
        router.replace('/login');
      }, 3000);
    }
  }, [isAuthenticated, loading, router, authChecked]);

  // Show loading state while checking authentication
  if (loading || !authChecked) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // Only render the layout and children if authenticated
  return isAuthenticated ? <DefaultLayout>{children}</DefaultLayout> : null;
}
