import { getLocalStorage, setLocalStorage } from '@/common/hooks/useLcoalStorage';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { getCurrentTypeContent, getPdf, importCSS } from '@/common/utils';
import { markdownToHTML } from 'markdown-transform-html';
import { onActivated, onDeactivated, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { splitPage } from './components/tabbar/hook';
import { reviewResume } from '@/services/modules/resume/resume';
import { dialogue } from '@/common/config';

const MARKDOWN_CONTENT = 'markdown-content',
  get = getLocalStorage;

export function useRenderHTML(props: { content: string; resumeType: string }) {
  const renderDOM = ref<HTMLElement>(document.body);
  onActivated(() => {
    importCSS(props.resumeType);
    renderDOM.value.innerHTML = markdownToHTML(props.content);
    // @ts-ignore
    setTimeout(() => splitPage(renderDOM.value), 100);
  });

  watch(
    () => props.content,
    (v) => {
      renderDOM.value.innerHTML = markdownToHTML(v);
      // @ts-ignore
      setTimeout(() => splitPage(renderDOM.value), 50);
    }
  );
  // 刷新页面（这里是一个比较有问题的点）
  watch(
    () => props.resumeType,
    () => {
      location.reload();
    }
  );
  return {
    renderDOM,
  };
}

// 缓存用户输入的content内容
export function useMarkdownContent(resumeType: Ref<string>) {
  const cacheKey = MARKDOWN_CONTENT + '-' + resumeType.value;
  let content = ref(get(cacheKey) ? (get(cacheKey) as string) : getCurrentTypeContent(resumeType.value));

  function setContent(str: string) {
    if (!str) {
      return;
    }
    content.value = str;
    setLocalStorage(cacheKey, content.value);
  }

  return {
    content,
    setContent,
  };
}

export function useResumeType() {
  const route = useRoute();
  //初始化也需要填上值 否则后续更新不一致会导致刷新死循环
  const resumeType = ref(route.query.type ? String(route.query.type) : 'front_end');
  onActivated(() => {
    resumeType.value = route.query.type ? String(route.query.type) : 'front_end';
  });
  return {
    resumeType,
  };
}

export function useDownLoad(type: Ref<string>, content: Ref<string>) {
  const router = useRouter();
  const downloadDynamic = (fileName: string) => {
    getPdf(fileName, document.querySelector('.jufe') as HTMLElement);
  };

  const downloadNative = () => {
    localStorage.setItem('download', JSON.stringify(markdownToHTML(content.value)));
    router.push({ path: '/download', query: { type: type.value } });
  };

  const downloadMD = () => {
    const blob = new Blob([content.value]);
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.download = document.title + '.md';
    aTag.href = url;
    aTag.click();
    URL.revokeObjectURL(url);
    successMessage('导出成功~');
  };
  return {
    downloadMD,
    downloadDynamic,
    downloadNative,
  };
}

export function useImportMD(setContent: (str: string) => void) {
  function importMD(file: File) {
    const reader = new FileReader();
    reader.readAsText(file, 'utf-8');
    reader.onload = function (event) {
      successMessage('导入成功~');
      setContent((event.target?.result as string) || '');
    };
    reader.onerror = function () {
      errorMessage('导入失败!');
    };
  }
  return {
    importMD,
  };
}
export function useReviewResume() {
  const reviewDialog = ref<boolean>(false);
  const content = ref<string>('');
  const toggleStatus = () => {
    reviewDialog.value = !reviewDialog.value;
  };
  const reviewResumeAction = async (reviewContent: string) => {
    const res = await reviewResume({
      content: `${dialogue.summary}
     ${reviewContent}
      `,
    });
    if (res.status !== 0) {
      res.msg && errorMessage(res.msg);
      return;
    }
    content.value = res.data.text || '网络错误';
    //     content.value = `这份简历整体结构清晰，排版简洁明了。在教育背景、专业技能和实习经历方面都提供了详细的信息。其中，个人技术博客项目经历对于展示个人能力、经验和项目管理能力等方面都有一定的帮助。但是，需要注意以下几点：

    // - 个人信息中可以添加一些自我评价，例如对自己的工作态度、团队合作能力等方面的描述，以便于 HR 了解个人素质。
    // - 在实习经历中，可以加入一些具体的数据或者成果，例如对项目的优化，提升了多少性能或者用户体验等等，以展现自己的技术能力。
    // - 在项目经历中，可以提供一些具体的技术难点和解决方案，以展现个人解决问题的能力。同时，也可以加入一些具体的数据或者成果，例如在个人技术博客项目中，提升了多少用户体验或者流量等等。
    // - 需要注意字号和字体的一致性，以保证整份简历的视觉效果。

    // 综上所述，这份简历的内容清晰、简洁明了，但是可以在实习经历和项目经历中提供更多具体的数据和成果，以更好地展现个人能力和经验。`;
    reviewDialog.value = true;
  };

  return {
    reviewDialog,
    toggleStatus,
    reviewResume: reviewResumeAction,
    content,
  };
}
export function useContextMenu() {}
// 左右移动伸缩布局
export function useMoveLayout() {
  let left = ref(700),
    flag = false;

  function move(event: MouseEvent) {
    if (!flag) {
      return;
    }
    left.value = event.clientX;
  }

  function down() {
    flag = true;
  }

  function up() {
    flag = false;
  }

  onActivated(() => {
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', move);
  });

  onDeactivated(() => {
    window.removeEventListener('mouseup', up);
    window.removeEventListener('mousemove', move);
  });
  return { left, move, down };
}

export function useAvatar(content: Ref<string>, setContent: Function) {
  const matchAvatarSlot = /!\[个人头像\]\(.*\)/;
  function setAvatar(path: string) {
    if (!matchAvatarSlot.test(content.value)) {
      warningMessage('上传前请确保你想上传的位置在编辑器中存在 ![个人头像](...) 此关键字');
      return;
    }
    const newContent = content.value.replace(matchAvatarSlot, `![个人头像](${path})`);
    setContent(newContent);
    successMessage('头像上传成功，如果你想修改为网络图片，你可直接修改对应的链接！');
  }
  return {
    setAvatar,
  };
}
