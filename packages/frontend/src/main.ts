import { createApp } from 'vue';
import App from './App.vue';
import router from './permission';
import '@/common/global.scss';
import './index.css';
import pinia from '@/store';
import ContextMenu from '@imengyu/vue3-context-menu';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(pinia).use(ContextMenu).mount('#app');
