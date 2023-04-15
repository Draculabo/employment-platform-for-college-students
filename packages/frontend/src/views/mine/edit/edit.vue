<template>
  <div class="container">
    <div class="profile">
      <el-form :model="userForm" label-position="left" label-width="70px">
        <div class="divide"></div>
        <el-form-item label="昵称" prop="user_name">
          <el-input v-model="userForm.user_name" maxlength="32" show-word-limit />
        </el-form-item>
        <div class="divide"></div>
        <el-form-item label="性别" prop="gender">
          <div class="sex-wrapper">
            <el-radio-group v-model="userForm.gender">
              <el-radio label="Man">男👴</el-radio>
              <el-radio label="Woman">女👵</el-radio>
              <el-radio label="None">未指定</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <div class="divide"></div>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userForm.age" maxlength="3" />
        </el-form-item>
        <div class="divide"></div>
        <el-form-item label="学校" prop="school">
          <el-input v-model="userForm.school" maxlength="32" show-word-limit />
        </el-form-item>
        <div class="divide"></div>
        <el-form-item label="期望岗位" prop="job">
          <el-input v-model="userForm.job" maxlength="32" show-word-limit />
        </el-form-item>
        <div class="divide"></div>
        <div class="divide"></div>
        <el-form-item label="个人介绍" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea" maxlength="64" :autosize="{ minRows: 4, maxRows: 6 }" show-word-limit />
        </el-form-item>
        <div class="divide"></div>
        <el-form-item>
          <el-button @click="() => updateInfo()" class="btn-save" type="primary"> 保存修改 </el-button>
        </el-form-item>
      </el-form>
      <input-avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InputAvatar from '../inputAvatar.vue';
import { useUpdateUserInfo } from './hook';
const router = useRouter();

const { userForm, updateInfo, getInfo, } = useUpdateUserInfo();
// const { getInfo, updateInfo } = useUserInfo();
onMounted(() => {
  getInfo();
});
onActivated(() => {
  getInfo();
});
// !user.hadLogin && router.replace('/login');

// getUserInfo(user.uid).then(({ data }) => {
//   Object.keys(form).forEach((key) => {
//     form[key] = data[key];
//   });
// });

// const handleSave = () => {
//   updateInfos(form).then((res) => {
//     ElNotification(res.msg);
//     router.refresh();
//   });
// };
</script>

<style lang="scss" scoped>
@import '@/common/layout.scss';
.container {
  @include userContainer;
  padding: 20px;
}
.profile {
  display: flex;
}

.el-form {
  width: 560px;

  .el-form-item {
    padding: 0 10px;

    .sex-wrapper {
      width: 100%;
      padding-left: 4px;
      border-radius: 4px;
    }

    .btn-save {
      height: 36px;
      padding: 7px 20px;
      margin-top: 24px;
      color: white;
      background-color: #1d7dfa;
      border: none;

      &:hover {
        background-color: rgba(30, 128, 255, 0.16);
      }
    }
  }
}
</style>
