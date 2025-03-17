'use client';
import Heading from '@/components/heading/Heading';
import useSlugify from '@/hooks/useSlugify';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ComponentsIcons } from '@/assets/icons';
import ServicesCards from '@/components/card/ServicesCard';
import WelcomeBanner from '@/components/card/welcome-banner';
import { RecentActivities } from '@/components/card/recent-activities';

const statsData = [
  { name: 'Services', count: 1, icon: <ComponentsIcons.Box /> },
  { name: 'Products', count: 1, icon: <ComponentsIcons.ShoppingBag /> },
  { name: 'Orders', count: 1, icon: <ComponentsIcons.ClipboardList /> },
  { name: 'Tickets', count: 1, icon: <ComponentsIcons.Ticket /> },
];

const Page = () => {
  const [title, setTitle] = useState('');
  const { slug, toSlug } = useSlugify();

  const showMessage = () => {
    toast.warning('Đây là cảnh báo test!');
    console.log('test');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    toSlug(value);
  };

  return (
    <main className="container mx-auto py-4 w-max-6xl">
      <Heading name="Home Page" />
      <WelcomeBanner />
      <ServicesCards items={statsData} />
      <Heading name="Recent Activities" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RecentActivities />
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề"
            />
          </label>
          <div>
            <label>
              Slug:
              <input type="text" value={slug} readOnly />
            </label>
          </div>

          <button onClick={showMessage}>Test message</button>
        </div>
      </div>
      {/* <p>{userInfo?.data.name || 'null'}</p>
      <p>{userInfo?.data.role.title || 'null'}</p> */}
    </main>
  );
};

export default Page;
