import { NextResponse } from 'next/server';
import { env } from '@/config/env';

export async function GET() {
  const urlLogout = `${env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(env.NEXTAUTH_URL)}&client_id=${env.KEYCLOAK_CLIENT_ID}`;
  console.log(urlLogout);
  return NextResponse.redirect(urlLogout);
}
