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
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { NavService } from './nav-services';
import { NavSupport } from './nav-support';
import { useAuthStore } from '@/store/authStore';
import { NavRole } from './nav-role';
import Link from 'next/link';

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
      url: '#',
      icon: ComponentsIcons.ShoppingBasket,
    },
    {
      title: 'Blog',
      url: '#',
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
      url: '#',
      icon: ComponentsIcons.Contact,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: ComponentsIcons.Settings2,
    // },
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
        <SidebarMenuButton tooltip="Blogs" className="ml-2">
          <ComponentsIcons.Contact className="text-lg" />
          <Link href="blogs">
            <span className="text-lg">Blogs</span>
          </Link>
        </SidebarMenuButton>
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
