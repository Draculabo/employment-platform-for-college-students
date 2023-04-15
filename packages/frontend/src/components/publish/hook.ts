import { onDeactivated, Ref, ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { publishComment } from '@/services/modules/comment/comment';
import useUserStore from '@/store/modules/user';

import { ImageUpload } from '@/common/utils/uploader';
export function useEmoji(mainContent: Ref<string>) {
  const picker = ref(false);

  function togglePicker() {
    picker.value = !picker.value;
  }

  function setEmoji(emoji: any) {
    togglePicker();
    mainContent.value += emoji.i;
  }

  return {
    picker,
    togglePicker,
    setEmoji,
  };
}
// 评论和回复的逻辑都在这。
export function usePublishShare(
  articleId: Ref<string>,
  level: Ref<number>,
  posterCommentId: Ref<string>,
  replyAuthorId: Ref<string>,
  replyArticleAuthorId: Ref<string>,
  replyCommentId: Ref<string>,
  replyCommentLevel: Ref<number>,
  emits: Function,
  images: Ref<string[]>
) {
  const shareMainContent = ref('');
  const { loginState, loginModelToggle, userInfo } = useUserStore();

  async function publish() {
    if (!loginState.loginStatus) {
      loginModelToggle();
      return;
    }
    if (!shareMainContent.value.trim()) {
      warningMessage('请输入有意义的内容');
      return;
    }
    if (shareMainContent.value.length > 200) {
      warningMessage('内容长度请限制在200字以内');
      return;
    }
    const cb = publishComment;
    const params = {
      content: shareMainContent.value.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
      user_id: userInfo.user_uuid, // 发表这条评论的作者是谁
      // images: images.value.join('~$^$~'),
      // level: level.value, // 几级评论
      article_id: articleId.value, // 文章ID
      // posterCommentId: posterCommentId.value, // 楼主是谁
      comment_by: replyCommentId.value, // 回复的那条评论是谁发表的
      // replyArticleAuthorId: replyArticleAuthorId.value, // 回复的文章是谁发表的
      // replyCommentId: replyCommentId.value, // 回复谁
      // replyCommentLevel: replyCommentLevel.value, // 回复的评论是几级评论
    };
    // console.log(params)
    const rest = await cb(params);
    if (rest.status === 0) {
      shareMainContent.value = '';
      images.value.length = 0; // 清空图片内容
      emits('reQueryComments');
    }
    if (rest.msg) {
      rest.status === 0 ? successMessage(rest.msg) : errorMessage(rest.msg);
    }
  }

  onDeactivated(() => {
    shareMainContent.value = '';
    images.value.length = 0;
  });
  return {
    shareMainContent,
    publish: useThrottleFn(publish, 1000),
  };
}

export function usePickerImage() {
  const images = ref<string[]>([]);

  async function pickerImage() {
    if (images.value.length >= 2) {
      return errorMessage('最多只能上传2张图片！');
    }
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.png,.jpg,.gif,.jpeg,.webp');
    input.click();

    input.onchange = async function () {
      const files = Array.from(input.files as FileList);
      for (const file of files) {
        const path = await ImageUpload(file);
        images.value.push(path);
      }
      input.remove();
    };
  }

  function deleteImage(idx: number) {
    images.value.splice(idx, 1);
  }
  return {
    images,
    pickerImage,
    deleteImage,
  };
}
