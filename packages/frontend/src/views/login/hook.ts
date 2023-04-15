import { getLocalStorage } from '@/common/hooks/useLcoalStorage';
import useUserStore, { TOKEN, USERNAME } from '@/store/modules/user';
import { LoginPageType } from './utils/enums';
import { errorMessage, successMessage } from '@/common/message';
import { Tip } from '@/common/tip';
import { omit } from 'lodash';
import { MockDataFinish, MockDataStart, resetPassword } from '@/services/modules/user';
import { useRouter } from 'vue-router';
export function useUserLogin() {
  const router = useRouter();
  const userForm = reactive({ account: '', password: '', verify: '' });
  const { login: __innerLogin, logout, verifyLoginState, loginState, currentPage, setCurrentPage } = useUserStore();
  const setVerifyCode = (code: string) => {
    loginState.verify = code;
  };
  const login = async () => {
    if (loginState.verify.toLowerCase() !== userForm.verify.toLowerCase()) {
      errorMessage(Tip.VERIFY_CODE_INVALID);
      throw new Error(Tip.VERIFY_CODE_INVALID);
    }
    await __innerLogin(userForm, true);
    router.push('/');
  };

  onMounted(() => {
    const token = getLocalStorage(TOKEN),
      username = getLocalStorage(USERNAME);
    token && username && verifyLoginState(token as string, username as string);
  });
  return { userForm, login, logout, currentPage, setCurrentPage, setVerifyCode };
}

export function useUserRegister() {
  const router = useRouter();
  const registerUser = reactive({ account: '', password: '', verify: '', phone: '', repeatPassword: '' });
  const { login: __innerLogin } = useUserStore();
  const register = async () => {
    if (registerUser.verify.length === 0) {
      errorMessage('验证码不能为空');
      throw new Error('验证码不能为空');
    }

    const res = await MockDataFinish({
      phone: registerUser.phone,
      code: parseInt(registerUser.verify),
    });
    if (!res) {
      errorMessage('验证码错误，请重新输入');
      throw new Error('验证码错误');
    }
    await __innerLogin(omit(registerUser, ['repeatPassword', 'verify']), false);
    router.push('/');
  };
  return {
    registerUser,
    register,
  };
}
export function useResetUserPassword() {
  const router = useRouter();
  const userPasswordForm = reactive({
    phone: '',
    verifyCode: '',
    password: '',
    repeatPassword: '',
  });
  const resetUserPassword = async () => {
    const res = await resetPassword(omit(userPasswordForm, ['verifyCode', 'repeatPassword']));
    if (res.status === 0) {
      router.push('/');
      successMessage('重置密码成功');
    } else {
      errorMessage(res.msg || '重置密码失败');
    }
  };
  return {
    userPasswordForm,
    resetUserPassword,
  };
}
