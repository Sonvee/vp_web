import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'mui-player/dist/mui-player.min.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
