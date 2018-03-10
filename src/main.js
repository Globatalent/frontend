import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueLocalStorage from 'vue-ls';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';

import './plugins/font-awesome';
import './assets/stylus/colors.styl';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueLocalStorage, { namespace: 'vuejs__' });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
