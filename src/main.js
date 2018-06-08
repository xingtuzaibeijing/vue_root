import Vue from 'vue'
import App from './App'
import "babel-polyfill"
import router from './router'
import './static/js/jquery-1.9.1.js'
import './static/layui/css/layui.css'
import './static/layui/layui.js'
import './static/css/style.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import api from './api/index.js'
import store from './store/store'
import echarts from 'echarts'


Vue.prototype.$echarts = echarts;
Vue.use(api);

Vue.config.productionTip = false;

Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
