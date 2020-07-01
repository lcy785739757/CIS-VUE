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
            <el-button  type="info" round>
              {{admin_Name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item @click.native="ChaneInfo()">个人资料</el-dropdown-item>
          <el-dropdown-item >
            消息
            <el-badge class="mark" :value="12" />
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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

  export default {
    name: "Main",
    data(){
      return{
        admin_Name:'',
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

        //是否折叠
        isCollapsed:false,
      }
    },
    created() {
      this.getName()
    },
    methods:{
      logout(){
        Cookies.set('admin_name','',0)
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
        this.admin_Name=Cookies.get('User_name')
      },
      //修改资料
      ChaneInfo(){

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


</style>