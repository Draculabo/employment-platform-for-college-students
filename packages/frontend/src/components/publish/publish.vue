<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker';
import { toRefs } from 'vue';
import { useEmoji, usePublishShare, usePickerImage } from './hook';
import 'vue3-emoji-picker/css';

const props = withDefaults(
  defineProps<{
    articleId: string;
    level: number;
    replyCommentLevel?: number;
    posterCommentId?: string;
    replyCommentId?: string;
    replyAuthorId?: string;
    replyArticleAuthorId?: string;
    background?: string;
  }>(),
  {
    background: '#f8f8f8',
    replyAuthorId: '',
    replyCommentLevel: 1,
    posterCommentId: '',
    replyCommentId: '',
    replyArticleAuthorId: '',
  }
);
const emits = defineEmits(['reQueryComments']);
const { pickerImage, images, deleteImage } = usePickerImage();
const propRefs = toRefs(props);
const { shareMainContent, publish } = usePublishShare(
  propRefs.articleId,
  propRefs.level,
  propRefs.posterCommentId,
  propRefs.replyAuthorId,
  propRefs.replyArticleAuthorId,
  propRefs.replyCommentId,
  propRefs.replyCommentLevel,
  emits,
  images
);
const { picker, setEmoji, togglePicker } = useEmoji(shareMainContent);
</script>

<template>
  <div class="community-publish content-card">
    <div class="community-content-edit">
      <textarea :style="{ background }" class="content-edit main-content" v-model="shareMainContent" placeholder="内容控制在200字以内～" />
    </div>
    <!-- 图片插入位置 -->
    <div class="covers-container community-comment-cover" v-if="images.length">
      <div class="mr-10 cover-item-container" v-for="(image, idx) in images">
        <el-image
          loading="lazy"
          :src="image"
          fit="cover"
          class="cover-item"
          :initial-index="idx"
          :preview-src-list="images"
          :preview-teleported="true"
          :hide-on-click-modal="true"
        >
        </el-image>
        <i @click="deleteImage(idx)" class="iconfont icon-delete pointer hover cover-item-close"></i>
      </div>
    </div>
    <div class="community-operator-group flex community-content-edit-publish">
      <div class="community-edit-picker">
        <span class="emoji pointer hover" @click="togglePicker">
          <i class="iconfont icon-emoji font-25 mr-10"></i>
        </span>
        <span class="emoji pointer hover" @click="pickerImage">
          <i class="iconfont icon-image font-25"></i>
        </span>
        <EmojiPicker
          class="picker"
          v-if="picker"
          :native="true"
          :hide-search="true"
          :hide-group-names="true"
          @select="setEmoji"
          :static-texts="{ skinTone: '换肤' }"
        />
      </div>
      <button class="btn primary" @click="publish">发表</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.community-publish {
  padding: 10px;
  z-index: 3;
  position: relative;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  .community-comment-cover {
    margin-left: 10px;
    display: flex;

    .cover-item-container {
      position: relative;
      width: 100px;
      height: 100px;

      &:hover .cover-item-close {
        visibility: visible;
      }

      .cover-item-close {
        position: absolute;
        top: 5px;
        right: 5px;
        color: white;
        font-weight: bold;
        visibility: hidden;
      }
    }
  }

  .community-operator-group {
    .community-edit-picker {
      margin-left: 10px;
      color: #555;
      position: relative;

      .picker {
        position: absolute;
        left: 0;
        top: 25px;
      }
    }
  }

  .community-content-edit {
    width: calc(100% - 20px);
    border-radius: 5px;
    margin: 10px 10px 0 10px;
    font-size: 0.9rem;

    /* background: #f8f8f8; */
    .content-edit {
      border: none;
      display: block;
      outline: none;
      width: 100%;
      padding: 10px;
      background: #f8f8f8;
      color: #555;
      border-radius: 5px;
      min-height: 100px;

      &.main-content {
        resize: none;
        height: calc(100% - 41px);
        overflow: auto;
        font-size: 15px;
      }
    }
  }

  .community-content-edit-publish {
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
