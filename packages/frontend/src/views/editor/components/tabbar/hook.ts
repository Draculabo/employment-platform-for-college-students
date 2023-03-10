import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/common/hooks/useLcoaStoage';
import { warningMessage } from '@/common/message';
import { createDIV, createStyle, query, removeHeadStyle, Heap, optimalizing, Optimalizing, OptimalizingItem } from '@/common/utils';
import { getPrimaryBGColor, getPrimaryColor } from '@/templates/config';
import { onActivated, ref } from 'vue';

const get = getLocalStorage,
  set = setLocalStorage;
const CUSTOM_CSS_STYLE = 'custom-css-style',
  CUSTOM_MARKDOWN_PRIMARY_COLOR = 'custom-markdown-primary-color',
  CUSTOM_MARKDOWN_PRIMARY_BG_COLOR = 'custom_markdown_primary_bg_color',
  MARKDOWN_FONT = 'markdown-font',
  AUTO_ONE_PAGE = 'auto-one-page',
  A4_HEIGHT = 1123;

export const step = ref(80);
export function setStep(val: import('element-plus/es/utils').Arrayable) {
  step.value = val;
}

export function useAvatar(emits: Function) {
  function setAvatar(event: any) {
    let file = event.target.files[0];
    let path = URL.createObjectURL(file);
    emits('upload-avatar', path);
  }

  return {
    setAvatar,
  };
}

export function useCustomCSS(resumeType: string) {
  let cssDialog = ref(false),
    cacheKey = CUSTOM_CSS_STYLE + '-' + resumeType;
  let cssText = ref(get(cacheKey) ? (get(cacheKey) as string) : '');

  function toggleDialog() {
    cssDialog.value = !cssDialog.value;
  }

  function setStyle() {
    cssDialog.value = false;
    let cssValue = cssText.value.trim(),
      style = query(cacheKey),
      isAppend = style;
    if (!cssText.value) {
      return;
    }
    if (!style) {
      style = createStyle();
      style.setAttribute(cacheKey, 'true');
    }
    style.textContent = cssValue;
    !isAppend && document.head?.appendChild(style);
    set(cacheKey, cssValue);
  }

  function removeStyle() {
    cssDialog.value = false;
    removeHeadStyle(cacheKey);
    removeLocalStorage(cacheKey);
    cssText.value = '';
  }

  onActivated(() => !query(cacheKey) && setTimeout(setStyle, 50));

  return {
    cssDialog,
    cssText,
    toggleDialog,
    setStyle,
    removeStyle,
  };
}

export function usePrimaryBGColor(resumeType: string) {
  const cacheKey = CUSTOM_MARKDOWN_PRIMARY_BG_COLOR + '-' + resumeType,
    initialColor = getPrimaryBGColor(resumeType);
  const primaryColor = ref(get(cacheKey) ? (get(cacheKey) as string) : initialColor);

  function setPrimaryColor(color: string) {
    if (!color) {
      primaryColor.value = initialColor;
      color = initialColor;
    }
    let style = query(cacheKey),
      append = style;
    if (!style) {
      style = createStyle();
      style.setAttribute(cacheKey, 'true');
    }
    style.textContent = `:root { --markdown-primary-bg-color: ${color}; }`;
    !append && document.head.appendChild(style);
    set(cacheKey, color);
  }

  onActivated(() => !query(cacheKey) && setPrimaryColor(primaryColor.value));

  return {
    primaryColor,
    setPrimaryColor,
  };
}
// todo: ???????????????????????????????????????????????????????????????
export function usePrimaryColor(resumeType: string) {
  const cacheKey = CUSTOM_MARKDOWN_PRIMARY_COLOR + '-' + resumeType,
    initialColor = getPrimaryColor(resumeType),
    color = ref(get(cacheKey) ? (get(cacheKey) as string) : initialColor);

  function setColor(value: string | null) {
    if (!value) {
      color.value = initialColor;
      value = initialColor;
    }
    let styleDOM = query(cacheKey);
    const isAppend = styleDOM;

    if (!styleDOM) {
      styleDOM = createStyle();
      styleDOM.setAttribute(cacheKey, 'true');
    }
    styleDOM.textContent = `:root { --markdown-primary-color: ${value} }`;
    !isAppend && document.head.appendChild(styleDOM);
    set(cacheKey, value);
  }

  onActivated(() => !query(cacheKey) && setColor(color.value));

  return {
    color,
    setColor,
  };
}

// ???????????????
export function useCustomFont(resumeType: string) {
  const cacheKey = MARKDOWN_FONT + '-' + resumeType;
  const fontOptions = [
    {
      value: '??????GDC???',
      label: '??????GDC???',
    },
    {
      value: 'Helvetica Neue',
      label: 'Helvetica Neue',
    },
    {
      value: 'Menlo-Regular',
      label: 'Menlo-Regular',
    },
    {
      value: '??????????????? W02',
      label: '??????????????? W02',
    },
  ];
  const font = ref(get(cacheKey) ? (get(cacheKey) as string) : 'Helvetica Neue');

  function setFont(fontFamily: string) {
    let style = query(cacheKey),
      isAppend = style;
    if (!style) {
      style = createStyle();
      style.setAttribute(cacheKey, 'true');
    }
    style.textContent = `.jufe { font-family: ${fontFamily}; }`;
    !isAppend && document.head.appendChild(style);
    set(cacheKey, fontFamily);
  }

  onActivated(() => setFont(font.value));

  return {
    fontOptions,
    font,
    setFont,
  };
}

// ????????????
export function splitPage(renderDOM: HTMLElement) {
  let page = 0,
    realHeight = 0,
    target = renderDOM.clientHeight,
    reRender = document.querySelector('.re-render');
  reRender!.innerHTML = '';
  while (target - realHeight > 1) {
    const wrapper = createDIV(),
      resumeNode = renderDOM.cloneNode(true) as HTMLElement;
    wrapper.classList.add('jufe-wrapper-page');
    // ????????????????????? ???????????????
    let realRenderHeight = Math.min(target - realHeight, A4_HEIGHT);
    const wrapperItem = createDIV();
    wrapperItem.classList.add('jufe-wrapper-page-item');
    wrapperItem.style.height = realRenderHeight + 'px';

    resumeNode.style.position = 'absolute';
    resumeNode.style.top = -page * A4_HEIGHT + 'px';
    resumeNode.style.left = 0 + 'px';

    wrapperItem.appendChild(resumeNode);
    wrapper.appendChild(wrapperItem);

    realHeight += A4_HEIGHT;
    page++;
    reRender?.appendChild(wrapper);
  }
}

/* ???????????? Start */
export function useAutoOnePage(resumeType: string) {
  const cacheKey = AUTO_ONE_PAGE + '-' + resumeType,
    autoOnePage = ref(get(cacheKey));

  async function setAutoOnePage() {
    const container: HTMLElement = document.querySelector('.markdown-transform-html') as HTMLElement;
    if (autoOnePage.value) {
      const difference = A4_HEIGHT - container?.clientHeight;
      if (difference < 0 && difference < -200) {
        warningMessage('?????????????????????????????????????????????????????????????????????');
        return;
      }
      if (difference > 0 && difference > 500) {
        warningMessage('????????????????????????????????????????????????????????????????????????????????????????????????');
        return;
      }
      const { differenceConfig, map } = useInitMarginTop(container);
      useOnePageCSSContent(differenceConfig, difference, map, cacheKey);
    } else {
      removeHeadStyle(cacheKey);
    }
    // ??????3?????????
    set(cacheKey, autoOnePage.value);
    splitPage(container);
  }
  onActivated(() => !query(cacheKey) && setTimeout(setAutoOnePage, 50));

  return {
    autoOnePage,
    setAutoOnePage,
  };
}

function useInitMarginTop(container: HTMLElement) {
  const titles = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6,li,p')),
    differenceConfig: OptimalizingItem[] = [];
  const visited = new Set(),
    map = new Map();
  for (let title of titles) {
    const tag = title.tagName.toLowerCase();
    map.set(tag, (map.get(tag) || 0) + 1);
    if (visited.has(tag)) {
      continue;
    }
    visited.add(tag);
    const top = +getComputedStyle(title, null).marginTop.slice(0, -2);
    const cur = { ...optimalizing[tag as keyof Optimalizing], top, tag };
    // ???????????????
    let optimal = cur.top / cur.max;
    cur.optimal = optimal;
    differenceConfig.push(cur);
  }
  return { differenceConfig, map };
}

function useOnePageCSSContent(optimaliza: OptimalizingItem[], difference: number, map: Map<string, number>, cacheKey: string) {
  const heap = new Heap((x, y) => (difference < 0 ? x.optimal > y.optimal : x.optimal < y.optimal));
  for (let optimal of optimaliza) {
    heap.push(optimal);
  }
  if (difference < 0) {
    // ????????? (???????????????????????? ???????????????)
    while (difference++ < 20) {
      let topEl = heap.pop();
      topEl!.top = topEl!.top - 1 / (map.get(topEl!.tag) || 1);
      topEl!.optimal = topEl!.top / topEl!.max;
      heap.push(topEl as OptimalizingItem);
    }
  } else {
    // ????????? (??????????????????????????? ????????????)
    while (difference-- > 20) {
      let topEl = heap.pop();
      topEl!.top = topEl!.top + 1 / (map.get(topEl!.tag) || 1);
      topEl!.optimal = topEl!.top / topEl!.max;
      heap.push(topEl as OptimalizingItem);
    }
  }
  // ???????????????
  const styleDOM = createStyle(),
    prefix = '.jufe ';
  let cssText = '';
  styleDOM.setAttribute(cacheKey, 'true');

  for (let optimal of heap.container) {
    cssText += `${prefix}${optimal.tag} { margin-top: ${optimal.top}px; }`;
  }
  styleDOM.textContent = cssText;
  document.head.appendChild(styleDOM);
}
