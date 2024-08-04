import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "@/locales/i18n.js";
import router from "@/router/index.js";
import {createPinia} from "pinia";

createApp(App)
    .use(createPinia())
    .use(router)
    .use(i18n)
    .mount('#app')
