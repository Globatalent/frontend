import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueLocalStorage from 'vue-ls';
import _ from 'lodash';
import moment from 'moment';
import VueNumeric from 'vue-numeric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';

import './plugins/font-awesome';
import './assets/stylus/colors.styl';

Vue.use(BootstrapVue);
Vue.use(VueNumeric);
Vue.config.productionTip = false;
Vue.use(VueLocalStorage, { namespace: 'vuejs__' });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
