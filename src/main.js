import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { router } from './routes/index.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(Element)
new Vue({
    render: function(h) { return h(App) },
    router,
    data: {
        showModal: false
    }
}).$mount('#app')