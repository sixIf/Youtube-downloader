import "reflect-metadata"
import 'vue-class-component/hooks' 
import '@/router/componentHooks'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/assets/css/main.styl'
import { YoutubeService } from '@/services/youtubeService'
import { YOUTUBE_SERVICE } from '@/config/litterals'
import { ApplicationContainer } from '@/di/index'
import Vuex from 'vuex'
import store from './store/store'

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
    store: store,
    router,
    i18n,
    vuetify,
    provide: {
        [YOUTUBE_SERVICE]: ApplicationContainer.resolve(YoutubeService),
    },
    render: h => h(App)
}).$mount('#app')

