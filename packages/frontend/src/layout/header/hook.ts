import { successMessage, errorMessage } from '@/common/message';
import { Router } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

import useUserStore, { TOKEN, USERNAME } from '@/store/modules/user';
import { getLocalStorage } from '@/common/hooks/useLcoalStorage';

import { queryUserInfoById, updateUserInfo } from '@/services/modules/user';
import { Gender, IResponse, IUserInfo } from '@/types/type';
import { getUserInfo } from '../../services/modules/user';
import { Tracing } from 'trace_events';

export function useUpdateInfoModel() {
  const infoModel = ref(false);
  function setInfoModel() {
    infoModel.value = !infoModel.value;
  }
  return {
    infoModel,
    setInfoModel,
  };
}

export const userForm = reactive<IUserInfo>({
  user_uuid: '',
  uid: 0,
  user_name: '',
  account: '',
  gender: Gender.None,
  phone: '',
  age: 0,
  job: '',
  professional: '',
  graduation: '',
  work_city: '',
  school: '',
  avatar_url: '',
  origin: '',
  introduction: '',
});
export function useUserInfo() {
  async function updateInfo(toggle?: Function) {
    const { userInfo, setUserInfo } = useUserStore();
    // 格式化时间 只需要年份
    userForm.graduation = String(new Date(userForm.graduation).getFullYear());
    // const data = await updateUserInfo(userForm);
    const data = {} as any;
    if (data.status == 200) {
      toggle?.();
      data.msg && successMessage(data.msg);
      setUserInfo(userInfo, userForm);
    } else {
      data.msg && errorMessage(data.msg);
    }
  }
  async function getInfo() {
    const { data } = await getUserInfo();
    Reflect.ownKeys(data).forEach((v) => {
      Reflect.set(userForm, v, Reflect.get(data, v));
    });
  }

  return {
    updateInfo,
    getInfo,
  };
}

export function useUserLogin() {
  const user = reactive({ account: '', password: '', verify: '' });
  const { login, logout, verifyLoginState } = useUserStore();

  onMounted(() => {
    const token = getLocalStorage(TOKEN),
      username = getLocalStorage(USERNAME);
    token && username && verifyLoginState(token as string, username as string);
  });

  return {
    user,
    login,
    logout,
  };
}

export function useNavigator(router: Router, path: string) {
  const { loginState, loginModelToggle } = useUserStore();
  if (!loginState.loginStatus) {
    loginModelToggle();
    return;
  }
  router.push(path);
}

export function useRegister() {
  const model = ref(false),
    registerUser = reactive({ account: '', password: '', verify: '' });
  const { genVerify } = useUserStore();

  function toggleModel() {
    model.value = !model.value;
    genVerify();
  }
  return {
    model,
    registerUser,
    toggleModel,
  };
}

export function useMessage() {
  const messageModal = ref(false),
    tab = ref(0);

  function toggleMessageModal() {
    messageModal.value = !messageModal.value;
  }

  function msgTabChange(idx: number) {
    tab.value = idx;
  }

  return {
    tab,
    messageModal,
    msgTabChange,
    toggleMessageModal,
  };
}
// 修改密码
export function useUpdatePWDModel() {
  const PWDModel = ref(false);
  function setPWDModel() {
    PWDModel.value = !PWDModel.value;
  }
  return {
    PWDModel,
    setPWDModel,
  };
}
