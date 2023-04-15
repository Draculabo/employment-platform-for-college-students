<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '../header/header.vue';
const route = useRoute();
</script>
<template>
  <Header />
  <div id="main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common/variables.scss';
#main {
  min-height: calc(100vh - $header);
}
</style>
