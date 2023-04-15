import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};
export default routes;
