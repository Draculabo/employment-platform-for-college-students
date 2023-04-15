<template>
  <el-button-group
    v-show="visible"
    ref="target"
    class="button-group"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
    }"
  >
    <el-button :data-command="CommandType.Extension" @click="improveByCommand"> 改善该内容，使其具有专业性、逻辑性 </el-button>
    <el-button :data-command="CommandType.Specialty" @click="improveByCommand"> 改善该内容，用词更准确、内容更丰富 </el-button>
    <!-- <span class="el-dropdown-link"> 右键菜单<i class="el-icon-arrow-down el-icon--right" /> </span>
    <el-dropdown-menu>
      <el-dropdown-item :command="CommandType.Specialty"> </el-dropdown-item>
      <el-dropdown-item :command="CommandType.Extension"> </el-dropdown-item>
    </el-dropdown-menu> -->
  </el-button-group>
</template>
<script setup lang="ts">
import { useImproveSentence, CommandType, useContextMenu } from './hook';
import { onClickOutside } from '@vueuse/core';
const { improveByCommand } = useImproveSentence();
const { target, x, y, visible, closeContextMenu } = useContextMenu();
onClickOutside(target, closeContextMenu);
</script>
<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 9999;
}
</style>
