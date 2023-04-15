<script setup lang="ts">
withDefaults(defineProps<{ flag: boolean; footer?: boolean; title?: string; confirmText?: string; resetText?: string; width?: string }>(), {
  title: '温馨提示',
  width: '30%',
  confirmText: '提交',
  resetText: '重置',
  footer: true,
});
defineEmits(['cancel', 'confirm']);
</script>

<template>
  <el-dialog :title="title" :style="{ width, display: flag ? 'block' : 'none' }" align-center destroy-on-close>
    <slot />
    <template v-if="footer" #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="$emit('confirm')">{{ confirmText }}</el-button>
        <el-button type="primary" @click="$emit('cancel')">{{ resetText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
