import UserInfo from '@/lib/entities/user-info';

const user: UserInfo = {
  id: '1',
  name: 'Victor Hugo Cornejo',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

export async function GET() {
  return Response.json(user);
}
