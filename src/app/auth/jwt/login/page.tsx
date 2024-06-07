import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Ingame.uz: Авторизоваться',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
