import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Task from '../components/Task.vue'
import History from '../components/History.vue'
import Storage from '../components/Storage.vue'
import Control from '../components/Control.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: Home,
  redirect: './welcome',
  children: [{
    path: '/welcome',
    component: Welcome
  }, {
    path: '/task',
    component: Task
  }, {
    path: '/history',
    component: History
  }, {
    path: '/storage',
    component: Storage
  }, {
    path: '/control',
    component: Control
  }

  ]
}
]

const router = new VueRouter({
  routes
})

export default router
