<template>
  <!-- <Container> -->
  <div class="userinfo-container">
    <div class="userinfo-header">
      <div class="link" @click="router.push(`/user/profile/${userInfo.user_uuid}`)">
        <app-icon icon="el-icon-arrow-left-bold" />
        <span>返回个人主页</span>
      </div>
    </div>

    <div class="userinfo-nav">
      <div
        v-for="nav of userNav.children"
        :key="nav.name"
        :class="['nav-item', { active: route.name === nav.name }]"
        @click="router.push({ name: nav.name })"
      >
        <!-- <app-icon :icon="nav.meta?.icon" /> -->
        <span>{{ nav.meta?.navName }}</span>
      </div>
    </div>

    <div class="userinfo-main">
      <h1 class="title">
        {{ route.meta?.navName }}
      </h1>
      <router-view />
    </div>
  </div>
  <!-- </Container> -->
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import userNav from '@/router/modules/userEdit';
import useUserStore from '@/store/modules/user';
const { userInfo } = useUserStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.userinfo-container {
  display: grid;
  grid-template-rows: 3.6rem 635px;
  grid-template-columns: 230px 1fr;
  grid-gap: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  > div {
    background-color: white;
    border-radius: 3px;
  }
}

.userinfo-header {
  grid-column: 1/3;
  padding-left: 24px;
  background-color: white;

  .link {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 3.6rem;
    color: #909090;

    &:hover {
      color: lightblue;
      cursor: pointer;
    }
  }
}

.userinfo-nav {
  padding: 8px;

  .nav-item {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 10px;
    border-radius: 6px;
    cursor: pointer;

    .app-icon {
      margin: 0 15px 0 20px;
    }

    &.active,
    &:hover {
      color: #1d7dfa;
      background-color: #e8f3ff;
    }
  }
}

.userinfo-main {
  padding: 20px;

  .title {
    margin-top: 0;
    font-size: 24px;
    color: #333;
  }

  // 穿透到子路由
  :deep(.divide) {
    width: 100%;
    margin-top: 13px;
    margin-bottom: 13px;
    border-top: 1px solid #eaeaea;
  }
}
</style>
