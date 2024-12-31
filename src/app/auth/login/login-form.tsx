'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
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
              <Button
                variant="default"
                className="w-full"
                onClick={() => signIn('keycloak', { callbackUrl: '/secure/dashboard' })}
              >
                <LogIn className="size-4" />
                Ingresar
              </Button>
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
