// import './sass/main.scss'
import './app.scss'

import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'

//firebase auth service
import { projectAuth } from './firebase/config'

//if the page is reloaded it will wait for the firebase to connect with the app 
let app: VueApp | null = null;

projectAuth.onAuthStateChanged(() => {
    // onAuthStateChanged => fires the callback F everytime that firebase detects a change in authentication
    if (!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})
