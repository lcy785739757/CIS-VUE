/* eslint-disable*/
import axios from 'axios'
import { get, post } from './http'

// ==========================================》管理员api
// 获取管理员数据
export const UserInfo = (params) => post(`sysUser/seeSysUser`, params)
// 登录
export const loginIn = (params) => post(`sysUser/login`, params)
// 注册
export const Register = (params) => post(`sysUser/register`, params)
// 修改管理员信息
export const editSysUser = (params) => post(`sysUser/editSysUser`, params)
// 修改密码
export const changePassword = (params) => post(`sysUser/changePassword`, params)

// ==========================================》老人api
// 录入信息
export const addOldPerson = (params) => post(`oldperson/addOldPerson`, params)
//查看老人信息
export const queryOldPerson = (params) => post(`oldperson/queryOldPerson`, params)