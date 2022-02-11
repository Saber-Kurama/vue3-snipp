/*
 * @Author: saber
 * @Date: 2022-02-10 15:41:57
 * @LastEditTime: 2022-02-11 17:10:54
 * @LastEditors: saber
 * @Description:
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import './styles/global.scss';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
