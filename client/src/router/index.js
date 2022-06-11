import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Help from '../views/Help.vue'
import AddServer from '../views/AddServer.vue'
import Server from '../views/Server.vue'
import EditServer from '../views/EditServer.vue'
import Admin from '../views/Admin.vue'
import User from '../views/User.vue'
import Leaderboards from '@/views/Leaderboards.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin/add-server',
    name: 'add-server',
    component: AddServer
  },
  {
    path: '/admin/help',
    name: 'help',
    component: Help
  },
  {
    path: '/server/:id',
    name: 'server',
    component: Server
  },
  {
    path: '/edit-server/:id',
    name: 'edit-server',
    component: EditServer
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/leaderboards',
    name: 'leaderboards',
    component: Leaderboards
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
]

const router = new VueRouter({
  routes
})

export default router
