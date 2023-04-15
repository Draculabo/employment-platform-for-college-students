<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from './header/header.vue';
const route = useRoute();
</script>
<template>
  <Header v-if="!['/editor', '/home'].includes(route.path)" />
  <div id="main">
    <el-tooltip placement="bottom" content="返回顶部">
      <el-backtop :bottom="100" />
    </el-tooltip>
    <router-view v-slot="{ Component }">
      <keep-alive :max="10" include="editor,syntax,update,theme,community,communityEditor,communityDetail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: calc(100vh - 60px);
}
</style>
