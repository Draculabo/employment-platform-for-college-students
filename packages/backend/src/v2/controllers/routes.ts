import { oauthRouters } from './auth/routes';
import { CommentRoutes } from './comment/routes';
import { loginRoutes } from './login/routes';
import { userRouters } from './user/routes';
export const v2Routes = [userRouters, CommentRoutes, oauthRouters, loginRoutes];
