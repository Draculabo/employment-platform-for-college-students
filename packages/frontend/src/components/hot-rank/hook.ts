import { useRouter } from 'vue-router';
import { errorMessage } from '@/common/message';
import { queryCommunityHotRank } from '@/services/modules/community/community';
import { onMounted, ref } from 'vue';
import { CommunityListResponse } from '@/services/modules/community/type';

export function useHotRank() {
  const hotList = ref<CommunityListResponse['list']>([]),
    router = useRouter();

  async function queryHotRankList() {
    const hotRankList = await queryCommunityHotRank({
      config: {
        pageNo: 1,
        pageSize: 20,
      },
    });
    if (hotRankList.status === 0) {
      hotList.value = hotRankList.data.list;
      return;
    }
    if (hotRankList.msg) errorMessage(hotRankList.msg);
  }

  function useDetail(articleId: string) {
    router.push(`/community/detail?articleId=${articleId}`);
  }
  // 请求一次就行
  onMounted(() => queryHotRankList());

  return {
    useDetail,
    hotList,
  };
}
