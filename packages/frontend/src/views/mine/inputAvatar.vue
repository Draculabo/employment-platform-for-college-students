<template>
  <div class="input-avatar">
    <div @click="uploadInput!.click" class="avatar-uploader">
      <img :src="avatar_url" alt="avatar" />
      <div class="click-cover">
        <div>点击头像修改</div>
      </div>
    </div>
    <input style="display: none" @change="toggleAvatar" type="file" ref="uploadInput" ange="setImage" accept=".png,.jpg,.jpeg" />
    <div class="title">我的头像</div>
    <div class="description">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
  </div>
  <el-button @click="uploadAvatar" round type="primary">上传头像</el-button>
</template>

<script setup lang="ts">
import { useUpdateUserAvatar } from './edit/hook';
const { avatar_url, uploadAvatar, uploadInput, toggleAvatar } = useUpdateUserAvatar();
</script>

<style lang="scss" scoped>
.input-avatar {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  width: 112px;
  margin-left: 74px;

  .avatar-uploader {
    position: relative;
    width: 90px;
    height: 90px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &:hover {
      .click-cover {
        visibility: visible;
        background-color: rgba(29, 33, 41, 0.5);
      }
    }

    .click-cover {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      visibility: hidden;
      border-radius: 50%;
    }
  }

  .title {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1d2129;
  }

  .description {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: #86909c;
  }
}
</style>
