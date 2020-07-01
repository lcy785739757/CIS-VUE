<template>
  <div id="Login" class="login_container">
    <img src="../assets/images/login_background.jpg" alt="" class="ima">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/images/1.png" alt="">
      </div>
      <h3 class="login-title" >智慧养老系统</h3>
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="UserName">
          <el-input v-model="loginForm.UserName" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="Password">
          <el-input v-model="loginForm.Password" prefix-icon="el-icon-price-tag" type="password" placeholder="请输入密码"></el-input>
         </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
          <el-button type="warning" @click="registerDialog = true">注册</el-button>
        </el-form-item>
        
      </el-form>
    </div>

    <el-drawer
      :visible.sync="registerDialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-card class="RegisterCard" >
          <h3 class="register-title" >注册账号</h3>
          <el-form :model="RegisterForm" ref="RegisterForm" :rules="RegisterRules" label-width="100px">
            <el-form-item label="用户名" prop="UserName" >
              <el-input v-model="RegisterForm.UserName" autocomplete="off" placeholder="长度在3-10个字符之间"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="SEX">
              <el-radio v-model="RegisterForm.SEX" label="M">男</el-radio>
              <el-radio v-model="RegisterForm.SEX" label="F">女</el-radio>
            </el-form-item>
            <el-form-item label="真实姓名" prop="REAL_NAME" >
              <el-input v-model="RegisterForm.REAL_NAME" autocomplete="off" placeholder="长度在2-4个字符之间"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="EMAIL" >
              <el-input v-model="RegisterForm.EMAIL" autocomplete="off" placeholder="xxx@zzz.com"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="PHONE" >
              <el-input v-model="RegisterForm.PHONE" autocomplete="off" placeholder="家用电话"></el-input>
            </el-form-item>
            <el-form-item label="移动电话" prop="MOBILE" >
              <el-input v-model="RegisterForm.MOBILE" autocomplete="off" placeholder="11位移动电话号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Password" >
              <el-input v-model="RegisterForm.Password" autocomplete="off" type="password" placeholder="长度在3-10个字符之间"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-row>
              <el-col :span="16">
                <el-button type="danger" @click="cancelRegForm" style="margin-left: 100px">取 消</el-button>
              </el-col >
              <el-col :span="6">
                <el-button type="primary" @click="RegisterButton('RegisterForm')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              </el-col >
            </el-row>
            </div>
        </el-card>
      </div>
    </el-drawer>
  </div>


</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  import {loginIn, Register} from "../api";
  export default {
    name: "Login",
    data() {
      return{
        table: false,
        registerDialog: false,
        loading: false,
        formLabelWidth: '80px',
        timer: null,
        UserName:'',
        RegisterForm:{
          UserName:'',
          REAL_NAME:'',
          SEX:'',
          EMAIL:'',
          PHONE:'',
          MOBILE:'',
          Password:'',
        },
        loginForm:{
        //  这是登录界面
          UserName:'aaa',
          Password:'123456',
        },
        rules:{
          UserName:[
            {required:true,message:'请输入正确格式',trigger:'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          Password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ]
        },
        RegisterRules:{

          UserName:[
            {required:true,message:'请输入正确格式',trigger:'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个汉字', trigger: 'blur' }
          ],
          REAL_NAME:[
            {required:true,message:'请输入真实姓名',trigger:'blur'},
            { min: 2, max: 5, message: '长度在 2 到 5 个汉字', trigger: 'blur' }
          ],
          SEX:[
            {required:true,message:'请选择性别',trigger:'blur'},
          ],
          EMAIL:[
            {required:true,message:'请输入电子邮箱',trigger:'blur'},
            { min: 5, max: 25, message: '长度在 5 到 25 个字符之间', trigger: 'blur' }
          ],
          PHONE:[
            {required:true,message:'请输入电话号码',trigger:'blur'},
            { min: 5, max: 8, message: '长度在 5 到 8 个字符之间', trigger: 'blur' }
          ],
          MOBILE:[
            {required:true,message:'请输入移动电话号码',trigger:'blur'},
            { min: 11, max: 11, message: '11位电话号码', trigger: 'blur' }
          ],
          Password:[
            {required:true,message:'请输入密码',trigger:'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      ...mapMutations(['setToken']),
      onSubmit(formName){
        //为表单绑定验证功能
        let that = this;
        console.log(that.loginForm);
        console.log("------");
        that.$refs[formName].validate((valid) => {
          if(valid) {
            console.log(that.loginForm);
            let params = JSON.stringify(that.loginForm);
            loginIn(params).then(res => {
              console.log('-----------获取登录信息---------------')
              if (res.code == 1) {
                console.log('=====================');
                console.log(res.data[0]);
                // that.UserName=res.data.data[0]
                this.$store.commit('setUserId', res.data[0])
                console.log('=====================');
                console.log(res.data.msg);
                this.$store.commit('setUsername', res.msg)
                console.log("$store完成设置");
                that.$message({
                  title: "登陆成功",
                  message: "登陆成功",
                  type: 'success'
                });
                that.$router.push("/main");
              } else {
                that.$message({
                  title: "登陆失败",
                  message: "请输入正确的用户名或密码",
                  type: "error"
                });
              }
            })
              .catch(failResponse => {
              })
          }else{
                that.$message({
                  message: '用户名或密码格式错误',
                  type: 'error'
                });
                return false;
              }
          // if(valid){
          //   that
          //     .$axios({
          //         //请求方式
          //         method: "post",
          //         //请求路劲
          //         url: "/api/sysUser/login",
          //         //请求参数
          //         data: params
          //         //请求成功的回调函数
          //       },
          //       {
          //         emulateJSON: true
          //       }
          //     )
          //     .then(function(res) {
          //       console.log("请求已经成功");
          //       // console.log(res.data.data[0]);
          //
          //       if (res.data.code == "1") {
          //
          //         console.log("进入if");
          //         Cookies.set('User_name', res.data.msg, 3600);
          //         Cookies.set('User_id', res.data.data[0], 3600);
          //         console.log("cookie完成设置");
          //
          //         that.$message({
          //           title: "登陆成功",
          //           message: "登陆成功",
          //           type: 'success'
          //         });
          //         that.$router.push("/main");
          //         console.log(res);
          //       }else{
          //           that.$message({
          //             title: "登陆失败",
          //             message: "请输入正确的用户名或密码",
          //             type: "error"
          //           });
          //         }
          //       }).catch(function() {
          //         that.$notify({
          //           title: "登陆失败",
          //           message: "服务器异常",
          //           type: "error"
          //      });
          //       console.log("服务呵呵呵");
          //     });
          //
          //
          // }else{
          //   that.$message({
          //     message: '用户名或密码格式错误',
          //     type: 'error'
          //   });
          //   return false;
          // }
        });

      },

      // 注册
      RegisterButton(formName) {

              let that = this;
              that.$refs[formName].validate((valid) => {
                console.log(that.RegisterForm);
                //-----------------------------------------------------------------
                let params = JSON.stringify(that.RegisterForm);
                if(valid){
                  Register(params).then(res => {
                    console.log('-----------获取登录信息---------------')
                    if (res.code == 1) {
                      console.log('=====================');
                      console.log("$store完成设置");
                      that.$message({
                        title: "注册成功",
                        message: "注册成功",
                        type: 'success'
                      });
                      that.$router.push("/app_login");
                    } else {
                      that.$message({
                        title: "注册失败",
                        message: "用户名重复",
                        type: "error"
                      });
                    }
                  })
                    .catch(failResponse => {})

                  // that
                  //   .$axios({
                  //       //请求方式
                  //       method: "post",
                  //       //请求路劲
                  //       url: "/api/sysUser/register",
                  //       //请求参数
                  //       data: params
                  //       //请求成功的回调函数
                  //     },
                  //     {
                  //       emulateJSON: true
                  //     }
                  //   )
                  //   .then(function(res) {
                  //     console.log("请求已经成功");
                  //     console.log(res.data.code);
                  //
                  //     if (res.data.code == "1") {
                  //       Cookies.set('User_name', res.data.msg, 3600)
                  //       console.log("cookie完成设置");
                  //
                  //       that.$message({
                  //         title: "注册成功",
                  //         message: "注册成功",
                  //         type: 'success'
                  //       });
                  //       that.$router.push("/app_login");
                  //       console.log(res);
                  //     }else{
                  //       that.$message({
                  //         title: "注册失败",
                  //         message: "请填写正确信息",
                  //         type: "error"
                  //       });
                  //     }
                  //   }).catch(function() {
                  //   that.$notify({
                  //     title: "注册失败",
                  //     message: "服务器异常",
                  //     type: "error"
                  //   });
                  //   console.log("服务呵呵呵");
                  // });
                }else{
                  that.$message({
                    message: '输入正确格式',
                    type: 'error'
                  });
                  return false;
                }
              });
      },
      // 关闭注册
      cancelRegForm() {
        this.loading = false;
        this.registerDialog = false;
        clearTimeout(this.timer);
      }
    }
  }
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .avatar_box{
    height: 100px;
    width: 100px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eeeeee;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login-title{
  text-align: center;
  margin: 70px auto 40px auto;
  color: #303133;
  font-family: 幼圆;
  font-size: 30px;
}
.register-title{
  text-align: center;
  margin: 30px auto 30px auto;
  color: #303133;
  font-family: 幼圆;
  font-size: 30px;
}
.ima{
  margin: 0px auto 0px auto;
  width: 100%;
  height: 100%;
}
.RegisterCard{
  font-weight: bold;
  font-family: 幼圆;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 50px;
  /*padding: 0px;*/
}

</style>