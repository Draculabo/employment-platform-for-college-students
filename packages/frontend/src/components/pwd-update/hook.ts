import useUserStore from '@/store/modules/user';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import VerificationCode, { createCode } from 'picture-verification-code';
import { onMounted, ref } from 'vue';
import { pwdUpdate } from '@/services/modules/user';
import { useUserLogin } from '@/layout/header/hook';

export function useSubmit(emits: Function) {
  const { logout } = useUserStore();
  const form = ref({ newPassword: '', oldPassword: '', verify: '' });
  const imgSrc = ref('');
  const codeInstance = new VerificationCode();
  let verifyCode = '';
  // 提交修改
  async function submit() {
    if (form.value.newPassword.trim() === '' || form.value.oldPassword.trim() === '') {
      return errorMessage('信息请填写完整!');
    }
    if (form.value.verify.trim().toLowerCase() != verifyCode.toLowerCase()) {
      return errorMessage('验证码不正确，请重新尝试！');
    }
    const { status, msg } = await pwdUpdate({
      newPassword: form.value.newPassword,
      oldPassword: form.value.oldPassword,
    });
    if (status === 0) {
      logout();
      return;
    }
    msg && errorMessage(msg);
  }
  function genCode() {
    verifyCode = createCode();
    imgSrc.value = codeInstance.render(verifyCode);
  }
  function cancel() {
    genCode();
    emits('cancel');
  }
  onMounted(genCode);
  return {
    form,
    imgSrc,
    genCode,
    cancel,
    submit,
  };
}
