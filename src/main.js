import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'
import 'amfe-flexible';
import router from './router/index'
import store from './store'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import './api/mock'


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

