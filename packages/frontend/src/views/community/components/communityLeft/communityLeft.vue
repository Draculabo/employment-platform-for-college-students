<script setup lang="ts">
import ArticleCard from '../../../../components/article/articleItem.vue';
import NavBar from '@/components/navBar.vue';
import Empty from '@/components/empty.vue';
import { onActivated } from 'vue';
import { tabs } from './constant';
import { articleTypeList } from '@/common/utils/professional';
import { useTab, useCommunityData } from './hook';
import typeTab from './typeTab.vue';
const props = withDefaults(defineProps<{ user_id?: string }>(), {});
const { data, loading, noMore, conditions, resetSub, searchSub, queryList, conditionQuery, removeArticle, toggleTypeTab } =
  useCommunityData();

onMounted(() => {
  conditionQuery();
});
console.log(conditions);
</script>

<template>
  <div class="community-list content-card">
    <div class="menubar flex">
      <type-tab :tabs="tabs" @tab-click="toggleTypeTab"></type-tab>
      <!-- <NavBar :tabs="tabs" @tab-click="toggleTab" /> -->
      <div>
        <!-- <el-select placeholder="岗位方向" v-model="conditions.professional" @change="searchSub" class="mr-10">
          <el-option v-for="prof in professionals" :label="prof" :value="prof" />
        </el-select> -->

        <el-select placeholder="帖子类型" v-model="conditions.article_type" @change="searchSub" class="mr-10">
          <el-option v-for="prof in articleTypeList" :label="prof.label" :value="prof.value!" />
        </el-select>
        <el-input v-model="conditions.keyword" placeholder="搜索" class="mr-10" style="width: 190px"></el-input>
        <button @click="searchSub" class="btn primary">搜索</button>
        <button @click="resetSub" class="btn plain">重置</button>
      </div>
    </div>
    <div v-if="data.length" class="article-list" v-infinite-scroll="() => queryList()">
      <ArticleCard
        @query-professional="() => {}"
        @re-query-list="(userId) => {}"
        @remove="removeArticle(idx)"
        v-for="(article, idx) in data"
        :article="article"
      />
      <p v-if="loading">正在加载..</p>
      <p v-if="noMore">暂时没有更多了～</p>
    </div>
    <Empty v-else title="好像没有人发布帖子，稍等一下吧" />
  </div>
</template>

<style lang="scss" scoped>
.menubar {
  justify-content: space-between;
  align-items: center;
}

.article-list {
  p {
    color: #666;
    font-size: 0.9rem;
    text-align: center;
  }
}
</style>
