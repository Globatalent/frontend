import Home from '../views/Home/index.vue';
import Login from '../views/Login/index.vue';
import Register from '../views/Login/register.vue';

const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '*', redirect: '/login' },
];

export default routes;
