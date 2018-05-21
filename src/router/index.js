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
    'Sportsmen',
    'Search',
    'Profile',
    'SportsmenHome',
  ];

  const publicRoutes = [
    'Login',
    'Logout',
    'Register',
    'Market',
    'Reset',
  ];

  if (privateRoutes.includes(to.name)) {
    const tokenData = Vue.ls.get('tokenData');
    if (tokenData) {
      next();
    } else {
      Vue.ls.clear();
      console.debug('Acaso te crees hacker!?');
      next({ name: 'Login' });
    }
  } else if (publicRoutes.includes(to.name)) {
    if (to.name === 'Logout') {
      Vue.ls.clear();
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    console.warn('Esta ruta no está definida, no puedo continuar');
  }
});

export default router;
