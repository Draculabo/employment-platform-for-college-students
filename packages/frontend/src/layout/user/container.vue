<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <div class="user-container">
    {{ slots.default?.() }}
  </div>
</template>
<style lang="scss" scoped>
@import '@/common/variables.scss';
.user-container {
}
</style>
