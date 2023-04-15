<script setup lang="ts">
import Publish from '@/components/publish/publish.vue';
import { useReply, useShowMore } from './hook';
import { IComment } from '@/services/modules/comment/type';

const emits = defineEmits(['reQueryComments']);
const props = defineProps<{ data: IComment[]; commentId: string; articleId: string }>();
const { reply, userInfo, remove, currentId } = useReply(emits);
const { more, setMore } = useShowMore(props.data.length);
</script>

<template>
  <div class="comments-list mt-20 content-card">
    <div class="comment-item" v-for="comment in more ? data.slice(0, 1) : data">
      <user-info :user-info="comment.userInfo" :publish-time="comment.created_at" />
      <p class="comment-content line-4">
        <span class="reply-text pointer">{{ comment.userInfo.username }}：</span>
        {{ comment.content }}
      </p>
      <!-- <div class="covers-container" v-if="comment.images">
        <el-image
          :src="cover"
          v-for="(cover, idx) in comment.images.split('~$^$~')"
          :preview-src-list="comment.images.split('~$^$~')"
          :initial-index="idx"
          fit="cover"
          loading="lazy"
          :lazy="true"
          class="mr-10 cover-item"
          :preview-teleported="true"
          :hide-on-click-modal="true"
        />
      </div> -->
      <ul class="list-style-init flex operator">
        <li class="mr-10" @click="reply(comment.comment_id)">回复</li>
        <li v-if="userInfo.user_uuid === comment.userInfo.userUUID" @click="remove(comment.comment_id, articleId, 2)">删除</li>
      </ul>
      <Publish
        v-if="currentId === comment.comment_id"
        :article-id="articleId"
        :level="2"
        :reply-comment-level="1"
        :reply-comment-id="comment.comment_id"
        :reply-author-id="comment.userInfo.userUUID"
        background="white"
        @re-query-comments="$emit('reQueryComments')"
      />
    </div>
    <span v-if="more" @click="setMore" class="pointer showMore">显示全部...</span>
  </div>
</template>

<style lang="scss" scoped>
.content-card {
  background: #f8f8f8;

  .showMore {
    color: var(--theme);
    font-size: 0.9rem;
  }
}

.comment-item {
  .comment-content {
    font-size: 0.9rem;
    color: #555;

    .reply-text {
      color: var(--theme);
    }
  }

  .operator {
    justify-content: flex-end;
    font-size: 0.8rem;
    color: #555;
  }
}
</style>
