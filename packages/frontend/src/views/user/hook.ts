import { errorMessage } from '@/common/message';
import { getUserInfo as getUserInfoReq } from '@/services/modules/user';
import { IBaseUserInfo, IUser, IBaseUserInfoData, IUserInfo, Gender } from '@/types/type';

import { Component, reactive, ref, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
interface ITab {
  label: string;
  value: string;
  component: Component;
  props: Record<string, unknown>;
}
export function useTabs() {
  const route = useRoute();
  const tabs = shallowRef<ITab[]>([
    {
      label: '文章',
      value: 'article',
      component: defineAsyncComponent(() => import('@/views/community/components/communityLeft/communityLeft.vue')),
      props: {
        user_id: route.params['id'],
      },
    },
    {
      label: '评论',
      value: 'comment',
      component: defineAsyncComponent(() => import('@/views/community/components/communityLeft/communityLeft.vue')),
      props: {
        user_id: route.params['id'],
      },
    },
  ]);

  const currentTab = ref<string>(tabs.value.at(0)!.value);
  const toggleTab = (activeName: string) => {};
  return {
    currentTab,
    toggleTab,
    tabs,
  };
}
export function useUserInfo() {
  const userInfo = ref<IUserInfo>({
    uid: 0,
    professional: '',
    origin: '',
    user_uuid: '',
    account: '',
    user_name: '',
    age: 0,
    gender: Gender.None,
    job: '',
    avatar_url: '',
    graduation: '',
    school: '',
    phone: '',
  });
  const getUserInfo = async (id?: string) => {
    const res = await getUserInfoReq({ user_id: id });
    if (res.status !== 0) {
      res.msg && errorMessage(res.msg);
      return;
    }
    userInfo.value = res.data;
  };
  return {
    userInfo,
    getUserInfo,
  };
}
