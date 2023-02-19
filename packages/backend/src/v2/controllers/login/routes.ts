import { Server } from '@/utils/RegisterRouter';
import { login } from './login';
import { LoginSchema } from '@/v2/services/login/login.schema';
import { register } from './register';
import { registerSchema } from '@/v2/services/login/register.schema';

export const loginRoutes = (server: Server): void => {
  server.post('login', login, {
    schema: LoginSchema,
    auth: false,
  });
  server.post('register', register, {
    schema: registerSchema,
    auth: false,
  });
};
