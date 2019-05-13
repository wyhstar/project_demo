// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import promise from 'es6-promise';
import cookies from 'vue-cookies'
import axios from 'axios'
import {post,get,patch,put,getAuthority} from './common/js/http'
import {delCookie,getCookie,setCookie,getParamer,format,clone,compare,serilizeUrl,getPreMonth} from './common/js/util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 语言切换
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import ElementLocale from 'element-ui/lib/locale'
import messages from './assets/langs'
// 主题颜色切换
import '@/assets/css/element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$getAuthority=getAuthority;
Vue.prototype.$format=format;
Vue.prototype.$clone=clone;
Vue.prototype.$compare=compare;
Vue.prototype.$serilizeUrl=serilizeUrl;
Vue.prototype.$getPreMonth=getPreMonth;

Vue.prototype.$getCookie=getCookie;
Vue.prototype.$setCookie=setCookie;
Vue.prototype.$delCookie=delCookie;
Vue.prototype.$getParamer=getParamer;

Vue.use(VueI18n)
Vue.use(ElementUI,{locale})
Vue.use(Vuex)
Vue.use(cookies)
promise.polyfill();

var i18n = new VueI18n({
  locale: sessionStorage.lang || 'cn',
  messages,
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

router.beforeEach((to, from, next) => {
  var host=document.domain;
  if(host == "localhost"){
    next();
    return
  }
  var isToken = getCookie('Token')
  var path=to.path;
  if((isToken === "undefined" || isToken == "") && path.indexOf('/login')<0){
    document.title = "渠道中心管理平台";
    window.location.href="/c-center"
  }else {
    document.title = "渠道中心管理平台";
    next();
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  ElementUI,
  cookies,
  components: { App },
  template: '<App/>'
})
