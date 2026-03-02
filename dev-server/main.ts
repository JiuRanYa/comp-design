import { createApp } from 'vue'
import { install } from '../components/index'
import './style.scss'
import '../styles/index.scss'

Promise.all([import(`./router/port-${__PORT__}.ts`), import('./App.vue')]).then(
  ([{ router }, { default: App }]) => {
    createApp(App).use(install).use(router).mount('#app')
  },
)
