'use client';

import * as React from 'react';
import { AudioWaveform, Command, Frame, Map, PieChart, ShieldCheck } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { CompanyInfo } from '@/components/CompanyInfo';
import { useEffect } from 'react';
import UserInfo from '@/lib/entities/user-info';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navMain, setNavMain] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({} as UserInfo);

  useEffect(() => {
    fetch('/api/auth/info')
      .then((response) => response.json())
      .then((data) => setUserInfo(data));
  }, []);

  useEffect(() => {
    fetch('/api/protected/menu')
      .then((response) => response.json())
      .then((data) => setNavMain(data));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyInfo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
