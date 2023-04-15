<script setup lang="ts">
import { formatTimefromNow } from '@/common/utils/date';
import UserTooltip from '@/components/userTooltip.vue';
import { UserBaseInfo } from '@/services/modules/user';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';

const props = defineProps<{
  userInfo: UserBaseInfo;
  publishTime?: string;
}>();
const router = useRouter();
const gotoUserDetail = () => {
  console.log(props);

  router.push(`/user/profile/${props.userInfo.user_id}`);
};
</script>

<template>
  <div class="user-head flex" @click="gotoUserDetail">
    <img class="pointer mr-5" :src="userInfo?.avatar_url" />
    <user-tooltip class="user-tooltip" :user-info="userInfo" />
    <div class="user-info">
      <span class="user-name">{{ userInfo?.username }}</span>
      <div class="date-school">
        <span v-if="publishTime" class="datetime mr-20">{{ formatTimefromNow(publishTime as string) }}发布</span>
        <!-- <span class="school">
          <i class="iconfont icon-school" />
          {{ userInfo?.school }} - {{ userInfo?.graduation }}届
        </span> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-head {
  margin-bottom: 10px;
  color: #333;
  position: relative;

  img {
    width: 35px;
    height: 35px;
    border-radius: 5px;

    &:hover + .user-tooltip {
      display: block;
    }
  }

  .user-tooltip {
    display: none;
    border: 1px solid #eee;
    position: absolute;
    top: 30px;
    left: 25px;
    z-index: 3;

    &:hover {
      display: block;
    }
  }

  .user-info {
    display: inline-block;
    font-size: 0.9rem;

    .date-school {
      color: #888;
    }
  }
}
</style>
