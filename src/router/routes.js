import Home from '@/views/Home/index.vue';
import Login from '@/views/Login/index.vue';
import Search from '@/views/Search/index.vue';
import Market from '@/views/Market/index.vue';
import Register from '@/views/Login/register.vue';
import Sportsmen from '@/views/Sportsmen/index.vue';

const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/search', name: 'Search', component: Search },
  { path: '/market', name: 'Market', component: Market },
  { path: '/sportsmen/:sportsmenid', name: 'Sportsmen', component: Sportsmen },
  { path: '/login', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout' },
  { path: '/register', name: 'Register', component: Register },
  { path: '*', redirect: { name: 'Home' } },
];

export default routes;
