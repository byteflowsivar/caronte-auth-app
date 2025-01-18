import { NextResponse } from 'next/server';
import { env } from '@/config/env';

export async function GET() {
  const changePasswordUrl = `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/account`;
  console.log(changePasswordUrl);
  return NextResponse.redirect(changePasswordUrl, { status: 301 });
}
