import NextAuth, { NextAuthOptions, Profile, Session } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { decodeToken } from 'react-jwt';


// Para obtener más información sobre cada opción (y una lista completa de opciones), vaya a
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        let decodedToken;
        if (account) {
          decodedToken = decodeToken(account.access_token as any);
          if (token == null) {
            throw new Error('Unnable to decode token');
          }
          profile = decodedToken as Profile;
          token.account = account;
        }
        if (profile) {
          token.profile = profile;
          const clientRoles = profile.realm_access.roles;
          token.client_roles = clientRoles;
        }

        console.log('NODE_ENV => ', process.env.NODE_ENV)

        if (process.env.NODE_ENV === 'development') {
          console.log('--------------ACCOUNT---------------');
          console.log(account);
          console.log('--------------ACCESS TOKEN ---------------');
          console.log(decodedToken);
          console.log('--------------ROLES---------------');
          console.log(token.client_roles);
          console.log('--------------PROFILE---------------');
          console.log(profile);
        }

      } catch (error) {
        console.log(error);
      }
      return token;
    },
    async session({ session, token, trigger }) {
      console.log('async session accessed');

      session.account = token.account;
      session.profile = token.profile;
      session.roles = token.client_roles;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
