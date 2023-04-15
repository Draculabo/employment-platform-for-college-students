<template>
  <div class="update-phone-container">
    <el-row :gutter="20" class="form-item items-center">
      <span class="form-label">手机号码：</span>
      <el-row class="form-item items-center" style="flex: 1">
        <el-input v-model="phoneInput" class="w-50 m-2" placeholder="请输入手机号码" />
        <el-button @click="sendVerifyCode" :disabled="sendVerifyCodeRef !== '发送验证码'" style="width: 100px">{{
          sendVerifyCodeRef
        }}</el-button>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="form-item items-center">
      <span class="form-label">验证码：</span>
      <el-input v-model="verifyCode" class="w-50 m-2" placeholder="请输入验证码" />
    </el-row>
    <el-button class="primary submit-button" @click="updatePhone">确认修改</el-button>
  </div>
</template>
<script setup lang="ts">
import { useUpdateUserPhone } from './hook';
const { phoneInput, verifyCode, sendVerifyCodeRef, sendVerifyCode, updatePhone } = useUpdateUserPhone();
</script>
<style lang="scss" scoped>
.form-label {
  min-width: 100px;
}
.update-phone-container {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 20px;
  gap: 20px;
}
.form-item {
  flex-wrap: nowrap;
}
.submit-button {
  width: 150px;
}
</style>
