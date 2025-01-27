import * as React from 'react';
import { ShieldCheck } from 'lucide-react';
import { env } from '@/config/env';

export function CompanyInfo() {
  const applicationName = env.NEXT_PUBLIC_APPLICATION_NAME;
  const companyName = env.NEXT_PUBLIC_COMPANY_NAME;
  return (
    <div className="flex flex-row gap-4">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <ShieldCheck className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{applicationName}</span>
        <span className="truncate text-xs">{companyName}</span>
      </div>
    </div>
  );
}
