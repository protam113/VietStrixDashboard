'use client';

import Heading from '@/components/heading/Heading';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Heading name="Blog Page" />
      <a href="/blogs/create_blog">Tạo bài viết</a>
    </div>
  );
};

export default Page;
