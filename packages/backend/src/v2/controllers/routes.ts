import { articleRoutes } from './article/routes';
import { oauthRouters } from './auth/routes';
import { CommentRoutes } from './comment/routes';
import { gptRoutes } from './gpt/routes';
import { groupRoutes } from './group/routes';
import { loginRoutes } from './login/routes';
import { resumeRoutes } from './resume/routes';
import { roleRoutes } from './role/routes';
import { phoneRouters } from './user/binding/platform/phone/routes';
import { userRouters } from './user/routes';
export const v2Routes = [
  userRouters,
  CommentRoutes,
  oauthRouters,
  loginRoutes,
  articleRoutes,
  groupRoutes,
  roleRoutes,
  resumeRoutes,
  gptRoutes,
  phoneRouters,
];
