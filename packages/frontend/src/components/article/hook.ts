import { warningMessage, errorMessage, successMessage } from '@/common/message';

import { isLogin } from '@/common/hooks/global';
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { likeArticle, removeCommunity } from '@/services/modules/community/community';
import { ref, Ref, watchEffect } from 'vue';
import { useBrowseHistory } from '@/components/browse-history/hook';
import { IArticle } from '@/services/modules/community/type';
import { info } from '@/services/modules/user';
import { IBaseUserInfo } from '@/types/type';

export function useOperator(articleId: Ref<string>, emits: Function) {
  const router = useRouter();

  async function useLike(hasClick: Ref<boolean>) {
    if (!isLogin()) {
      errorMessage('请先登录！');
      return;
    }
    if (hasClick.value) {
      warningMessage('你已经赞过了，不用重复点～');
      return;
    }
    const { userInfo } = useUserStore();
    await likeArticle({ userId: userInfo.user_uuid, articleId: articleId.value });
    // emits('reQueryList', userInfo.uid);
  }
  function useDetail(article: IArticle) {
    const { setBrowseHistory } = useBrowseHistory();
    setBrowseHistory(article);
    router.push(`/community/detail?articleId=${articleId.value}`);
  }
  async function useRemove() {
    const res = await removeCommunity({ article_id: articleId.value });
    if (res.status === 0) {
      successMessage('删除成功');
      // emits('remove');
      router.push('/community');
    }
  }
  async function useUserBaseInfo(user_id: string) {
    const userInfo = ref<IBaseUserInfo>();
    const result = await info({ user_id });
    userInfo.value = result.data;
    return userInfo;
  }
  function useEditor() {
    router.push(`/community/editor?articleId=${articleId.value}`);
  }

  return {
    useLike,
    useDetail,
    useRemove,
    useEditor,
    useUserBaseInfo,
  };
}

export function useCovers(mainContent: Ref<string>) {
  const covers = ref<string[]>([]);

  watchEffect(() => {
    const tmpCovers: string[] = [];
    mainContent.value.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, ($, $1) => {
      tmpCovers.length < 3 && tmpCovers.push($1);
      return $1;
    });
    covers.value = tmpCovers;
  });
  return {
    covers,
  };
}
