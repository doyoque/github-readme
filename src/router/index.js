import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListRepos from '../components/ListRepos'
import Readme from '../components/Readme'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/repos/:username',
    name: 'ListRepos',
    component: ListRepos,
  },
  {
    path: '/repos/:username/:repo',
    name: 'Readme',
    component: Readme
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
