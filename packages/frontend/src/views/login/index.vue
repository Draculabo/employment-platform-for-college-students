<script setup lang="ts">
import { toRaw } from 'vue';
import { successMessage } from '@/common/message';
import { LoginPageType } from './utils/enums';
import { loadRouteLocation, useRouter } from 'vue-router';
import { FormInstance } from 'element-plus';
import { useUserLogin } from './hook';
import Motion from './utils/motion';
import { useRenderIcon } from '@/components/icon/src/hooks';
import { bg, avatar, illustration } from './utils/static';
import Register from './components/register.vue';
import ForgotPassword from './components/forgotPassword.vue';
import { operators } from './utils/enums';
import ImageVerify from '@/components/imageVerify';
import Lock from '@iconify-icons/ri/lock-fill';
import Check from '@iconify-icons/ep/check';
import User from '@iconify-icons/ri/user-3-fill';
const imgCode = ref('');
const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const ruleFormRef = ref<FormInstance>();
const currentPage = computed(() => {
  console.log('我出发了更新');
  console.log(useUserLogin().currentPage);

  return useUserLogin().currentPage;
});
const { userForm, login } = useUserLogin();
// const { initStorage } = useLayout();
// initStorage();
// const { dataTheme, dataThemeChange } = useDataThemeChange();
// dataThemeChange();
// const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();

const onLogin = (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  const asyncFn = async () => {
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // useUserStoreHook()
        //   .loginByUsername({ username: ruleForm.account, password: 'admin123' })
        loading.value = false;
        await login(); // if (res.success) {
        //   // 获取后端路由
        //   initRouter().then(() => {
        //     router.push('/');
        //     message('登录成功', { type: 'success' });
        //   });
        // }
      } else {
        loading.value = false;
        return fields;
      }
    });
  };

  asyncFn();
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === 'Enter') {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener('keypress', onkeypress);
});
onBeforeUnmount(() => {
  window.document.removeEventListener('keypress', onkeypress);
});

watch(imgCode, (value) => {
  useUserLogin().setVerifyCode(value);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">
              {{ currentPage }}
            </h2>
          </Motion>
          <el-form v-if="currentPage === LoginPageType.登录" ref="ruleFormRef" :model="userForm" size="large">
            <Motion :delay="100">
              <el-form-item prop="username">
                <el-input clearable v-model="userForm.account" placeholder="请输入账号" :prefix-icon="useRenderIcon(User)" />
              </el-form-item>
            </Motion>
            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input clearable show-password v-model="userForm.password" placeholder="请输入密码" :prefix-icon="useRenderIcon(Lock)" />
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <el-form-item prop="verifyCode">
                <el-input
                  clearable
                  v-model="userForm.verify"
                  placeholder="请输入验证码"
                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
                >
                  <template v-slot:append>
                    <ImageVerify v-model:code="imgCode" />
                  </template>
                </el-input>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="checked"> 记住密码 </el-checkbox>
                  <el-button link type="primary" @click="useUserLogin().setCurrentPage(LoginPageType.忘记密码)"> 忘记密码 </el-button>
                </div>
                <el-button
                  class="w-full mt-4"
                  style="background: var(--el-button-bg-color)"
                  size="default"
                  type="primary"
                  :loading="loading"
                  @click="onLogin(ruleFormRef)"
                >
                  登录
                </el-button>
              </el-form-item>
            </Motion>

            <Motion :delay="300">
              <el-form-item>
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-button
                    v-for="(item, index) in operators"
                    :key="index"
                    class="w-full mt-4"
                    size="default"
                    @click="useUserLogin().setCurrentPage(item.value)"
                  >
                    {{ item.title }}
                  </el-button>
                </div>
              </el-form-item>
            </Motion>
          </el-form>

          <!-- <Motion v-if="currentPage === 0" :delay="350">
            <el-form-item>
              <el-divider>
                <p class="text-gray-500 text-xs">{{ t('login.thirdLogin') }}</p>
              </el-divider>
              <div class="w-full flex justify-evenly">
                <span v-for="(item, index) in thirdParty" :key="index" :title="t(item.title)">
                  <IconifyIconOnline :icon="`ri:${item.icon}-fill`" width="20" class="cursor-pointer text-gray-500 hover:text-blue-400" />
                </span>
              </div>
            </el-form-item>
          </Motion> -->
          <!-- 注册 -->
          <Register v-if="currentPage === LoginPageType.注册" />
          <!-- 忘记密码 -->
          <ForgotPassword v-if="currentPage === LoginPageType.忘记密码" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}

.login-form {
  width: 360px;
}

.avatar {
  width: 350px;
  height: 80px;
}

.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: bold 200% Consolas, Monaco, monospace;
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form {
    width: 290px;
  }

  .login-form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 360px;
  }

  .avatar {
    width: 280px;
    height: 80px;
  }
}

@media screen and (max-width: 968px) {
  .wave {
    display: none;
  }

  .img {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
