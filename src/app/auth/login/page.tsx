import { ShieldCheck } from 'lucide-react';

import { LoginForm } from '@/app/auth/login/login-form';

export default function LoginPage() {
  const applicationName = process.env.NEXT_PUBLIC_APPLICATION_NAME || 'Application Name';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Company Name';

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-8" />
          </div>
          <div className={'flex flex-col'}>
            <span className="text-lg font-semibold">{applicationName}</span>
            <span className="justify-end text-end">{companyName}</span>
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
