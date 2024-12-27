import * as React from 'react';

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
import fetchData from '@/lib/fetch-data';
import UserInfo from '@/lib/entities/user-info';
import NavItem from '@/lib/entities/nav-item';

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = await fetchData<UserInfo>('/api/auth/info');
  const navMain = await fetchData<NavItem[]>('/api/protected/menu');

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
