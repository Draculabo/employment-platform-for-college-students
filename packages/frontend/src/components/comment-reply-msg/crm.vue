<script setup lang="ts">
import { formatTimefromNow } from '@/common/utils/date';
import Empty from '../empty.vue';
import { INotificationList } from '@/types/type';

defineProps<{ data: INotificationList[]; total: number }>();
defineEmits(['readNotification', 'queryData']);
</script>

<template>
  <div class="crm">
    <div v-if="data.length" class="list">
      <ul class="flex notification-list list-style-init">
        <li v-for="notif in data" class="pointer notification-item" @click="$emit('readNotification', notif)">
          <el-badge v-if="!notif.read" class="is-read" value="new" />
          <div class="comment-info">
            <el-image :lazy="true" :src="notif.commentUserInfo.avatar_url" fit="cover" loading="lazy" alt="头像" class="mr-10 avatar" />
            <span class="gray">{{ notif.commentUserInfo.user_name }}</span>
            <p class="line-2">
              <span class="gray">{{ formatTimefromNow(notif.commentContent.createTime) }}回复你：</span>
              {{ notif.commentContent.content }}
            </p>
          </div>
          <div class="reply-info">
            <div class="mb-10 flex flex-space-between">
              <span>来自：</span>
              <span>{{ formatTimefromNow(notif.replyContent.createTime) }}发布的</span>
            </div>
            <el-image :lazy="true" :src="notif.replyUserInfo.avatar_url" fit="cover" loading="lazy" alt="头像" class="mr-10 avatar" />
            <span>{{ notif.replyUserInfo.user_name }}</span>
            <p v-if="notif.replyContent.content" class="line-2">
              <span>评论内容：</span>
              {{ notif.replyContent.content }}
            </p>
            <!-- <p
              v-else
              class="line-2"
            /></p><h3>{{ notif.replyContent.title }}</h3>
            .....
            </p> -->
          </div>
        </li>
      </ul>
      <el-pagination
        layout="prev, pager, next"
        style="padding-top: 15px"
        :page-size="10"
        :total="total"
        @current-change="(page: number) => $emit('queryData', page)"
      />
    </div>
    <Empty v-else title="这是暂时还是空的~" />
  </div>
</template>

<style lang="scss" scoped>
.crm {
  .notification-list {
    max-height: 600px;
    overflow: auto;
    padding: 10px;
    flex-direction: column;
    text-align: left;

    li {
      margin-top: 20px;
      position: relative;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;

      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 5px;
      }

      .gray {
        opacity: 0.6;
      }

      .reply-info {
        padding: 10px;
        color: #666;
        background: #f3f5f7;
        border-radius: 5px;
      }

      .comment-info {
        margin-bottom: 10px;
      }

      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        border-bottom: none;
      }

      .is-read {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
}
</style>
