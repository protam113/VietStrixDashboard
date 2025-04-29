'use client';

import * as React from 'react';
import { ComponentsIcons } from '@/assets/icons';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavService } from './nav-services';
import { NavSupport } from './nav-support';
import { useAuthStore } from '@/store/authStore';
import { NavRole } from './nav-role';
import { NavBlog } from './nav-blog';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: ComponentsIcons.LayoutDashboard,
    },

    {
      title: 'Documentation',
      url: '/document',
      icon: ComponentsIcons.BookOpen,
    },

    {
      title: 'Tracking',
      url: '/users',
      icon: ComponentsIcons.GroupIcon,
    },
  ],
  navService: [
    {
      title: 'Orders  ',
      url: '#',
      icon: ComponentsIcons.ReceiptText,
    },
    {
      title: 'Services ',
      url: '#',
      icon: ComponentsIcons.SquareGanttChart,
    },
    {
      title: 'Products',
      url: '/products',
      icon: ComponentsIcons.ShoppingBasket,
    },

    {
      title: 'Categories',
      url: '/categories',
      icon: ComponentsIcons.ShoppingBasket,
    },
  ],
  navAuth: [
    {
      title: 'Role',
      url: '/roles',
      icon: ComponentsIcons.Shield,
    },
    {
      title: 'Employee',
      url: '/employee',
      icon: ComponentsIcons.Users,
    },
    {
      title: 'No Active',
      url: '/no-active',
      icon: ComponentsIcons.ShieldBan,
    },
    {
      title: 'User',
      url: '/users',
      icon: ComponentsIcons.GroupIcon,
    },
    {
      title: 'SEO',
      url: '/users',
      icon: ComponentsIcons.GroupIcon,
    },
    {
      title: 'System Logs',
      url: '/users',
      icon: ComponentsIcons.GroupIcon,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: ComponentsIcons.Settings2,
    // },
  ],
  navBlog: [
    {
      title: 'Blog',
      url: '/blogs',
      icon: ComponentsIcons.ShoppingBasket,
    },
    {
      title: 'Service',
      url: '/blogs',
      icon: ComponentsIcons.ShoppingBasket,
    },
    {
      title: 'Project',
      url: '/blogs',
      icon: ComponentsIcons.ShoppingBasket,
    },

    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: ComponentsIcons.Settings2,
    // },
  ],
  navSupport: [
    {
      title: 'Tickets ',
      url: '/tickets',
      icon: ComponentsIcons.Ticket,
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: ComponentsIcons.Contact,
    },
    {
      title: 'FaQ',
      url: '/faq',
      icon: ComponentsIcons.Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>VietStrix</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {userInfo?.role?.title === 'admin' && <NavRole items={data.navAuth} />}
        <NavService items={data.navService} />
        <NavBlog items={data.navBlog} />
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
