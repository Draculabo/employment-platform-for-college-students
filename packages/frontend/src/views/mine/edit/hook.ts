import { errorMessage, successMessage } from '@/common/message';
import { CLOUD_STORAGE_OSS_ALIBABA_CONFIG } from '@/constants/process';
import { getUserInfo, updateUserInfo, uploadAvatarFinish, uploadAvatarStart } from '@/services/modules/user';
import useUserStore from '@/store/modules/user';
import { Gender, IUserInfo } from '@/types/type';
import axios from 'axios';
import { FormRules } from 'element-plus';
import { isEmpty, isNil, pick } from 'lodash';
import { VNodeRef } from 'vue';

export function useUpdateUserAvatar() {
  const USER_AVATAR_SIZE_LIMIT = 5242880;
  const { updateToken, userInfo } = useUserStore();
  const avatar_url = shallowRef<string>(userInfo.avatar_url);
  const uploadInput = ref();
  const uploadAvatar = async () => {
    try {
      const files = uploadInput.value.files as FileList;
      const file = files[0];
      if (file.size >= USER_AVATAR_SIZE_LIMIT) {
        errorMessage('内容不能超过5M');
        throw new Error('upload avatar size limit');
      }
      const ticket = (
        await uploadAvatarStart({
          fileName: file.name,
          fileSize: file.size,
        })
      ).data;
      const formData = new FormData();
      const encodedFileName = encodeURIComponent(file.name);
      formData.append('key', ticket.ossFilePath);
      formData.append('name', file.name);
      formData.append('policy', ticket.policy);
      formData.append('OSSAccessKeyId', CLOUD_STORAGE_OSS_ALIBABA_CONFIG.accessKey);
      formData.append('success_action_status', '200');
      formData.append('callback', '');
      formData.append('signature', ticket.signature);
      formData.append('Content-Disposition', `attachment; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`);
      formData.append('file', file);

      await axios.post(ticket.ossDomain, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadAvatarFinishRes = await uploadAvatarFinish({
        fileUUID: ticket.fileUUID,
      });
      const url = `${ticket.ossDomain}/${ticket.ossFilePath}`;
      avatar_url.value = url;
      // userForm.avatar_url = avatar_url;
      updateToken(uploadAvatarFinishRes.data.token);
      if (uploadAvatarFinishRes.status === 0) {
        successMessage('上传头像成功');
      } else {
        errorMessage(uploadAvatarFinishRes.msg || '上传头像失败');
      }
    } catch (e) {
      errorMessage(<string>e);
    }
  };
  const toggleAvatar = (e: Event) => {
    if (e.target) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        avatar_url.value = event.target.result;
      };
    }
  };
  return {
    avatar_url,
    uploadAvatar,
    uploadInput,
    toggleAvatar,
  };
}
export function useUpdateUserInfo() {
  const userForm = reactive<any>({
    user_name: '',
    gender: Gender.None,
    age: 0,
    job: '',
    // graduation: '',
    // work_city: '',
    school: '',
    // avatar_url: '',
    // origin: '',
    introduction: '',
  });

  async function updateInfo(toggle?: Function) {
    const { userInfo, setUserInfo } = useUserStore();
    const data = await updateUserInfo(userForm);
    if (data.status == 0) {
      toggle?.();
      if (data.msg) {
        successMessage(data.msg);
      } else {
        successMessage('修改成功');
      }
      setUserInfo(userInfo, userForm);
    } else {
      data.msg && errorMessage(data.msg);
    }
  }
  async function getInfo() {
    const { data } = await getUserInfo();
    const pickData = pick(data, ['user_name', 'gender', 'age', 'job', 'school', 'introduction']);
    Reflect.ownKeys(pickData).forEach((v) => {
      const value = Reflect.get(pickData, v);
      if (isEmpty(value)) {
        return;
      }
      Reflect.set(userForm, v, Reflect.get(pickData, v));
    });
  }
  return {
    userForm,
    updateInfo,
    getInfo,
  };
}

export function useUpdateUserPhone() {
  const phoneInput = ref();
  const verifyCode = ref();
  const sendVerifyCodeRef = ref<string>('发送验证码');
  function sendVerifyCode() {
    let times = 60;
    if (isNil(sendVerifyCodeRef.value)) {
      throw new Error('not select ref');
    }
    let timer = setInterval(() => {
      if (times === 1) {
        sendVerifyCodeRef.value = '发送验证码';
        times = 60;
        clearInterval(timer);
        return;
      }
      sendVerifyCodeRef.value = `${--times}`;
    }, 1000);
  }
  function updatePhone() {}
  return {
    phoneInput,
    verifyCode,
    sendVerifyCode,
    updatePhone,
    sendVerifyCodeRef,
  };
}
