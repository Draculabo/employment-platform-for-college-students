<script setup lang="ts">
import { IKeyValueMap } from './constant';
import { ref } from 'vue';
defineProps<{ tabs: IKeyValueMap[] }>();
const emits = defineEmits(['tab-click']);
const currentTab = ref<number>(1);
const toggleTypeTab = (tab: IKeyValueMap, index: number) => {
  emits('tab-click', tab);
  currentTab.value = index;
};
</script>

<template>
  <div class="nav-bar">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :class="['mr-5', 'pointer', 'none', { checked: index === currentTab }]"
        @click="() => toggleTypeTab(tab, index)"
      >
        {{ tab.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .tabs {
    display: flex;
    align-items: center;

    li {
      padding-bottom: 5px;
    }
  }
}
</style>
