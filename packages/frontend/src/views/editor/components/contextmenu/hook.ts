import { errorMessage } from '@/common/message';
import { reviewResume } from '@/services/modules/resume/resume';
import { onClickOutside } from '@vueuse/core';
import { isEmpty, isNil } from 'lodash';
import { onActivated, onDeactivated, onMounted, ref } from 'vue';

export enum CommandType {
  Specialty,
  Extension,
}
const commandCase = {
  async [CommandType.Specialty](content: string) {
    const res = await reviewResume({
      content: `下面是我的简历句子，请改写以下段落，使其具有逻辑性、专业性，使用近义词修饰、润色：${content}`,
    });
    if (res.status !== 0) {
      if (res.msg) {
        errorMessage(res.msg);
      } else {
        errorMessage('请求失败，请稍后再试');
      }
      return;
    }
    return res.data.text;
  },
  async [CommandType.Extension](content: string) {
    const res = await reviewResume({
      content: `下面是我的简历句子，请改写以下段落，让用词更准确、内容更丰富：${content}`,
    });
    if (res.status !== 0) {
      if (res.msg) {
        errorMessage(res.msg);
      } else {
        errorMessage('请求失败，请稍后再试');
      }
      return;
    }
    return res.data.text;
  },
};
export function useImproveSentence() {
  const improveByCommand = async (e: any) => {
    const command = e.currentTarget.getAttribute('data-command') as CommandType;
    const selection = window.getSelection();
    if (isNil(selection)) {
      return;
    }
    if (isEmpty(selection.toString())) {
      errorMessage('请选中内容再优化');
      return;
    }
    const range = selection.getRangeAt(0);

    const text = await commandCase[command](selection.toString());
    range.deleteContents();
    if (isNil(text)) {
      return;
    }
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    selection.removeAllRanges();
  };
  return {
    improveByCommand,
  };
}
export function useContextMenu() {
  const x = ref<number>(0);
  const y = ref<number>(0);
  const target = ref();
  const visible = ref<boolean>(false);
  const openContextMenu = (e: MouseEvent) => {
    visible.value = true;
    x.value = e.pageX;
    y.value = e.pageY;
  };
  const closeContextMenu = () => {
    visible.value = false;
  };
  onMounted(() => {
    onClickOutside(target, closeContextMenu);
  });
  onActivated(() => {
    window.addEventListener('contextmenu', openContextMenu);
    onClickOutside(target, closeContextMenu);
  });
  onDeactivated(() => {
    window.removeEventListener('contextmenu', openContextMenu);
  });
  onMounted(() => {});
  return { x, y, target, visible, openContextMenu, closeContextMenu };
}
