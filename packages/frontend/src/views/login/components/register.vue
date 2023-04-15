<script setup lang="ts">
import { ref, reactive } from 'vue';
// import Motion from '../utils/motion';
// import { message } from '@/utils/message';
// import { updateRules } from '../utils/rule';
import type { FormInstance, FormRules } from 'element-plus';
import { useVerifyCode } from '../utils/verifyCode';
// import { useUserStoreHook } from '@/store/modules/user';
// import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Lock from '@iconify-icons/ri/lock-fill';
import Iphone from '@iconify-icons/ep/iphone';
import User from '@iconify-icons/ri/user-3-fill';
import { useRenderIcon } from '@/components/icon/src/hooks';
import { successMessage } from '@/common/message';
import { useUserLogin, useUserRegister } from '../hook';
import { LoginPageType } from '../utils/enums';
import { useRouter } from 'vue-router';
import { omit } from 'lodash';
import { MockDataStart } from '@/services/modules/user';
const { setCurrentPage } = useUserLogin();
const { register, registerUser } = useUserRegister();
const checked = ref(false);
const loading = ref(false);
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const { isDisabled, text } = useVerifyCode();
const repeatPasswordRule = [
  {
    validator: (_, value: string, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (registerUser.password !== value) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    },
    trigger: 'blur',
  },
];
const formRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const reg = /^1[3-9]\d{9}$/;
        if (value && !reg.test(value)) {
          callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }
      },
      message: '请输入正确的手机号码',
      trigger: 'blur',
    },
  ],
});
const sendMessage = async () => {
  useVerifyCode().start(ruleFormRef.value, 'phone');

  await ruleFormRef.value!.validateField('phone', async (isValid) => {
    if (isValid) {
      await MockDataStart({
        phone: registerUser.phone,
      });
    }
  });
};
const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = false;
      await register();
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
  <el-form ref="ruleFormRef" :rules="formRules" :model="registerUser" size="large">
    <Motion>
      <el-form-item prop="account">
        <el-input clearable v-model="registerUser.account" placeholder="用户名" :prefix-icon="useRenderIcon(User)" />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item prop="phone">
        <el-input clearable v-model="registerUser.phone" placeholder="手机号" :prefix-icon="useRenderIcon(Iphone)" />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="verify">
        <div class="w-full flex justify-between">
          <el-input
            clearable
            v-model="registerUser.verify"
            placeholder="请输入验证码"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
          />
          <el-button :disabled="isDisabled" class="ml-2" @click="() => sendMessage()">
            {{ text.length > 0 ? text + '秒后重新获取' : '发送验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item prop="password">
        <el-input clearable show-password v-model="registerUser.password" placeholder="密码" :prefix-icon="useRenderIcon(Lock)" />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input clearable show-password v-model="registerUser.repeatPassword" placeholder="确认密码" :prefix-icon="useRenderIcon(Lock)" />
      </el-form-item>
    </Motion>

    <Motion :delay="350">
      <el-form-item>
        <el-button class="w-full" size="default" type="primary" :loading="loading" @click="onUpdate(ruleFormRef)"> 确定 </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="400">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack"> 返回 </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
