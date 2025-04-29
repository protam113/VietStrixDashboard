'use client';

import RadiatingLoaderNoBg from '@/components/Loading/LoadingNoBg';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AuthProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading); // nếu có trạng thái loading
  const isAuthenticated = !!userInfo; // kiểm tra userInfo có tồn tại
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        // Giả định checkAuth là function nào đó bạn gọi khi login — bỏ nếu không cần
        // await checkAuth();
        if (isMounted) setAuthChecked(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) setAuthChecked(true);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (authChecked) {
      if (!isAuthenticated || userInfo?.role?.title !== 'admin') {
        toast.error('You do not have permission to access this page!');
        router.replace('/');
      }
    }
  }, [authChecked, isAuthenticated, userInfo, router]);

  if (!authChecked || loading) {
    return (
      <div>
        <RadiatingLoaderNoBg />
      </div>
    );
  }

  return isAuthenticated && userInfo?.role?.title === 'admin' ? (
    <>{children}</>
  ) : null;
}
