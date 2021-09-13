import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

import routes from './routes';
import startQiankun from './micro';
startQiankun();

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.config.productionTip = false;
app
  .use(Antd)
  .use(router)
  .mount('#app');
