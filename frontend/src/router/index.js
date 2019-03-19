import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/movie/MovieList.vue'
import Show from '../views/movie/MovieDetail.vue'
import AddMovie from '../views/movie/MovieAdd.vue'
import Update from '../views/movie/MovieUpdate.vue'
import LoginForm from "../views/login/LoginForm.vue";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/movie/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/add/movie/',
      name: 'addmovie',
      component: AddMovie
    },
    {
      path: '/edit/movie/:id',
      name: 'update',
      component: Update
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
  ]
})
