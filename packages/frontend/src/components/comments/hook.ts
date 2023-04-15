import { isLogin } from '@/common/hooks/global';
import { errorMessage, successMessage } from '@/common/message';

import { removeComment } from '@/services/modules/comment/comment';
import { calcOffsetTop, scrollTo } from '@/common/utils';
import useUserStore from '@/store/modules/user';
import { nextTick, Ref, ref, watch } from 'vue';

// 回复所需要的操作
export function useReply(emits: Function) {
  const { userInfo } = useUserStore();
  const currentId = ref('');
  let preId = '';

  function reply(commentId: string) {
    if (preId === commentId) {
      currentId.value = '';
      preId = '';
      return;
    }
    preId = commentId;
    currentId.value = commentId;
  }

  async function remove(commentId: string, articleId: string, level: number) {
    if (!isLogin()) {
      errorMessage('请先登录！');
      window.location.reload();
      return;
    }
    const rest = await removeComment({ comment_id: commentId, article_id: articleId });
    if (rest.status === 200) {
      successMessage('删除成功');
      emits('reQueryComments');
      return;
    }
    errorMessage('删除失败');
  }

  return {
    userInfo,
    reply,
    remove,
    currentId,
  };
}
// 展示更多
export function useShowMore(count: number) {
  const more = ref<boolean>(count > 1);

  function setMore() {
    more.value = false;
  }
  return {
    more,
    setMore,
  };
}
// 获取当前评论的具体页数和位置
export function useCommentPosition(position: Ref<number>) {
  const comments = ref();
  // 点击通知后进行评论定位
  watch(
    () => position.value,
    () => {
      try {
        nextTick(() => {
          const targetComment = comments.value.children[position.value];
          scrollTo(calcOffsetTop(targetComment) - 65);
          targetComment.classList.add('notice');
          setTimeout(() => {
            targetComment.classList.remove('notice');
          }, 1000);
        });
      } catch (e) {
        console.log(e);
        errorMessage('出了点错，请刷新后重新尝试～');
      }
    }
  );
  return {
    comments,
  };
}
