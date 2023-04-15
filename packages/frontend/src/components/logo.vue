<script setup lang="ts">
import logo from '@/assets/logo.png';
import { useRouter } from 'vue-router';
const { replace } = useRouter();
</script>
<template>
  <div class="logo" @click="replace('/home')">
    <img :src="logo" style="transform: scale(0.8)" width="90" height="60" alt="" />
  </div>
</template>

<style lang="scss" scoped></style>
