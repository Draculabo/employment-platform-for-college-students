import { useThrottleFn } from '@vueuse/core';
import { warningMessage } from '@/common/message';
import useUserStore from '@/store/modules/user';
import { initialInfo } from './../../store/modules/user';
import { onActivated, onDeactivated, reactive, Ref, ref, watch, watchEffect } from 'vue';
import { queryCommunityArticleById, likeArticle } from '@/services/modules/community/community';
import { queryCommentPosition, queryCommunityArticleCommentsById } from '@/services/modules/comment/comment';
import { errorMessage } from '@/common/message';
import { isLogin } from '@/common/hooks/global';
import { calcOffsetTop, scrollTo } from '@/common/utils';
import { IArticle } from '@/services/modules/community/type';
import { ArticleType } from '@/types/enums';
import { isNil } from 'lodash';

export function useArticleDetail(articleId: Ref<string>, posterCommentId: Ref<number>) {
  const article = ref<IArticle>({
    title: '',
    content: '',
    // professional: '',
    user_id: '',
    // commentTotal: 0,
    // hot: 0,
    created_at: '',
    updated_at: '',
    article_id: articleId.value,
    // introduce: '',
    userInfo: {} as IArticle['userInfo'],
    share_number: 0,
    article_type: ArticleType.Chat,
    comments: [],
  });
  const total = ref(0),
    commentsTotal = ref(0),
    commentsConditions = reactive({
      config: {
        pageNo: 1,
        pageSize: 10,
      },
      article_id: articleId.value,
    });
  const position = ref<number>(0);
  async function queryArticle() {
    if (!articleId.value) {
      errorMessage('出错了');
      return;
    }
    const articleData = await queryCommunityArticleById({ article_id: articleId.value });
    if (articleData.status === 0) {
      article.value = articleData.data;
      // initArticleInfo(article, articleData.data);
    }
  }

  async function queryComments() {
    commentsConditions.article_id = articleId.value;
    const commentsData = await queryCommunityArticleCommentsById(commentsConditions);
    if (commentsData.status === 0) {
      article.value.comments = commentsData.data.list;
      total.value = commentsData.data.list.length;
      commentsTotal.value = commentsData.data.list.length;
    }
  }

  function toCommentFieldTop() {
    const anchor = document.querySelector('.anchor') as HTMLElement;
    scrollTo(calcOffsetTop(anchor) - 65);
  }

  function pageNumChange(pageNum: number) {
    commentsConditions.config.pageNo = pageNum;
    queryComments();
    toCommentFieldTop();
  }

  async function like(clicked: boolean) {
    if (!isLogin()) return errorMessage('请先登录');
    if (clicked) {
      warningMessage('点过赞了, 不用再点了～');
      return;
    }
    const { userInfo } = useUserStore();
    // const { status } = await likeArticle({ articleId: articleId.value, userId: userInfo.uid });
    // if (status === 200) {
    //   article.likes.push(userInfo.uid);
    // }
  }

  const init = useThrottleFn(function () {
    if (!isNil(articleId.value)) {
      queryComments();
      queryArticle();
    }
  });

  watch(
    () => articleId.value,
    () => {
      init();
    }
  );

  watchEffect(async () => {
    // if (isNaN(posterCommentId.value)) return;
    // // 查询数据 返回具体的comment位置
    // const { data, code, msg } = (await queryCommentPosition({
    //   commentId: posterCommentId.value,
    //   pageSize: commentsConditions.config.pageSize,
    //   articleId: articleId.value,
    // })) as IResponse<ICommentPosition>;
    // if (code === 200) {
    //   commentsConditions.pageNum = (data as ICommentPosition).pageNum;
    //   article.comments = (data as ICommentPosition).data;
    //   position.value = (data as ICommentPosition).position;
    // } else {
    //   errorMessage(msg);
    // }
  });

  onActivated(init);
  onDeactivated(() => (article.value.content = ''));

  return {
    commentsConditions,
    total,
    position,
    commentsTotal,
    article,
    like,
    queryArticle,
    pageNumChange,
    queryComments,
    toCommentFieldTop,
  };
}

export function useDelayMenuBar(articleId: Ref) {
  // 暂时解决异步渲染问题
  const delay = ref(false);

  function controlMenuBar() {
    delay.value = false;
    setTimeout(() => (delay.value = true), 200);
  }

  onActivated(() => {
    controlMenuBar();
  });
  watch(
    () => articleId.value,
    () => {
      controlMenuBar();
    }
  );

  return {
    delay,
  };
}
