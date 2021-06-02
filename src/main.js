import Vue from 'vue';
import App from './App.vue';
import router from './router';
import animated from 'animate.css';

Vue.config.productionTip = false;
Vue.use( animated );


import ElementUI from 'element-ui';
Vue.use( ElementUI );
import 'element-ui/lib/theme-chalk/index.css';
new Vue( {
  router,
  render: ( h ) => {
 return h( App );
}
} ).$mount( '#app' );
