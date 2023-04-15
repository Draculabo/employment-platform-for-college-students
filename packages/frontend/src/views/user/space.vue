<template>
  <div class="user-info-wrapper">
    <el-row>
      <el-col :span="2" class="space-left-container">
        <div class="avatar-wrapper">
          <el-avatar :size="50" :src="userInfo.avatar_url" />
        </div>
        <el-button @click="() => gotoEditPage()">编辑资料</el-button>
      </el-col>
      <el-col :span="16">
        <el-descriptions>
          <el-descriptions-item label="用户名"
            >{{ userInfo.user_name }}

            <el-icon :color="userInfo.gender === 'FeMale' ? 'pink' : 'lightblue'">
              <Female v-if="userInfo.gender === 'FeMale'" /> <Male v-if="userInfo.gender === 'Male'" /><User
                v-if="userInfo.gender === 'None'"
            /></el-icon>
          </el-descriptions-item>
          <el-descriptions-item label="年龄" v-if="userInfo.age">{{ userInfo.age }}</el-descriptions-item>
          <el-descriptions-item label="手机号码" v-if="userInfo.phone">{{ userInfo.phone }}</el-descriptions-item>
          <el-descriptions-item label="期望岗位" v-if="userInfo.job">{{ userInfo.job }}</el-descriptions-item>
          <el-descriptions-item label="毕业院校" v-if="userInfo.school">
            <el-tag size="small">{{ userInfo.school }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="工作城市" v-if="userInfo.work_city">{{ userInfo.work_city }}</el-descriptions-item>
          <el-descriptions-item label="个人介绍" v-if="userInfo.introduction">{{ userInfo.introduction }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-tabs v-model="currentTab" @tab-click="(a) => toggleTab(a.paneName as string)">
      <el-tab-pane :label="tab.label" :name="tab.value" v-for="tab in tabs">
        <component :is="tab.component" v-bind="tab.props"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTabs, useUserInfo } from './hook';
import { useRoute, useRouter } from 'vue-router';
const { tabs, toggleTab, currentTab } = useTabs();
const { userInfo, getUserInfo } = useUserInfo();
const route = useRoute();
const router = useRouter();
const gotoEditPage = () => {
  router.push(`/user/edit/profile`);
};
onMounted(() => {
  const id = route.params['id'] as string;
  getUserInfo(id);
});
</script>
<style lang="scss" scoped>
@import '@/common/variables.scss';
.space-left-container {
  .avatar-wrapper {
    margin-bottom: 10px;
  }
}
.user-info-wrapper {
  padding: 20px;
  max-width: 1200px;
  min-height: calc(100vh - $header);
  margin: 0 auto;
  background-color: #fff;
}
.avatar-wrapper {
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.basic-info-wrapper {
  padding: 20px;
}
</style>
