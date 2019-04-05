import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/movie/MovieList.vue'
import Show from '../views/movie/MovieDetail.vue'
import AddMovie from '../views/movie/MovieAdd.vue'
import Update from '../views/movie/MovieUpdate.vue'
import LoginForm from '../pages/Login.vue'
import Me from '../pages/Me.vue'

import store from '../store'

Vue.use(Router)

const requireAuth = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/loginpage')
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/movie/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/add/movie/',
      name: 'addmovie',
      component: AddMovie,
      beforeEnter: requireAuth()
    },
    {
      path: '/edit/movie/:id',
      name: 'update',
      component: Update,
      beforeEnter: requireAuth()
    },
    {
      path: '/loginpage',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      beforeEnter: requireAuth()
    }
  ]
})
