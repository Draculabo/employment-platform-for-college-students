<script setup lang="ts">
import { ref, reactive } from 'vue';
import Motion from '../utils/motion';
import type { FormInstance } from 'element-plus';
import { useVerifyCode } from '../utils/verifyCode';
import { useRenderIcon } from '@/components/icon/src/hooks';
import Lock from '@iconify-icons/ri/lock-fill';
import Iphone from '@iconify-icons/ep/iphone';
import { successMessage } from '@/common/message';
import { useUserLogin, useResetUserPassword } from '../hook';
import { LoginPageType } from '../utils/enums';
import { userForm } from '@/layout/header/hook';
const loading = ref(false);
const { currentPage, setCurrentPage } = useUserLogin();
const ruleFormRef = ref<FormInstance>();
const { isDisabled, text } = useVerifyCode();
const { userPasswordForm, resetUserPassword } = useResetUserPassword();
const repeatPasswordRule = [
  {
    validator: (rule, value: string, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if (userPasswordForm.password !== value) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    },
    trigger: 'blur',
  },
];

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await resetUserPassword();
      loading.value = false;
    } else {
      loading.value = false;
      return fields;
    }
  });
};

function onBack() {
  useVerifyCode().end();
  setCurrentPage(LoginPageType.登录);
}
</script>

<template>
  <el-form ref="ruleFormRef" :model="userPasswordForm" size="large">
    <Motion>
      <el-form-item prop="phone">
        <el-input clearable v-model="userPasswordForm.phone" placeholder="手机号码" :prefix-icon="useRenderIcon(Iphone)" />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item prop="verifyCode">
        <div class="w-full flex justify-between">
          <el-input
            clearable
            v-model="userPasswordForm.verifyCode"
            placeholder="请输入验证码"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
          />
          <el-button :disabled="isDisabled" class="ml-2" @click="useVerifyCode().start(ruleFormRef, 'phone')">
            {{ text.length > 0 ? text + '秒后重新获取' : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="password">
        <el-input clearable show-password v-model="userPasswordForm.password" placeholder="密码" :prefix-icon="useRenderIcon(Lock)" />
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input
          clearable
          show-password
          v-model="userPasswordForm.repeatPassword"
          placeholder="确认密码"
          :prefix-icon="useRenderIcon(Lock)"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item>
        <el-button class="w-full" size="default" type="primary" :loading="loading" @click="onUpdate(ruleFormRef)"> 确定 </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="300">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack"> 返回 </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
