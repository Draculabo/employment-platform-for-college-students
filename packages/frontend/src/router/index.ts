import { getLocalStorage } from '@/common/hooks/useLcoalStorage';
import { TOKEN } from '@/store/modules/user';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

/* 统一导入路由 */
const routeFiles = import.meta.globEager('./modules/*');
export const routeConfigures: RouteRecordRaw[] = [];

Object.keys(routeFiles).forEach((routeModule) => {
  (routeFiles[routeModule] as any).default && routeConfigures.push((routeFiles[routeModule] as any).default);
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/download/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404/index.vue'),
  },
];

const topInitList = ['/community/detail', '/syntax/helper', '/update/line', '/home'];
const router = createRouter({
  routes: routeConfigures.concat(routes),
  history: createWebHashHistory(),
  scrollBehavior: (to, from, savePos) => {
    if (topInitList.includes(to.path)) return { top: 0 /*  behavior: 'smooth' */ };
    if (savePos) return savePos;
  },
});

router.beforeEach((...args) => {
  const [to, from] = args;
  if (to.fullPath.includes('login')) {
    return;
  }
  const res = getLocalStorage(TOKEN);
  if (!res) {
    router.push('/login');
  }
});
export default router;
