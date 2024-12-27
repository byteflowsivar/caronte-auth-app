import UserInfo from '@/lib/entities/user-info';

const user: UserInfo = {
  id: '1',
  name: 'Victor Hugo Cornejo',
  email: 'm@example.com',
  avatar: 'https://github.com/shadcn.png',
};

export async function GET() {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(Response.json(user));
    }, 5000);
  });
}
