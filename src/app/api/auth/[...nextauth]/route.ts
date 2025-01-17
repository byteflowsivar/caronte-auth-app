import { authOptions } from '@/app/api/auth/[...nextauth]/_auth-option';
import NextAuth, { AuthOptions } from 'next-auth';

// Para obtener más información sobre cada opción (y una lista completa de opciones), vaya a
// https://next-auth.js.org/configuration/options

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
