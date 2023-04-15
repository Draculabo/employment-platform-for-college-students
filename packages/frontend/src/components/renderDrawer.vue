<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ flag: boolean }>();
const status = ref(props.flag);
defineEmits(['close']);
</script>

<template>
  <el-drawer v-model="$props.flag" size="400" :with-header="false" close-on-press-escape @close="$emit('close')">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
h2,
img {
  margin-top: 30px;
  text-align: center;
}
</style>
