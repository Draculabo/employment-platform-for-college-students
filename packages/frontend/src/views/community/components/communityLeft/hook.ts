import { isLogin } from '@/common/hooks/global';
import useUserStore from '@/store/modules/user';
import { errorMessage } from '@/common/message';
import { queryCommunity } from '@/services/modules/community/community';
import { reactive, ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { CommunityListRequest, CommunityListResponse } from '@/services/modules/community/type';
import { isNil } from 'lodash';
import { PaginationParams } from '@/services/type';
import { ArticleType } from '@/types/enums';
import { tabs } from './constant';
import { useRoute } from 'vue-router';

export interface ICommunityCondition {
  config: PaginationParams;
  keyword?: string;
  tab: number;
  article_type?: ArticleType;
}
export interface IKeyValueMap {
  label: string;
  value: string;
}
export const typeTab: IKeyValueMap[] = [
  {
    label: '发表时间',
    value: 'created_at',
  },
  {
    label: '更新时间',
    value: 'updated_at',
  },
];
export function useTab(conditions: ICommunityCondition, conditionQuery: Function) {
  const tab = ref(tabs[1]);
  function toggleTab(idx: number) {
    tab.value = tabs[idx];
    conditions.tab = idx;
    // 切换就要重新计算pageNum了
    conditions.config.pageNo = 1;
    conditionQuery();
  }
  return {
    tab,
    toggleTab,
  };
}

export function useCommunityData() {
  // const { userInfo, loginModelToggle } = useUserStore();
  const data = ref<CommunityListResponse['list']>([]),
    loading = ref(false),
    noMore = ref(false);
  const conditions = reactive<
    CommunityListRequest & {
      tab: number;
    }
  >({
    config: {
      pageNo: 1,
      pageSize: 10,
      distinct: false,
      order: ['created_at', 'ASC'],
    },
    article_type: ArticleType.All,
    keyword: '',
    tab: 1,
  });

  const route = useRoute();
  // 无限滚动
  async function queryList(user_id?: string) {
    if (noMore.value) {
      return;
    }

    loading.value = true;
    conditions.config.pageNo++;
    if (typeof conditions.article_type === 'number' && conditions.article_type < 0) {
      conditions.article_type = undefined;
    }
    const res = await queryCommunity({ ...conditions, user_id });
    if (res.status !== 0 && res.msg) {
      return errorMessage(res.msg);
    }
    if (isNil(res.data?.list)) {
      return;
    }
    loading.value = false;
    data.value.push(...res.data.list);
    if (res.data.list.length < conditions.config.pageSize) {
      noMore.value = true;
    }
  }
  // 条件查询
  async function conditionQuery() {
    loading.value = true;
    console.log(conditions.article_type);
    if (typeof conditions.article_type === 'number' && conditions.article_type < 0) {
      conditions.article_type = undefined;
    }
    const res = await queryCommunity({ ...conditions, user_id: route.params['id'] as string });
    if (res.status !== 0 && res.msg) {
      return errorMessage(res.msg);
    }
    if (isNil(res.data)) {
      return;
    }
    loading.value = false;
    data.value = res.data.list;
    if (data.value.length < conditions.config.pageSize) {
      noMore.value = true;
    }
  }
  // 点击专业锚点查询
  // function queryProfessional(professional: string) {
  //   if (professional != conditions.professional) {
  //     conditions.professional = professional;
  //     conditionQuery();
  //   }
  // }
  // 删除文章
  function removeArticle(idx: number) {
    data.value.splice(idx, 1);
  }
  // 重置子查询
  function resetSub() {
    conditions.config.pageSize = 10;
    conditions.keyword = '';
    // conditions.professional = '';
    conditionQuery();
  }
  // 搜索
  function searchSub() {
    conditions.config.pageNo = 1;
    conditionQuery();
  }
  function toggleTypeTab(value: { label: string; value: 'ASC' | 'DESC' }) {
    conditions.config.order = ['created_at', value.value];
    conditionQuery();
  }
  return {
    data,
    loading,
    noMore,
    conditions,
    resetSub: useThrottleFn(resetSub, 1000),
    searchSub: useThrottleFn(searchSub, 1000),
    queryList,
    toggleTypeTab,
    // queryProfessional,
    removeArticle,
    conditionQuery,
  };
}
