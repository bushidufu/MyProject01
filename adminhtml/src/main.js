import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import "babel-polyfill";
import lodash from 'lodash';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, { Validator } from 'vee-validate';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题




let isproduct = false; //192.168.1.100

//三十：192.168.1.123:8082  弓虽：192.168.1.101:8080  禾斗：默认121.42.167.212：
window.baseURL =  isproduct ? 'http://139.129.209.174:8092/' :'http://139.129.209.174:8092/';
//window.baseURL =  isproduct ? 'http://localhost:8080/' :'http://localhost:8080/';
//window.baseURL =  isproduct ? 'http://121.42.167.212:8080/' :'http://121.42.167.212:8080/';
window.basePic = 'http://img.blueberryworks.cn/';
window.baseVideo = 'http://video.blueberryworks.cn/';
window.baseUploadImgUrl =  window.baseURL + 'upload/image';
window.baseUploadVideoUrl = window.baseURL + 'app/v1/upload/video';



//axios.defaults.baseURL = window.baseURL;
// Validator.addLocale(zh_CN);
// Vue.use(VeeValidate, {
//     locale: 'zh_CN'
// });
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$lodash = lodash;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');