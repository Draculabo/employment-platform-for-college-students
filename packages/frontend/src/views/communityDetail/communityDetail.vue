<script setup lang="ts">
import UserInfo from '@/components/userInfo.vue';
import HotList from '@/components/hot-rank/hotList.vue';
import BrowseHistory from '@/components/browse-history/browseHistory.vue';
import Comments from '@/components/comments/comments.vue';
import { VueMarkdownMenuBar } from 'vue-markdown-menu-bar';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { useArticleDetail, useDelayMenuBar } from './hook';
import '@/assets/highlight.css';
// import 'bytemd/dist/index.css';
import { numFormat } from '@/common/utils/format';
import { useOperator } from '../../components/article/hook';
const route = useRoute();
const articleId = computed(() => route.query.articleId as string);
const posterCommentId = computed(() => parseInt(route.query.posterCommentId as string));
const { userInfo } = useUserStore();
const isAuthor = computed(() => userInfo.user_uuid === article.value.userInfo.userUUID);
const { article, total, position, commentsTotal, like, pageNumChange, toCommentFieldTop, queryComments, commentsConditions } =
  useArticleDetail(articleId, posterCommentId);
const { delay } = useDelayMenuBar(articleId);
const { back, push } = useRouter();
const { useEditor, useRemove } = useOperator(articleId, null as unknown as Function);
// const clicked = computed(() => article.likes.includes(userInfo.uid));

const clicked = true;
</script>
<template>
  <div class="community-detail flex">
    <div class="main-content mr-20">
      <div class="main content-card">
        <user-info class="user-info" :user-info="article.userInfo" :publish-time="article.created_at" />
        <article class="content" v-html="article.content"></article>
        <div class="supports mb-20">
          <!-- <span @click="like(clicked)" :class="{ clicked }">
            <i class="iconfont icon-like font-20"></i>
            {{ numFormat(article.likes.length) }}
          </span>
          <span @click="toCommentFieldTop">
            <i class="iconfont icon-comment font-20"></i>
            {{ numFormat(article.comments.length) }}
          </span> -->
          <span>
            <el-tooltip placement="bottom" content="分享给朋友">
              <i class="iconfont icon-share font-20"></i>
            </el-tooltip>
          </span>
          <span v-if="isAuthor" @click="push(`/community/editor?articleId=${articleId}`)">
            <el-tooltip placement="bottom" content="编辑">
              <i class="iconfont icon-edit font-20"></i>
            </el-tooltip>
          </span>
          <span @click="useRemove" v-if="isAuthor">
            <el-tooltip placement="bottom" content="删除">
              <i class="iconfont icon-delete font-20"></i>
            </el-tooltip>

            <!-- <span @click="useLike" :class="{ clicked }">
          <i class="iconfont icon-like font-20"></i>
          {{ numFormat(article.likes.length) }}
        </span> -->
            <!-- <span @click="useDetail(article)">
          <i class="iconfont icon-comment font-20"></i>
          {{ numFormat(article.commentTotal) }}
        </span> -->
            <!-- <span class="visit-people"><i class="iconfont icon-browse font-20"></i> 浏览量 {{ numFormat(article.hot) }}</span> -->
          </span>
        </div>

        <div class="article-bottom">
          <div class="operator-group"></div>
          <!-- <span class="tag pointer" @click="$emit('queryProfessional', article.professional)">#{{ article.professional }}</span> -->
        </div>
        <!-- <span class="pointer tag mr-20">#{{ article.professional }}</span> -->
        <span class="pointer hover" @click="back()">返回上一页</span>
        <span class="pointer hover back absolute" @click="back()">返回上一页</span>
      </div>
      <!-- <Publish :article-id="articleId" :level="1" :reply-article-author-id="article.user_id" @re-query-comments="queryComments" /> -->
      <i class="anchor"> </i>
      <Comments
        :data="article.comments"
        :article-id="articleId"
        :total="total"
        :page-num="commentsConditions.config.pageNo"
        :scroll-to="position"
        :comments-total="commentsTotal"
        :article-author-id="article.user_id"
        @page-num-change="pageNumChange"
        @re-query-comments="queryComments"
      />
    </div>
    <div class="slide-content">
      <!-- <hot-list class="slide-item" />
      <browse-history /> -->
      <vue-markdown-menu-bar v-if="delay" class="slide-item menu-bar content-card" body=".content" width="300px" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.community-detail {
  max-width: 1200px;
  margin: 20px auto;

  .main-content {
    flex: 1;
    position: relative;

    .main {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .tag {
        color: var(--theme);

        &:hover {
          opacity: 0.7;
        }
      }
    }

    .user-info {
      padding-left: 20px;
    }

    .content {
      padding: 20px;
      padding-top: 10px;
    }

    .supports {
      text-align: center;
      white-space: nowrap;

      span {
        cursor: pointer;
        margin: 0 20px;
        display: inline-block;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background: #eee;
        font-size: 0.9em;
        color: #666;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .back {
    top: 20px;
    right: 20px;
  }

  .slide-content {
    flex-basis: 300px;

    .menu-bar {
      position: sticky;
      top: 80px;
    }

    .slide-item {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .slide-content {
    display: none;
  }
  .main-content {
    margin-left: 20px;
  }
}
</style>
