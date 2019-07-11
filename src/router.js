import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Home003 from './views/Home003.vue'
import Home004 from './views/Home004.vue'
import Login from './views/Login.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home003',
      name: 'home003',
      component: Home003
    },
    {
      path: '/home004',
      name: 'home004',
      component: Home004
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
