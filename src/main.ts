/*
 * @Author: saber
 * @Date: 2022-02-10 15:41:57
 * @LastEditTime: 2022-02-22 14:20:48
 * @LastEditors: saber
 * @Description:
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// todo: 后续自己封装一个 vue3 simplebar
import 'simplebar/dist/simplebar.min.css';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import './styles/global.scss';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(FloatingVue);
app.use(createPinia());
app.use(router);

app.mount('#app');
