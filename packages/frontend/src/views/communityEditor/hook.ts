import { useThrottleFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { getLocalStorage } from '@/common/hooks/useLcoalStorage';
import { publishCommunity, queryCommunityArticleById } from '@/services/modules/community/community';
import useUserStore, { TOKEN } from '@/store/modules/user';
import { createEditor, Editor } from '@textbus/editor';
import { computed, onActivated, onDeactivated, reactive, ref, shallowReactive } from 'vue';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { uploader } from '@/common/utils/uploader';
import { IArticle, ICommunityArticle, IResponse } from '@/types/type';
import { ArticleType } from '@/types/enums';

export function useCommunityArticle() {
  const article = reactive({ title: '', article_type: ArticleType.Chat });
  const setting = shallowReactive({
    titleMaxLength: 50,
    titleLengthWarning: '请保证标题长度在50字以内',
  });
  const articleEditor = ref(),
    router = useRouter(),
    route = useRoute();
  const articleId = computed(() => route.query.articleId);
  let editor: Editor, editorArticleInfo;

  async function publishArticle() {
    const { loginState, loginModelToggle, userInfo } = useUserStore();
    if (!loginState.loginStatus || !getLocalStorage(TOKEN)) {
      loginModelToggle();
      return;
    }
    if (!article.title.trim() || editor.getHTML() === '<br/>') {
      warningMessage('内容填写完整才能让其他同学看明白～');
      return;
    }
    if (article.title.length > 40) {
      errorMessage('标题过长 请缩减到40字以内～');
      return;
    }
    const text = document.createElement('div');
    text.innerHTML = editor.getHTML();
    // 1.处理参数
    const articleInfo: ICommunityArticle = {
      ...article,
      content: editor.getHTML(),
    };
    const { status } = await publishCommunity(articleInfo);
    if (status == 200) {
      router.back();
      successMessage('发布成功');
    }
  }
  // 初始化处理编辑模式 拉取文章信息
  async function isEditMode() {
    if (articleId.value != undefined) {
      const articleData = await queryCommunityArticleById({ article_id: articleId.value as string });
      editorArticleInfo = articleData.data;
      article.title = editorArticleInfo.title;
      editor.replaceContent(editorArticleInfo.content);
    }
  }
  onActivated(() => {
    editor = createEditor({
      autoFocus: true,
      zenCoding: true, // 语法糖实时监测
      theme: 'dark',
      autoHeight: true,
      minHeight: '400px',
      uploader,
      styleSheets: ['.tb-list-item { margin-left: 20px } .tb-pre { margin: 10px 0;}'],
      placeholder: '请输入内容',
    });
    // 异步获取
    setTimeout(() => {
      const toolBar = document.querySelector('.textbus-ui-top') as HTMLElement;
      toolBar.style.position = 'sticky';
      toolBar.style.top = '60px';
      toolBar.style.zIndex = '99';
    });
    editor.mount(articleEditor.value);
    isEditMode();
  });
  onDeactivated(() => {
    article.title = '';
    editor?.destroy();
  });

  return {
    article,
    publishArticle: useThrottleFn(publishArticle, 1000),
    articleEditor,
    setting,
  };
}
