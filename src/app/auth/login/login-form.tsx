'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const onSignIn = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await signIn('keycloak', { callbackUrl: '/secure/dashboard' });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
          <CardDescription>Ingresa con tus credenciales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <form onSubmit={onSignIn}>
                <Button variant="default" className="w-full" type="submit">
                  <LogIn className="size-4" />
                  Ingresar
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Todos los derechos reservados © {new Date().getFullYear()}
      </div>
    </div>
  );
}
