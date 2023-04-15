import EditLayout from '@/layout/user/editLayout.vue';

export default {
  path: '/user',
  children: [
    {
      path: 'edit',
      name: 'edit',
      component: () => import('@/views/mine/index.vue'),
      meta: {
        title: '个人中心 - 个人信息',
        navName: '个人信息',
        icon: 'el-icon-document',
      },
      children: [
        // {
        //   path: 'phone',
        //   name: 'updatePhone',
        //   component: () => import('@/views/mine/edit/edit.vue'),
        // },
        {
          path: 'profile',
          name: 'edit',
          component: () => import('@/views/mine/edit/edit.vue'),
        },
      ],
    },
    {
      path: 'profile',
      name: 'Profile',
      component: EditLayout,

      children: [
        {
          path: ':id',
          name: 'space',
          component: () => import('@/views/user/space.vue'),
          meta: {
            title: '个人中心 - 个人信息',
            navName: '个人信息',
            icon: 'el-icon-document',
          },
        },
      ],
    },
    // {
    //   path: 'setting',
    //   name: 'Setting',
    //   component: () => import('@/views/mine/setting.vue'),
    //   meta: {
    //     title: '个人中心 - 用户设置',
    //     navName: '用户设置',
    //     icon: 'el-icon-setting',
    //   },
    // },
    // {
    //   path: 'posts',
    //   name: 'Posts',
    //   component: () => import('@/views/mine/userPost.vue'),
    //   meta: {
    //     title: '帖子管理 - 内容管理',
    //     navName: '帖子管理',
    //     icon: 'el-icon-document-copy',
    //   },
    // },
    // {
    //   path: 'articles',
    //   name: 'Articles',
    //   component: () => import('@/views/mine/userArticle.vue'),
    //   meta: {
    //     title: '文章管理 - 内容管理',
    //     navName: '文章管理',
    //     icon: 'el-icon-reading',
    //   },
    // },
  ],
};
