'use client';

import React from 'react';
import Heading from '@/components/heading/Heading';
import Container from '@/components/container/Container';

const Page = () => {
  return (
    <Container>
      {/* Tiêu đề chính */}
      <Heading name="📖Welcome to the Document Center!" />

      {/* Mô tả ngắn gọn */}
      <p className="text-gray-600 text-lg mt-4 max-w-2xl">
        Here you will find all the detailed instructions and documentation about
        our system. Start now to discover the interesting things!🚀
      </p>

      {/* Các danh mục tài liệu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-3xl">
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold">🚀 Bắt đầu</h3>
          <p className="text-gray-500 text-sm mt-2">
            Basic tutorial to get you familiar with the system.
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold">💡 Tính năng</h3>
          <p className="text-gray-500 text-sm mt-2">
            Learn more about the featured features.{' '}
          </p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold">⚙️ Hướng dẫn</h3>
          <p className="text-gray-500 text-sm mt-2">
            Steps to install, integrate and use the service.{' '}
          </p>
        </div>
      </div>

      {/* Nút bắt đầu */}
      {/* <Link 
        href="/docs"
        className="mt-10 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Khám phá tài liệu 📚
      </Link> */}
    </Container>
  );
};

export default Page;
