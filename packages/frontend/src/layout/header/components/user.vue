<script setup lang="ts">
import ToastModal from '@/components/toast-modal/toastModal.vue';
import useUserStore from '@/store/modules/user';
import Profile from '@/components/profile.vue';
import PWDUpdate from '@/components/pwd-update/PWDUpdate.vue';
import NavBar from '@/components/navBar.vue';
import CRM from '@/components/comment-reply-msg/crm.vue';
// import ChatRoom from "@/components/chat-room/chat.vue";

import { useRouter } from 'vue-router';
import { useUserLogin, useUpdateInfoModel, useUpdatePWDModel, useNavigator, useUserInfo, useRegister, useMessage } from '../hook';
import { useNotificationList } from '@/components/comment-reply-msg/hook';

const router = useRouter();
const { user, login, logout } = useUserLogin();
const { infoModel, setInfoModel } = useUpdateInfoModel();
const { updateInfo } = useUserInfo();
const { PWDModel, setPWDModel } = useUpdatePWDModel();
const { loginModelToggle, userInfo, genVerify, loginState } = useUserStore();
const { model, registerUser, toggleModel } = useRegister();
const { messageModal, toggleMessageModal, tab, msgTabChange } = useMessage();
const { data, total, commentTotal, readNotification, pageNumChange } = useNotificationList(toggleMessageModal);
</script>

<template>
  <div class="user">
    <template v-if="loginState.loginStatus">
      <div class="user-creative pointer primary" @click="useNavigator(router, '/community/editor')">
        发布文章 <i class="iconfont icon-edit font-20"></i>
      </div>
      <!-- 消息提示 -->
      <template v-if="commentTotal">
        <el-badge :value="commentTotal" class="mr-20">
          <i class="iconfont icon-message1 message hover pointer font-25" @click="toggleMessageModal"></i>
        </el-badge>
      </template>
      <i v-else class="iconfont icon-message1 message hover pointer font-25" @click="toggleMessageModal"></i>
      <!-- 用户信息 -->
      <span class="user-nick mr-10">{{ userInfo.user_name }}</span>
      <el-dropdown>
        <img @click="setInfoModel" class="pointer mr-10" :src="userInfo.avatar_url" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push(`/user/profile/${userInfo.user_uuid}`)">个人信息</el-dropdown-item>
            <el-dropdown-item @click="setPWDModel">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <span v-else class="pointer mr-10" @click="loginModelToggle">登录</span>
  </div>
  <!-- 个人信息修改 -->
  <!-- <toast-modal width="400px" :flag="infoModel" @close="setInfoModel">
    <Profile @cancel="setInfoModel" @submit="updateInfo" />
  </toast-modal> -->
  <render-drawer :flag="infoModel" @close="setInfoModel">
    <template #default>
      <Profile @cancel="setInfoModel" @submit="(e) => updateInfo(setInfoModel)" />
    </template>
  </render-drawer>
  <!-- 密码修改 -->
  <toast-modal width="300px" :flag="PWDModel" @close="setPWDModel">
    <PWD-update @cancel="setPWDModel" />
  </toast-modal>
  <!-- 登录 -->
  <!-- <toast-modal @close="loginModelToggle" :flag="loginState.loginModel" width="300px">
    <div class="login" v-if="!model" data-aos="zoom-in">
      <h3>用户登录</h3>
      <input v-model="user.account" placeholder="用户名" />
      <input v-model="user.password" type="password" placeholder="密码" />
      <input v-model="user.verify" placeholder="验证码" />
      <img @click="genVerify" class="verify-code pointer" :src="loginState.verifyImg" />
      <button class="btn primary" @click.prevent="login(user, true)">马上登录</button>
      <button class="btn plain" @click.prevent="toggleModel">我要注册</button>
    </div> -->
  <!-- 注册 -->
  <!-- <div class="register" v-if="model" data-aos="zoom-in">
      <h3>用户注册</h3>
      <input v-model="registerUser.account" placeholder="用户名" />
      <input v-model="registerUser.password" type="password" placeholder="密码" />
      <input v-model="registerUser.verify" placeholder="验证码" />
      <img @click="genVerify" class="verify-code pointer" :src="loginState.verifyImg" />
      <button class="btn primary" @click.prevent="login(registerUser, false)">注册</button>
      <button class="btn plain" @click.prevent="toggleModel">去登录</button>
    </div>
  </toast-modal> -->
  <!-- 消息内容 -->
  <toast-modal @close="toggleMessageModal" :flag="messageModal" width="80%">
    <NavBar :tabs="['评论/回复']" @tab-click="msgTabChange" />
    <CRM v-if="tab == 0" :data="data" :total="total" @read-notification="readNotification" @query-data="pageNumChange" />
    <!-- <chat-room v-if="tab == 1" /> -->
  </toast-modal>
</template>

<style lang="scss" scoped>
.user {
  flex-basis: 250px;
  white-space: nowrap;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .message {
    color: #555;
  }

  .user-nick {
    display: inline-block;
    font-size: 0.9rem;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .login {
    &:hover {
      opacity: 0.6;
    }
  }
}

.login,
.register {
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    border: 0.5px solid transparent;
    outline: none;
    background: #eee;
    border-radius: 8px;
    padding: 10px;

    &:focus {
      border: 0.5px solid var(--theme);
    }
  }

  input,
  img,
  .btn-group,
  h3,
  button {
    margin-bottom: 10px;
  }

  .verify-code {
    width: 120px;
  }

  .tip {
    font-size: 10px;
    position: absolute;
    right: 10px;
    bottom: -10px;
  }
}
</style>
