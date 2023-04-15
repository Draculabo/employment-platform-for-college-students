<script setup lang="ts">
import { numFormat } from '@/common/utils/format';
import Empty from '@/components/empty.vue';
import UserInfo from '@/components/userInfo.vue';
import Publish from '@/components/publish/publish.vue';
import { useReply, useCommentPosition } from './hook';
import Reply from './reply.vue';
import { computed } from 'vue';
import { IComment } from '@/services/modules/comment/type';
import { isNil } from 'lodash';
import { dataType } from 'element-plus/es/components/table-v2/src/common';

const emits = defineEmits(['pageNumChange', 'reQueryComments']);
const props = defineProps<{
  data: IComment[];
  articleId: string;
  pageNum: number;
  scrollTo: number;
  total: number;
  articleAuthorId: string; // 回复的当前文章的作者
  commentsTotal: number;
}>();
function flatComment(arr: IComment[], level: number) {
  const output = [] as IComment[];
  arr.forEach((v, i) => {
    if (!v.children?.length) {
      output.push(v);
      return;
    }
    const children = flatComment(v.children, level + 1);
    if (level >= 2) {
      output.push({
        ...v,
        children: [],
      });
      output.push(...children);
    } else {
      v.children = children;
      output.push(v);
    }
  });
  return output;
}
const position = computed(() => props.scrollTo);
const commentData = computed(() => {
  console.log(flatComment(props.data, 1));

  return flatComment(props.data, 1);
});
const { currentId, reply, userInfo, remove } = useReply(emits);
const { comments } = useCommentPosition(position);
</script>

<template>
  <div class="comments-container content-card">
    <span class="tip">本页评论/回复共 {{ numFormat(total) }} 条</span>
    <div v-if="data.length" class="comments-list mt-20 content-card" ref="comments">
      <div class="comment-item" v-for="comment of commentData">
        <user-info :user-info="comment.userInfo" :publish-time="comment.created_at" />
        <p class="comment-content line-4">{{ comment.content }}</p>
        <!-- <div class="covers-container" v-if="comment.userInfo">
          <el-image
            :src="cover"
            v-for="(cover, idx) in comment.images.split('~$^$~')"
            :preview-src-list="comment.images.split('~$^$~')"
            :initial-index="idx"
            fit="cover"
            :lazy="true"
            loading="lazy"
            class="mr-10 cover-item"
            :preview-teleported="true"
            :hide-on-click-modal="true"
          />
        </div> -->
        <ul class="list-style-init flex operator">
          <li class="mr-10" @click="reply(comment.comment_id)">回复</li>
          <!-- <li class="mr-10">点赞</li> -->
          <li v-if="userInfo.user_uuid === comment.userInfo.userUUID" @click="remove(comment.comment_id, articleId, 1)">删除</li>
        </ul>
        <!-- 内容输入框 -->
        <Publish
          :article-id="articleId"
          :level="2"
          :poster-comment-id="comment.comment_id"
          :reply-comment-id="comment.comment_id"
          :reply-comment-level="2"
          :reply-author-id="articleAuthorId"
          :reply-article-author-id="articleAuthorId"
          @re-query-comments="$emit('reQueryComments')"
          v-if="currentId === comment.comment_id"
        />
        <!-- 二级回复：内容 + 回复了谁-->
        <Reply
          :data="comment.children"
          :article-id="articleId"
          :comment-id="comment.comment_id"
          @re-query-comments="$emit('reQueryComments')"
          v-if="comment.children.length"
        />
      </div>
    </div>
    <el-pagination
      v-if="data.length"
      background
      layout="prev, pager, next"
      :total="commentsTotal"
      class="mt-4 mt-20"
      :current-page="pageNum"
      @current-change="(page: number) => $emit('pageNumChange', page)"
    />
    <Empty v-if="!data.length" title="还没有人发表评论..." />
    <Publish
      :article-id="articleId"
      :level="1"
      :reply-comment-level="2"
      :reply-author-id="articleAuthorId"
      :reply-article-author-id="articleAuthorId"
      @re-query-comments="$emit('reQueryComments')"
    />
  </div>
</template>

<style lang="scss" scoped>
@keyframes notice {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  0% {
    transform: translateX(0);
  }
}
.notice {
  animation: notice 3s linear;
}
.tip {
  color: #666;
}

.comments-container {
  margin-top: 20px;
}

.comment-item {
  position: relative;

  &::before,
  &::after {
    position: absolute;
    content: '';
    background: var(--theme);
  }

  &::before {
    width: 10px;
    height: 10px;
    left: -20px;
    top: 10px;
    border-radius: 50%;
    opacity: 0.5;
    z-index: 2;
  }

  &::after {
    width: 1px;
    height: calc(100% + 20px);
    left: -16px;
    opacity: 0.2;
    top: 15px;
  }

  .comment-content {
    font-size: 0.9rem;
    color: #555;
  }

  margin-bottom: 25px;

  .operator {
    justify-content: flex-end;
    font-size: 0.8rem;
    color: #555;
  }
}
</style>
