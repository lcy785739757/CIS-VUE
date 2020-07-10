<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >摄像头管理</el-breadcrumb-item>
      <el-breadcrumb-item >实时事件通知</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="oldCard">
      <!--   搜索区域   -->
      <div style="margin-top: 15px; margin-right: 20px;margin-left: 20px">

        <el-row>
          <el-col :span="7">
            <el-input placeholder="请输入内容"  class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>

      <!--    用户列表区域    -->
      <el-table :data="EventList">
        <el-table-column label="ID"   prop="id"  align="center"></el-table-column>
        <el-table-column label="事件描述"   prop="event_desc"  align="center"></el-table-column>

        <el-table-column label="事件截图"   align="center" width="80px"  >
          <template slot-scope="scope">
<!--            <img :src=baseURL+scope.row.id+picName alt="头像" title="查看大图"  width="50px" style="margin: 0 0px 0px; cursor:pointer"-->
<!--                 @click="showHuge(scope.$index, scope.row)">-->
            <span title="查看大图" @click="showHuge(scope.$index, scope.row)" style="cursor:pointer">查看截图</span>
          </template>
        </el-table-column>
        <el-table-column label="事件类型"  prop="event_type"  align="center"></el-table-column>
        <el-table-column label="发生时间" prop="event_date"  align="center"></el-table-column>
        <el-table-column label="发生地点"  prop="event_location" align="center"></el-table-column>
        <el-table-column label="老人ID"  prop="oldperson_id" align="center"></el-table-column>

        <el-table-column label="操作"   align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-zoom-in"
              @click="getOldInfoAllDrawer(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-delete-solid"
              class="red"
              @click="DeleteOldInfo(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :visible.sync="TouDialogVisible"
      class="touDialog"
      title="时间截图"
      @close='closeDialog'
      :close-on-click-modal="false">
      <el-card
        class="touCard">
        <img :src="HugeURL" width="300px" style="margin: 0 0px 0px;" >
      </el-card>
    </el-dialog>

  </div>
</template>

<script>


  import {initWebSocket} from "../../webSocket";
  import {queryEmployee, queryEvent, queryOldPerson} from "../../api";

  export default {
    name: "Event",
    data(){
      return{
        TouDialogVisible:false,
        HugeURL:'',
        baseURL:'http://localhost:10000/supervision/',
        picName:'/snapshot.jpg',
        EventList:[
          {
            id:'',
            event_desc:"",
            event_type:'',
            event_date:"",
            event_location:"",
            oldperson_id:''
          }
        ],
        EventListChange:[
          {
            id:'',
            event_desc:"",
            event_type:'',
            event_date:"",
            event_location:"",
            oldperson_id:'',
            imgPath:'',

          }
        ],
        info:{
        },
      }
    },
    created() {
      this.getAllEvent()
      this.initWebSocket(this.$store.state.userId+'-实时报表')
    },
    methods:{
      //查询事件
      getAllEvent(){
        let that = this;
        let params = JSON.stringify(that.info);
        queryEvent(params)
          .then(res =>{
            console.log('-----------获取信息---------------')
            console.log( res)
            if (res.code == 1) {

              console.log('-----------EventList---------------')
              that.EventList=res.data;
              console.log(that.EventList);
              that.ChangeData()
              console.log('-----------EventList---------------')
            }else {
              _this.notify('错误', 'error')
            }
          }).catch(failResponse => {})

      },

      //转换
      ChangeData(){

        let i=0;

        for (i;i<this.EventList.length;i++) {
          console.log(i + '<<==================i===========')
          if(this.EventList[i].event_type==0){

            this.EventList[i].event_type='出现陌生人'
            // this.EventList[i].imgPath='http://localhost:10000/supervision/strangers/'+this.EventListChange[i].id+'/snapshot.jpg'
          }else if(this.EventList[i].event_type==1){
            console.log("进行到这一步了么")
            this.EventList[i].event_type='老人笑了'
            console.log(this.EventList[i])
          }else if(this.EventList[i].event_type==2){
            console.log("进行到这一步了么")
            this.EventList[i].event_type='有人摔倒'
            console.log(this.EventList[i])
          }else if(this.EventList[i].event_type==3){
            console.log("进行到这一步了么")
            this.EventList[i].event_type='禁止区域入侵'
            console.log(this.EventList[i])
          }else if(this.EventList[i].event_type==4){
            console.log("进行到这一步了么")
            this.EventList[i].event_type='义工互动'
            console.log(this.EventList[i])
          }

        }

      },
      //查看大图
      showHuge(index,row){
        this.TouDialogVisible=true;
        this.idx=index;
        // this.HugeURL=row.imgPath
        if(row.event_type=='老人笑了'){
          console.log(row.event_type)
          this.HugeURL=this.baseURL+'smile/'+row.id+this.picName
        }else if(row.event_type=='有人摔倒'){
          console.log(row.event_type)
          this.HugeURL=this.baseURL+'fall/'+row.id+this.picName
        }else if(row.event_type=='禁止区域入侵'){
          console.log(row.event_type)
          this.HugeURL=this.baseURL+'fence/'+row.id+this.picName
        }else if(row.event_type=='义工互动'){
          console.log(row.event_type)
          this.HugeURL=this.baseURL+'activity/'+row.id+this.picName
        }else if(row.event_type=='出现陌生人'){
          console.log(row.event_type)
          this.HugeURL=this.baseURL+'strangers/'+row.id+this.picName
        }
        console.log(this.HugeURL)
      },
      // 关闭大图
      closeDialog() {
        this.TouDialogVisible=false
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
        console.log('事件监听界面ws连接状态：' + this.Socket.readyState);
      },

      websocketonerror(){//连接建立失败重连
        initWebSocket();
      },
      websocketonmessage (e){ //数据接收
        console.log("事件监听界面接收数据接收");
        console.log("事件监听界面接收："+e.data+'==============');
        if(e.data=='事件更新'){
          console.log("监听界面接收消息")
          this.getAllEvent()
        }

      },
      websocketsend (Data){//数据发送
        this.Socket.send(Data);
      },

      websocketclose( e ){  //关闭
        console.log('事件监听界面ws断开连接',e);
      },
    }
  }
</script>

<style scoped>
  .touDialog{
    width: 50%;
  }
</style>