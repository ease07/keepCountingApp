import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()

//配种DatePicker
import {DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(DatePicker)

//配置moment
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn')

//配置Echarts给vue原型
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

//配置Axios
// import Axios from 'axios'
// Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = 'http://127.0.0.1:3000'

// import axios from "axios"

// import apiConfig from './config/api.config'
// axios.defaults.baseURL = apiConfig.baseURL
// Vue.prototype.$http = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
