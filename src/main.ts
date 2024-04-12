import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import vuetify from "@/config/vuetify";
import router from "@/router";
import {messageServicePlugin} from "@/service/message";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(messageServicePlugin);

app.mount('#app');
