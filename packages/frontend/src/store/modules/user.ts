import { defineStore } from 'pinia';
import pinia from '@/store';
import VerificationCode, { createCode } from 'picture-verification-code';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/common/hooks/useLcoalStorage';
import { errorMessage, successMessage } from '@/common/message';
import { Tip } from '@/common/tip';
import { UserBaseInfo, login, logout, registerUser, verify } from '@/services/modules/user';
import { userForm } from '@/layout/header/hook';
import { Gender, IBaseUserInfo, IResponse, IUser, IUserInfo } from '@/types/type';
import { descryToken } from '@/common/utils/token';
import { assign, get, isNil, omit, pick } from 'lodash';
import { LoginPageType } from '@/views/login/utils/enums';

const codeInstance = new VerificationCode();
export const TOKEN = 'TOKEN',
  USERNAME = 'USERNAME',
  SET_TOKEN = 'SET_TOKEN',
  SET_USERNAME = 'SET_USERNAME';

export const initialInfo: IUserInfo = {
  uid: 0,
  user_uuid: '',
  user_name: '',
  account: '',
  gender: Gender.None,
  phone: '',
  job: '',
  age: 0,
  professional: '',
  graduation: '',
  school: '',
  avatar_url: '',
  origin: '',
};
const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: initialInfo,
      loginState: {
        loginStatus: false, // 登录态
        loginModel: false,
        verify: '', // 验证码
        verifyImg: '', // 验证码图片
      },
      token: getLocalStorage(TOKEN),
      currentPage: LoginPageType.登录,
    };
  },
  actions: {
    async login(user: IUser, isLogin: boolean) {
      if (!user.account || !user.password) {
        errorMessage(Tip.BE_INCOMPLETE);
        throw new Error(Tip.BE_INCOMPLETE);
      }
      const cb = isLogin ? login : registerUser;
      const res = await cb(user);

      if (res.status === 0) {
        this.loginState.loginStatus = true;
        this.loginModelToggle();
        const data = descryToken(res.data.token) as UserBaseInfo; // 更新用户信息
        this.setUserInfo(this.userInfo, data);
        this.setUserInfo(userForm, data);
        // 缓存重要信息
        setLocalStorage(TOKEN, res.data.token);
        setLocalStorage(USERNAME, data.account);
      } else {
        res.msg && errorMessage(res.msg);
        throw new Error('登录失败');
      }
    },
    logout() {
      removeLocalStorage(TOKEN);
      removeLocalStorage(USERNAME);
      location.reload();
    },
    verifyLoginState(token: string, username: string) {
      if (isNil(token)) {
        return;
      }
      this.loginState.loginStatus = true;
      const data = descryToken(token) as any;
      data.user_uuid = data.userUUID;

      this.setUserInfo(this.userInfo, data);
      this.setUserInfo(userForm, data);
      // this.setUserInfo(this.userInfo, res.data);
      // this.setUserInfo(userForm, res.data);
    },
    loginModelToggle() {
      this.loginState.loginModel = !this.loginState.loginModel;
      this.genVerify();
    },
    genVerify() {
      // this.loginState.verify = createCode();
      // this.loginState.verifyImg = codeInstance.render(this.loginState.verify);
    },
    setUserInfo(target: IUserInfo, userInfo: Partial<IUserInfo>) {
      // = assign({}, this.$state.userInfo, userInfo);
      // this.userInfo = assign({}, target, userInfo) as IUserInfo;
      Reflect.ownKeys(target).forEach((v) => {
        Reflect.set(target, v, get(userInfo, [v], Reflect.get(target, v)));
      });
    },
    updateToken(token: string) {
      const data = descryToken(token) as UserBaseInfo;
      setLocalStorage(TOKEN, token);
      setLocalStorage(USERNAME, data.username);
      this.setUserInfo(this.userInfo, pick(data, ['avatar_url', 'user_uuid', 'username']));
    },
    setCurrentPage(page: LoginPageType) {
      this.currentPage = page;
    },
  },
});

export default () => useUserStore(pinia);
