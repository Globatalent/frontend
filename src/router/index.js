import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.debug('From:', from.name, ' ==> ', 'To:', to.name);

  const privateRoutes = [
    'Home',
  ];

  const publicRoutes = [
    'Login',
    'Register',
  ];

  if (privateRoutes.includes(to.name)) {
    const tokenData = Vue.ls.get('tokenData');
    if (tokenData) {
      console.debug('Estas logeado!');
      next();
    } else {
      Vue.ls.clear();
      console.debug('Hacker!');
      next({ name: 'Login' });
    }
  } else if (publicRoutes.includes(to.name)) {
    next();
  }
});

export default router;
