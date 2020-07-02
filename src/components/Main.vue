<template>

  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <span>智慧养老系统</span>
      </div>
<!--      <el-button type="info" @click="logout">退出</el-button>-->
      <el-dropdown trigger="click">
          <span class="el-dropdown-link" >
            <el-button type="primary"  round >
              {{admin_Name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
        <el-dropdown-menu slot="dropdown" style="width: 150px">
          <el-dropdown-item >
            <el-button @click="InfoDrawer = true" round style="width: 110px;border: none" >查看个人资料
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item >
            <el-button @click="PassDrawer = true" style="width: 110px; border: none" >
              修改密码
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item >
            <el-button @click="logout()" style="width: 110px; border: none">
              退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-drawer
        :visible.sync="InfoDrawer"
        :with-header="false">
        <div class="demo-drawer__content">
<!--          <el-card class="InfoCard" @close="isEdit = false" :close-on-click-modal='false' >-->
<!--            <h3 class="register-title" style="margin-left: 140px;margin-top: 10px">查看信息</h3>-->
<!--              <el-form :model="UserInfo" ref="UserInfo" :rules="UserInfo" label-width="100px">-->
<!--                <el-form-item label="用户名" prop="UserName" >-->
<!--                  <el-input v-model="UserInfo.userName" autocomplete="off" placeholder=UserInfo.userName></el-input>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--          </el-card>-->
          <el-card width="920px" @close="isEdit = false" class="dialog dialogAdd" custom-class="custom-dialog"
                     :close-on-click-modal='false'>
            <h3 class="register-title" style="margin-left: 140px;margin-top: 10px">管理员信息</h3>
              <el-form ref="EditInfo" :model="EditInfo" style="margin-right: 20px;"   label-position="right" label-width="110px" >
                <el-form-item label="用户ID" >
                  <el-input v-model="EditInfo.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" >
                  <el-input v-model="EditInfo.UserName" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" >
                  <el-input v-model="EditInfo.real_NAME" :disabled="!isEdit" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input v-model="EditInfo.SEX" disabled></el-input>
                </el-form-item>
                <el-form-item label="电话" >
                  <el-input v-model="EditInfo.PHONE" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="移动电话" >
                  <el-input v-model="EditInfo.MOBILE" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" >
                  <el-input v-model="EditInfo.EMAIL" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button v-if="!isEdit" @click="isEdit = true" style="width: 100px">编 辑</el-button>
                  <el-button v-else @click="cancelEdit"  style="width: 100px">取消编辑</el-button>
                  <el-button type="primary" v-on:click="SaveEdit('EditInfo')" style="width: 100px">保 存</el-button>
                </el-form-item>
              </el-form>
          </el-card>
        </div>
      </el-drawer>

      <el-drawer
        :visible.sync="PassDrawer"
        :with-header="false">
        <span>PassDrawer!</span>
        <div class="demo-drawer__content">

        </div>
      </el-drawer>

    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapsed?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          default-active="/queryOddPerson"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapsed"
          :collapse-transition="false"
          :router="true"
          @open="handleOpen"
          @close="handleClose"
          >
          <!-- 一级菜单 -->
          <el-submenu :index="item.authName+''" v-for="item in menuList" :key="item.authName">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>
                {{item.authName}}
              </span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.path+''" v-for="subItem in item.children" :key="subItem.authName" >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧主体-->
      <el-main>
        <!-- 路由占位符 -->
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>



</template>


<script >
  import Cookies from "js-cookie";
  import {editSysUser, UserInfo} from "../api";

  export default {
    name: "Main",
    data(){
      return{
        isEdit: false,   // 是否编辑
        InfoDrawer: false,
        PassDrawer: false,
        admin_Name:'',
        admin:{
          UserName:'',
        },
        menuList: [
          {
            id:'01',
            authName:'系统设置模块',
            path:'management',
            children:[
              {id: 'project_browse', authName: '选择项目', path: 'project_browse',},
              {id: 'project_my_apply', authName: '我的加入', path: 'project_my_apply',}
            ]
          },
          {
            id:'02',
            authName:'老年人信息管理',
            path:'/OldPerMan',
            children:[
              {id:'addOldPerson', authName:'录入信息', path:'addOldPerson',},
              {id:'queryOddPerson', authName:'老人列表', path:'queryOddPerson',},
            ]
          },
          {
            id:'03',
            authName:'工作人员信息管理',
            path:'blink',
            children:[
              {id:'release', authName:'发布', path:'release',},
              {id: 'browse', authName: '浏览', path: 'browse',},
              {id: 'my_release', authName: '我的发布', path: 'my_release',},
              {id: 'my_apply', authName: '我的加入', path: 'my_apply',}
            ]
          },
          {
            id:'04',
            authName:'义工信息管理',
            path:'blink',
            children:[
              {id:'quit', authName:'退出系统', path:'app_login',},
              {id: 'wel', authName: '主页系统', path: 'wel',}
            ]
          },
          {
            id:'05',
            authName:'数据管理',
            path:'blink',
            children:[
              {id:'quit', authName:'退出系统', path:'app_login',},
              {id: 'wel', authName: '主页系统', path: 'wel',}
            ]
          },
          {
            id:'06',
            authName:'摄像头管理',
            path:'blink',
            children:[
              {id:'quit', authName:'退出系统', path:'app_login',},
              {id: 'wel', authName: '主页系统', path: 'wel',}
            ]
          }
        ],
        iconsObj:{
          '01':'el-icon-s-tools',
          '02':'el-icon-user-solid',
          '03':'el-icon-service',
          '04':'el-icon-user',
          '05':'el-icon-folder-opened',
          '06':'el-icon-bangzhu',
        },
        path:'',
        EditInfo:{
          UserName:'',
          SEX:'',
          EMAIL:'',
          PHONE:'',
          MOBILE:'',
          real_NAME:'',
          id: '',
        },
        EditedInfo:{
          UserName:'',
          NewUserName:'',
          SEX:'',
          EMAIL:'',
          PHONE:'',
          MOBILE:'',
          real_NAME:'',
        },
        UserInfo:{
          CREATED: "2019-12-31 16:00:00",
          UPDATED: "2019-12-31 16:00:00",
          theme: "11",
          defaultpage: "",
          logoimage: null,
          qqopenid: null,
          appversion: null,
          jsonauth: null,
          id: 1,
          createby: 11,
          created: "2019-12-31T16:00:00.000+00:00",
          description: "111",
          isactive: "1",
          real_NAME: "啊啊",
          mobile: "111111111",
          email: "11@qq.com",
          phone: "11111111",
          userName: "aaa",
          sex: "man",
          password: "E10ADC3949BA59ABBE56E057F20F883E",
          org_ID: 1,
          remove: "1",
          updateby: 11,
          client_ID: 1,
          updated: "2019-12-31T16:00:00.000+00:00",
          datafilter: "11"
        },

        //是否折叠
        isCollapsed:false,
      }
    },
    created() {
      this.getName();
      this.getInfo();
    },
    mounted() {
      // this.getInfo();
      // this.getEditInfoFromInfo();
    }
    ,
    methods:{
      logout(){
        // Cookies.set('admin_name','',0)
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        this.$router.push("/app_login");
      },
      //点击按钮切换菜单折叠与展开
      toggleCollapse(){
        this.isCollapsed=!this.isCollapsed;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //获得管理员名字
      getName(){
        this.admin_Name=this.$store.state.username;
        this.admin.UserName=this.$store.state.username;
      },
      //获得管理员资料
      getInfo(){
        let that = this;
        // let params = new URLSearchParams()
        console.log('-----------获取信息---------------')
        // params.append('UserName', this.admin.admin_Name)
        console.log(that.admin)
        let params = JSON.stringify(that.admin);
        console.log('-----------完成传参---------------')

        UserInfo(params)
          .then(res =>{
            console.log('-----------获取信息---------------')
            if (res.code == 1) {

              console.log('-----------UserInfo---------------')
              that.UserInfo=res.data[0]
              console.log( that.UserInfo)
              console.log('-----------UserInfo---------------')
              this.getEditInfoFromInfo();
            }else {
              _this.notify('错误', 'error')
            }
        }).catch(failResponse => {})

      },
      //查看修改资料
      viewInfo(){
        this.drawer=true;
      },
      //修改密码
      ChangePass(){

      },
      // 保存编辑
      SaveEdit(formName){
        let that = this;

        that.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("=======================保存编辑==================");
            console.log("=======================EditInfo==================");
            console.log(that.EditInfo);
            console.log("=======================EditInfo==================");
            this.getEditInfoFromInfo2();
            let params = JSON.stringify(that.EditedInfo);
            editSysUser(params)
              .then(res =>{
                if (res.code == 1) {
                  that.$message({
                    title: "修改成功",
                    message: "修改成功",
                    type: 'success'
                  });
                }else {
                  that.$message({
                    title: "修改失败",
                    message: "修改失败",
                    type: 'warning'
                  });
                }
              }).catch(function() {
                that.$notify({
                  title: "注册失败",
                  message: "服务器异常",
                  type: "error"
                });
              console.log("服务呵呵呵");
              });
          }else{
            that.$message({
              message: '输入正确格式',
              type: 'error'
            });
          }
        })
      },
      // 取消编辑
      cancelEdit(){
        this.isEdit = false
        // this.editForm = this.deepClone(this.currentItem)
      },
      // 将数据转换1
      getEditInfoFromInfo(){

        console.log(this.UserInfo.id);
        this.EditInfo.id=this.UserInfo.id;
        this.EditInfo.UserName=this.UserInfo.userName;
        this.EditInfo.SEX=this.UserInfo.sex;
        this.EditInfo.EMAIL=this.UserInfo.email;
        this.EditInfo.PHONE=this.UserInfo.phone;
        this.EditInfo.MOBILE=this.UserInfo.mobile;
        this.EditInfo.real_NAME=this.UserInfo.real_NAME;
        this.EditedInfo.UserName=this.EditInfo.UserName;
        this.EditedInfo.SEX=this.EditInfo.SEX;
        console.log("=======================EditInfo==================");
        console.log(this.EditInfo);
        console.log(this.EditedInfo);
        console.log("=======================EditInfo==================");
      },
      //数据转换2
      getEditInfoFromInfo2(){
        this.EditedInfo.NewUserName=this.EditInfo.UserName;
        this.EditedInfo.real_NAME=this.EditInfo.real_NAME;
        this.EditedInfo.MOBILE=this.EditInfo.MOBILE;
        this.EditedInfo.PHONE=this.EditInfo.PHONE;
        this.EditedInfo.EMAIL=this.EditInfo.EMAIL;
        console.log("=======================EditedInfo==================++++++++++");
        console.log(this.EditedInfo);
        console.log("=======================EditedInfo==================++++++++");
      },

    },
    computed:{
      activeIndex(){
        const { name } = this.$route;
        switch (name) {

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    color: #eeeeee;
    font-size: 30px;
    >div{
      display: flex;
      align-items: center;
      span{}
      margin-left: 30px;
    }
    font-family: 幼圆;
  }
  .el-aside{
    background-color: #333744;
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    background-color: #eaedf1;
  }
  .iconfont{
    margin-right: 10px;
  }
  .toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #eeeeee;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .InfoCard{
    font-weight: bold;
    font-family: 幼圆;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 50px;
    margin-top: 50px;
    /*padding: 0px;*/
  }

</style>