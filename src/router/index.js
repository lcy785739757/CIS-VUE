import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Main from "../components/Main";
import Wel from "../components/Wel";
import addOldPerson from "../components/OldPerMan/addOldPerson";
import queryOldPerson from "../components/OldPerMan/queryOldPerson";
import addEmployee from "../components/EmployeeMan/addEmployee";
import queryEmployee from "../components/EmployeeMan/queryEmployee";

import Employ from "../components/DataMan/Employ";
import OldPer from "../components/DataMan/OldPer";
import Volunteer from "../components/DataMan/Volunteer";

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
      {path:'/queryOldPerson',name:'queryOldPerson',component:queryOldPerson},
      {path:'/addEmployee',name:'addEmployee',component:addEmployee},
      {path:'/queryEmployee',name:'queryEmployee',component:queryEmployee},

      {path:'/Employ',name:'Employ',component:Employ},
      {path:'/OldPer',name:'OldPer',component:OldPer},
      {path:'/Volunteer',name:'Volunteer',component:Volunteer},
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
