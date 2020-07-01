import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Main from "../components/Main";
import Wel from "../components/Wel";
import addOldPerson from "../components/OldPerMan/addOldPerson";
import queryOddPerson from "../components/OldPerMan/queryOddPerson";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    // redirect 重定向
    redirect: '/app_login'
  },
  {
    path:'/app_login',
    name:'/app_login',
    component:Login
  },
  {
    path:'/main',
    name:'main',
    component:Main,
    redirect: '/wel',
    children:[
      {path:'/wel',name:'wel',component:Wel},
      {path:'/addOldPerson',name:'addOldPerson',component:addOldPerson},
      {path:'/queryOddPerson',name:'queryOddPerson',component:queryOddPerson},
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
