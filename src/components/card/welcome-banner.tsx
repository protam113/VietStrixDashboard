'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WelcomeBannerProps } from '@/types/componentsType';
import { useAuthStore } from '@/store/authStore';
import avatar from '@/assets/coder.png';

export default function WelcomeBanner({
  message = "Here's your latest financial status. You're expected to hit the benchmark. Keep up the good work!",
}: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-[#013162] bg-opacity-90 rounded-lg overflow-hidden shadow-md transition-all duration-500 ease-in-out">
      <div className="flex flex-col md:flex-row items-center justify-between p-6">
        <div className="space-y-3 md:w-1/2 mb-6 md:mb-0">
          <h2
            className={`text-white font-semibold text-2xl transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Hello {userInfo?.name}!
          </h2>
          <p
            className={`text-indigo-100 text-sm md:text-base max-w-md transform transition-all duration-700 delay-100 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            {message}
          </p>
        </div>
        <div
          className={`md:w-1/2 flex justify-center md:justify-end transform transition-all duration-700 delay-300 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          <div className="relative overflow-hidden hover:scale-105 transition-transform duration-500 ease-in-out">
            <Image
              src={avatar}
              alt="People working together"
              width={300}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
