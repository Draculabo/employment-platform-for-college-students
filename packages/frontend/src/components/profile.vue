<script lang="ts" setup>
import { onActivated, onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

import { useUserInfo, userForm } from '@/layout/header/hook';
import { professionals } from '@/common/utils/professional';
import { errorMessage } from '@/common/message';
import { ImageUpload } from '@/common/utils/uploader';
import { uploadAvatarFinish, uploadAvatarStart } from '@/services/modules/user';
import { CLOUD_STORAGE_OSS_ALIBABA_CONFIG } from '@/constants/process';
import axios from 'axios';
import useUserStore from '@/store/modules/user';
const { getInfo } = useUserInfo();
const { updateToken: updateAvatar } = useUserStore();
const emits = defineEmits(['cancel', 'submit']);
const ruleFormRef = ref<FormInstance>(),
  uploadInput = ref();
const rules = reactive<FormRules>({
  user_name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 1, max: 16, message: '1～16字', trigger: 'blur' },
  ],
  school: [
    { required: true, message: '请输入输入你所就读的院校', trigger: 'blur' },
    { min: 4, max: 20, message: '4～20字', trigger: 'blur' },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  professional: [{ required: true, message: '请选择意向岗位', trigger: 'blur' }],
  graduation: [{ required: true, message: '请选择毕业时间', trigger: 'blur' }],
  origin: [
    { required: true, message: '请输入你所在的地区', trigger: 'blur' },
    { max: 10, min: 2, message: '2～10字', trigger: 'blur' },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      emits('submit');
      console.log('submit!');
    }
  });
};
const USER_AVATAR_SIZE_LIMIT = 5242880;
const uploadAvatar = async function () {
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
    const avatar_url = `${ticket.ossDomain}/${ticket.ossFilePath}`;
    userForm.avatar_url = avatar_url;
    updateAvatar(uploadAvatarFinishRes.data.token);
  } catch (e) {
    errorMessage(<string>e);
  }
};
onActivated(() => {
  getInfo();
});
onMounted(() => {
  getInfo();
});
</script>
<template>
  <el-form ref="ruleFormRef" :model="userForm" :rules="rules" label-width="100px" status-icon>
    <el-form-item label-width="80px">
      <label for="user_avatar_upload">
        <img class="pointer" :src="userForm.avatar_url" alt="头像" />
      </label>
      <input type="file" ref="uploadInput" id="user_avatar_upload" accept=".png,.jpg,.jpeg" @change="uploadAvatar" />
    </el-form-item>
    <el-form-item label="性别" prop="gender" required>
      <el-radio-group v-model="userForm.gender">
        <el-radio label="男" value="0" />
        <el-radio label="女" value="1" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户昵称" prop="user_name" required>
      <el-input class="input" v-model="userForm.user_name" placeholder="网上冲浪的昵称" />
    </el-form-item>
    <el-form-item label="毕业院校" prop="school" required>
      <el-input class="input" v-model="userForm.school" placeholder="你所就读的院校" />
    </el-form-item>
    <el-form-item label="意向岗位" prop="job" required>
      <el-select v-model="userForm.job" placeholder="选择你的意向岗位">
        <el-option v-for="prof in professionals" :label="prof" :value="prof" />
      </el-select>
    </el-form-item>
    <el-form-item label="毕业时间" prop="graduation">
      <el-date-picker v-model="userForm.graduation" type="year" placeholder="毕业时间" />
    </el-form-item>
    <el-form-item label="所在地区" prop="origin">
      <el-input class="input" v-model="userForm.origin" />
    </el-form-item>

    <el-form-item label="手机号码" prop="phone" required>
      <el-input class="input" v-model="userForm.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交修改</el-button>
      <!-- <el-button @click="$emit('cancel')">取消</el-button> -->
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
#user_avatar_upload {
  display: none;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.input {
  width: 190px;
}
</style>
