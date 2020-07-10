<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >系统设置模块</el-breadcrumb-item>
      <el-breadcrumb-item >人脸识别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-container>
      <el-header style="height: 80px" >
        <el-card style="height: 80px">
          <el-row>
            <el-col :span="4">
              <el-button style="margin-top: -5px" type="primary" round @click="TrainFace">人脸识别</el-button>
            </el-col>
            <el-col :span="18">
              <el-progress :show-text="false" :stroke-width="26" :percentage=trainLength> </el-progress>
            </el-col>
          </el-row>
        </el-card>
      </el-header>
      <el-container>

        <el-main >
          <el-card style="background-color: #55a532;">

          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {initWebSocket} from "../../webSocket";
  import {runTrainingPython} from "../../api";

  export default {
    name: "FaceSetting",
    data(){
      return{
        trainLength: 0,
        UserID:'',
        collectTips:'',
      }
    },
    created() {
      this.trainLength=0
      this.getUserID()
      this.initWebSocket(this.$store.state.userId)

    },
    methods:{
      TrainFace(){
        this.$confirm('进行人脸过程中请勿离开此页面！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '开始训练!'
          });
          let that = this;
          let params= new FormData();
          params.append('userID',that.UserID);
          console.log('==========开始人脸训练==========')
          console.log(that.UserID)
          runTrainingPython(params)
            .then(res =>{

            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消训练'
          });
        });
      },
      //获取管理员ID
      getUserID(){
        this.UserID=this.$store.state.userId
        console.log(this.UserID+'aaaaaaaaaaaaaaaaa')
      },
      initWebSocket(userid){
        //初始化websocket
        console.log(userid+'index中userid')
        let wsUrl = "ws://localhost:10000/imserver/" + userid;
        this.Socket = new WebSocket(wsUrl);
        // this.websock = new WebSocket('ws://echo.websocket.org/echo');
        this.Socket.onmessage = this.websocketonmessage;
        this.Socket.onopen = this.websocketonopen ;
        this.Socket.onerror = this.websocketonerror;
        this.Socket.onclose = this.websocketclose;
      },

      websocketonopen (message ){ //连接建立之后执行send方法发送数据
        let actions = {"test":message};
        this.websocketsend(JSON.stringify(actions));
        console.log('ws连接状态：' + this.Socket.readyState);
      },

      websocketonerror(){//连接建立失败重连
        initWebSocket();
      },
      websocketonmessage (e){ //数据接收
        console.log("接收数据接收");
        console.log("接收："+e.data+'==============');
        // while
        if(e.data=='训练完成'){
          // this.collectTips='已训练9%'
          this.trainLength=100
          this.$message({
            title: "训练完成",
            message: "训练完成",
            type: 'success'
          });
        }else if(0<parseInt(e.data.slice(3,-1))&&parseInt(e.data.slice(3,-1))<100){
          this.collectTips=e.data
          this.trainLength=parseInt(e.data.slice(3,-1))
        }
      },
      websocketsend (Data){//数据发送
        this.Socket.send(Data);
      },

      websocketclose( e ){  //关闭
        console.log('断开连接',e);
      },
    }
  }
</script>

<style scoped>

</style>