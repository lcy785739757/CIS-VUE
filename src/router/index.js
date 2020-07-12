import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Main from "../components/Main";
import Wel from "../components/Wel";
import addOldPerson from "../components/OldPerMan/addOldPerson";
import queryOldPerson from "../components/OldPerMan/queryOldPerson";
import addEmployee from "../components/EmployeeMan/addEmployee";
import queryEmployee from "../components/EmployeeMan/queryEmployee";
import addVolunteer from "../components/VolunteerMan/addVolunteer";
import queryVolunteer from "../components/VolunteerMan/queryVolunteer";

import Employ from "../components/DataMan/Employ";
import OldPer from "../components/DataMan/OldPer";
import Volunteer from "../components/DataMan/Volunteer";

import Camera from "../components/CameraMan/Camera";
import Camera2 from "../components/CameraMan/Camera2";
import Camera3 from "../components/CameraMan/Camera3";
import Camera4 from "../components/CameraMan/Camera4";
import Camera5 from "../components/CameraMan/Camera5";
import Event from "../components/CameraMan/Event";

import FaceSetting from "../components/Setting/FaceSetting";

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
      {path:'/addVolunteer',name:'addVolunteer',component:addVolunteer},
      {path:'/queryVolunteer',name:'queryVolunteer',component:queryVolunteer},

      {path:'/OldPer',name:'OldPer',component:OldPer},
      {path:'/Employ',name:'Employ',component:Employ},
      {path:'/Volunteer',name:'Volunteer',component:Volunteer},

      {path: '/Camera',name: 'Camera',component: Camera},
      {path: '/Camera2',name: 'Camera2',component: Camera2},
      {path: '/Camera3',name: 'Camera3',component: Camera3},
      {path: '/Camera4',name: 'Camera4',component: Camera4},
      {path: '/Camera5',name: 'Camera5',component: Camera5},
      {path: '/Event',name: 'Event',component: Event},

      {path: '/FaceSetting',name: 'FaceSetting',component: FaceSetting},
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
