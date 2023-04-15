import EditLayout from '@/layout/user/editLayout.vue';

export default {
  path: '/user/edit',
  name: 'edit',
  component: () => import('@/views/mine/index.vue'),
  meta: {
    title: '个人中心 - 个人信息',
    navName: '个人信息',
    icon: 'el-icon-document',
  },
  children: [
    {
      path: 'profile',
      name: 'editUserInfo',
      meta: {
        title: '个人中心 - 编辑资料',
        navName: '编辑资料',
        icon: 'el-icon-setting',
      },
      component: () => import('@/views/mine/edit/edit.vue'),
    },

    {
      path: 'updatePhone',
      name: 'updatePhone',
      component: () => import('@/views/mine/edit/updatePhone.vue'),
      meta: {
        title: '个人中心 - 绑定手机号',
        navName: '绑定手机号',
        icon: 'el-icon-phone',
      },
    },
  ],
};
