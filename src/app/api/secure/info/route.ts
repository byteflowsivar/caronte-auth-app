import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/_auth-option';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } else {
    console.log(`--------------TOKEN GET TOKEN---------------`);
    console.log(token);

    return NextResponse.json({
      name: session.user?.name,
      email: session.user?.email,
      avatar: session.user?.image,
    });
  }
}
