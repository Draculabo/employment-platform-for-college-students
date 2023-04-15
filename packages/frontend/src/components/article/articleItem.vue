<script setup lang="ts">
import UserInfo from '@/components/userInfo.vue';
import { useOperator, useCovers } from './hook';
import useUserStore from '@/store/modules/user';
import { computed } from 'vue';
import { numFormat } from '@/common/utils/format';
import { IArticle } from '@/services/modules/community/type';

const props = defineProps<{ article: IArticle }>();
const emits = defineEmits(['reQueryList', 'queryProfessional', 'remove']);

const clicked = computed(() => true);
// const hasAuthor = computed(() => userInfo.uid === props.article.user_id);
const articleId = computed(() => props.article.article_id);
const articleContent = computed(() => props.article.content);

const { covers } = useCovers(articleContent);
const { userInfo } = useUserStore();
const { useDetail } = useOperator(articleId, emits);
</script>

<template>
  <article class="pointer">
    <user-info v-if="article.userInfo" :user-info="article.userInfo" :publish-time="article.created_at" />
    <h3 @click="useDetail(article)">{{ article.title }}</h3>
    <!-- <p class="intro line-4" @click="useDetail(article)">
      {{ article.introduce }}
    </p> -->
    <!-- 图片插入 -->
    <div class="covers-container" v-if="covers.length">
      <el-image
        :src="cover"
        v-for="(cover, idx) in covers"
        :preview-src-list="covers"
        :initial-index="idx"
        fit="cover"
        :lazy="true"
        loading="lazy"
        class="mr-10 cover-item"
        :preview-teleported="true"
        :hide-on-click-modal="true"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
article {
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  color: #666;
  position: relative;

  .visit-people {
    position: absolute;
    right: -20px;
    top: -5px;
  }

  .intro:hover {
    opacity: 0.8;
  }

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin-bottom: 5px;
    color: #444;
  }

  .article-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag {
      color: var(--theme);

      &:hover {
        opacity: 0.7;
      }
    }

    .operator-group {
      margin: 10px 0;

      span {
        margin-right: 20px;
        cursor: pointer;

        &:hover {
          color: var(--theme);
        }
      }
    }
  }
}
</style>
