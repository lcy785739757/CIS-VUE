/* eslint-disable*/
import axios from 'axios'
import { get, post } from './http'

export const ComputerRtmp = 'rtmp://182.92.84.33:1935/stream/computer'
export const BaseRtmp ='rtmp://182.92.84.33:1935/stream/base'
export const RoomRtmp ='rtmp://182.92.84.33:1935/stream/room'
export const CorridorRtmp = 'rtmp://182.92.84.33:1935/stream/corridor'
export const DeskRtmp = 'rtmp://182.92.84.33:1935/stream/desk'
export const YardRtmp = 'rtmp://182.92.84.33:1935/stream/yard'
export const FireRtmp = 'rtmp://182.92.84.33:1935/stream/fire'

// export NNumber =''

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
//修改老人信息
export const editOldPerson = (params) => post(`oldperson/editOldPerson`, params)
//删除老人
export const removeOldPerson = (params) => post(`oldperson/removeOldPerson`, params)
//添加头像
export const addOldImg = (params) => post(`oldperson/addPhotoOP`, params)


// ==========================================》员工api
// 录入信息
export const addEmployee = (params) => post(`employee/addEmployee`, params)
// 查看工作人员信息
export const queryEmployee = (params) => post(`employee/queryEmployee`, params)
//修改员工信息
export const editEmployee = (params) => post(`employee/editEmployee`, params)
//删除员工
export const removeEmployee = (params) => post(`employee/removeEmployee`, params)
//添加头像
export const addEmployeeImg = (params) => post(`employee/addPhotoE`, params)
//员工请求采集
export const collectEmployee = (params) => post(`employee/runPython`, params)

// ==========================================》义工api
// 录入信息
export const addVolunteer = (params) => post(`volunteer/addVolunteer`, params)
// 查看义工信息
export const queryVolunteer = (params) => post(`volunteer/queryVolunteer`, params)
//修改义工信息
export const editVolunteer = (params) => post(`volunteer/editVolunteer`, params)
//删除义工
export const removeVolunteer = (params) => post(`volunteer/removeVolunteer`, params)
//添加义工头像
export const addVolunteerImg = (params) => post(`volunteer/addPhotoV`, params)
//义工请求采集
export const collectVolunteer = (params) => post(`volunteer/runPython`, params)

// ==========================================》数据统计api
//工作人员统计分析
export const Employ = (params) => post(`employee/statEmployee`, params)
//老人统计分析
export const OldPer = (params) => post(`oldperson/statOldPerson`, params)
//义工统计分析
export const Volunteer = (params) => post(`volunteer/statVolunteer`, params)


// ==========================================》脚本api
//人脸采集
export const runFaceCollectPython =  (params)  => post(`else/runFaceCollectPython`, params)
//人脸训练
export const runTrainingPython =  (params)  => post(`else/runTrainingPython`, params)

// ==========================================》事件api
// 查询所有事件
export const queryEvent =  (params)  => post(`eventInfo/queryEvent`, params)