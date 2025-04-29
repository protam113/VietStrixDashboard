'use client';

import PushButton from '@/components/button/PushButton';
import Container from '@/components/container/Container';
import Heading from '@/components/heading/Heading';
import BlogListData from '@/components/pages/Blog/BlogList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Heading name="Blog Page" />
        <PushButton href="/blogs/create_blog" label="Create Blog" />
      </div>

      <BlogListData />
    </Container>
  );
};

export default Page;
