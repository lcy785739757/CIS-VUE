<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >义工信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >义工列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="volunteerCard">
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
      <el-table :data="AllVolunteerList">
        <el-table-column label="姓名" prop="name"  align="center"></el-table-column>
        <el-table-column label="头像" prop="imgset_dir"  align="center" >
          <template slot-scope="scope">
            <img :src=baseURL+scope.row.imgset_dir
                 alt="头像"
                 title="查看大图"
                 width="50px"
                 style="margin: 0 0px 0px; cursor:pointer"
                 @click="showHuge(scope.$index, scope.row)">
          </template>
        </el-table-column>
        <el-table-column label="姓别" prop="gender"  align="center"></el-table-column>
        <el-table-column label="电话" prop="phone"  align="center"></el-table-column>
        <el-table-column label="身份证号" prop="id_card" align="center"></el-table-column>
        <el-table-column label="入职日期" prop="checkin_date"  align="center"></el-table-column>
        <el-table-column label="人脸采集" prop="isactive"  align="center">
          <template slot-scope="scope">
            <el-button
              v v-if="scope.row.isactive=='0'"
              size="mini"
              type="primary"
              @click="getFaceInfo(scope.$index, scope.row)"
              style="width: 80px"
            >点击采集</el-button>

            <el-button
              v-else
              size="mini"
              type="primary"
              disabled
              style="width: 80px"
            >已采集</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作"   align="center">

          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-zoom-in"
              @click="getVolunteerInfoAllDrawer(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-delete-solid"
              class="red"
              @click="DeleteVolunteerInfo(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <body>
    <el-drawer
      title=""
      direction="ttb"
      :visible.sync="VolunteerInfoAllDrawer"
      :with-header="false"
      class="DrawerClass"
      size="80%">
      <!--      :with-header="true"-->
      <div class="demo-drawer__content">
        <el-card @close="isEdit = false" class="InfoCard" custom-class="custom-dialog"
                 :close-on-click-modal='false'>
          <h3 class="register-title" style="margin-left:280px;margin-top: 10px;font-size: 30px">义工信息管理</h3>
          <el-form ref="form" :rules="rulesForm" :model="form" label-width="90px" >
            <el-container>
              <el-main>
                <el-row>
                  <el-col :span="8" style="margin-left: -20px">
                    <el-form-item label="ID" prop="id">
                      <el-input style="width: 200px" v-model="form.id" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="1" style="margin-left: -20px">
                    <el-form-item label="姓名" prop="name">
                      <el-input style="width: 200px" v-model="form.name" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" style="margin-left: -20px">
                    <el-form-item label="性别" prop="gender" >
                      <el-input style="width: 200px" v-model="form.gender" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-main>
              <el-aside>

              </el-aside>
            </el-container>
            <el-row>
              <el-col :span="12">
                <el-form-item label="电话号码" prop="phone">
                  <el-input style="width: 200px" v-model="form.phone" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号" prop="id_card" >
                  <el-input style="width: 200px" v-model="form.id_card" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday" >
                  <div class="block" >
                    <span class="demonstration" ></span>
                    <el-date-picker
                      v-model="form.birthday"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px"
                      :disabled="!isEdit">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="入职日期" prop="checkin_date" >
                  <div class="block" style="width: 200px">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="form.checkin_date"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px"
                      disabled>
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注" prop="DESCRIPTION" >
                  <el-input style="width: 560px" v-model="form.description" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="5">
                <el-form-item>
                  <el-button v-if="!isEdit" @click="isEdit = true" style="width: 100px; margin-left: 300px" >编 辑</el-button>
                  <el-button v-else @click="cancelEdit"  style="width: 100px; margin-left: 300px">取消编辑</el-button>

                </el-form-item>
              </el-col>


              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" v-on:click="SaveVolunteerEdit('form')" style="width: 100px; margin-left: 300px" >保 存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </el-drawer>

    <el-dialog
      :destroyOnClose="true"
      :visible.sync="FaceDialog"
      class="faceDialog"
      title="人脸数据采集"   >
      <el-card
        class="faceCard">

        <el-form ref="FaceInfo" :model="FaceInfo" label-width="90px" >
          <el-container>
            <el-header style="margin-top: -10px">
              <el-row>
                <el-col :span="4">
                  <el-form-item label="义工ID：" prop="id" style="margin-left: -20px; margin-top: 10px">
                    <label >
                      {{FaceInfo.id}}
                    </label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="义工姓名：" prop="username" style="margin-left: 80px;  margin-top: 10px">
                    <label>
                      {{FaceInfo.username}}
                    </label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-header>
            <el-main style="">
              <el-container style="height: 324px" >
                <el-aside style=" width: 200px ">
<!--                  <el-progress :show-text="false" :stroke-width="15" :percentage=collectLength style="margin-top: 0px;width: 200px"></el-progress>-->
                  <el-progress v-if="collectLength!=100" :show-text="false" type="circle" :percentage=collectLength :width=80 status="success"></el-progress>
                  <el-progress v-else type="circle" :percentage=collectLength :width=80 status="success"></el-progress>
                  <h2 style="margin-left:37%">提示:</h2>
                  <h2 style="margin-left:25%; margin-top: 50%">{{collectTips}}</h2>
                </el-aside>
                <el-main style="" >
<!--                  <iframe :src="vedioURL" width="325px" height="250px" frameborder="0" id="mobsf" scrolling="no" style="margin-left: 30px"></iframe>-->
                  <video-player
                    width="500px" height="500px"
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"

                  ></video-player>
                </el-main>
                <!--                <el-aside style=" width: 20px;background-color: #303133">-->

                <!--                </el-aside>-->
              </el-container>
            </el-main>
            <el-footer style="height: 60px">
              <el-row>

                <el-form-item>
                  <el-button type="danger" v-on:click="CancelFaceDialog()" style="width: 100px; margin-top: 0px ;margin-left: 110px"  >退出</el-button>
                  <el-button type="primary" v-on:click="StartCollect()" :disabled="IfCollect" style="width: 100px; margin-top: 0px;margin-left: 20px" >开始采集</el-button>
                </el-form-item>
              </el-row>
            </el-footer>
          </el-container>
        </el-form>
      </el-card>
    </el-dialog>

    <el-dialog
      :visible.sync="TouDialogVisible"
      class="touDialog"
      title="头像大图"
      @close='closeDialog'
      :close-on-click-modal="false">
      <el-card
        class="touCard">
        <img :src="HugeURL" width="300px" style="margin: 0 0px 0px;" >
      </el-card>
    </el-dialog>

    </body>


  </div>
</template>

<script>
  import {
    editVolunteer,
    queryVolunteer,
    removeVolunteer,
    runFaceCollectPython
  } from "../../api";
  import {initWebSocket} from "../../webSocket";

  export default {
    name: "queryVolunteer",

    data(){
      return{
        playerOptions:{
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "rtmp://182.92.84.33:1935/stream/pupils_trace" //url地址
          }],
          // hls:true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
          techOrder: ['flash'], //播放rtmp必须加
          poster: "http://localhost:10000/images/oldPerson/1003/1003.jpg", //你的封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
        collectLength:0,
        Socket:'',
        vedioURL:'http://127.0.0.1:5001/',
        baseURL:'http://localhost:10000/',
        TouDialogVisible:false,
        HugeURL:'',
        isEdit: false,   // 是否编辑
        VolunteerInfoAllDrawer: false,
        direction: 'ttb',
        // 获取用户列表参数对象
        info:{
        },
        queryInfo:{
          query:'',
          pageNum:1,
          pageSize:2
        },
        AllVolunteerList:[
          {
            id:  "",
            name: "",
            gender:  "",
            phone: "",
            id_card: "",
            birthday: "",
            checkin_date: "",
            resign_date:  "",
            imgset_dir:  "",
            profile_photo:  "",
            CREATED: "",
            UPDATED:  "",
            createby:  "",
            remove: "",
            isactive: "",
            description: "",
            updateby:  "",
            updated:  "",
            created: "",
            org_ID:  "",
            client_ID:  ""
          }
        ],
        rulesForm: {

          phone: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur'}
          ],

          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          checkin_date: [
            {required: true, message: '请选择入职日期', trigger: 'blur'},
          ],

          description: [
            {required: true, message: '请输入老人描述', trigger: 'blur'},
            {min: 2, max: 100, message: '100个字符以内', trigger: 'blur'}
          ],



          health_state: [
            {required: true, message: '请输入项健康状态', trigger: 'blur'}
          ],
        },
        IfCollect:false,
        FaceInfo: {},
        //采集人脸用到的ID
        FaceInfoId: {
          ID:"",
          userID:''
        },
        FaceDialog:false,
        collectTips:'等待开始',
        form: {},
        EditedVolunteerInfo:{
          id:"",
          gender:"",
          phone:"",
          id_card:"",
          birthday:"",
          checkin_date:"",
          DESCRIPTION:"",
          ISACTIVE:"不知道",
          UPDATEBY:""
        },
        idx: -1,
        total:0,
        DeleteVolunteerId:{
          id: ''
        },
      }
    },
    computed:{
      player(){
        return this.$refs.videoPlayer.player
      }
    },
    created() {
      this.getVolunteer()
      this.initWebSocket(this.$store.state.userId)
    },
    mounted() {
      this.ChangeDate()
    },
    methods:{
      // 获得工作人员资料
      getVolunteer(){
        let that = this;
        let params = JSON.stringify(that.info);
        queryVolunteer(params)
          .then(res =>{
            console.log('-----------获取信息---------------')
            console.log( res)
            if (res.code == 1) {

              console.log('-----------VolunteerInfo---------------')
              that.AllVolunteerList=res.data;
              console.log(that.AllVolunteerList);
              console.log('-----------VolunteersonInfo---------------')
            }else {
              _this.notify('错误', 'error')
            }
          }).catch(failResponse => {})
      },
      //获得工作人员所有信息
      getVolunteerInfoAllDrawer(index,row){
        this.VolunteerInfoAllDrawer=true;
        this.idx = index;
        this.form = row;
        console.log(this.form);
      },
      //取消编辑
      cancelEdit(){
        this.isEdit = false
        // this.editForm = this.deepClone(this.currentItem)
      },
      // 保存编辑
      SaveVolunteerEdit(formName){
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.getID();
            that.getEditInfoFromInfo();
            that.ChangeDate();
            let params = JSON.stringify(that.EditedVolunteerInfo);

            console.log(params)
            console.log("++++++++++++++++++++保存操作++++++++++++++++++++")
            editVolunteer(params)
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
                title: "修改失败",
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
      //删除操作
      DeleteVolunteerInfo(index,row){
        console.log("===============删除操作==================")
        this.idx = index;
        this.form = row;
        this.DeleteVolunteerId.id=this.form.id;
        console.log(this.DeleteVolunteerId.id);
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            let that = this;
            let params = JSON.stringify(that.DeleteVolunteerId);
            removeVolunteer(params)
              .then(res =>{
                if (res.code == 1) {
                  that.$message({
                    title: "删除成功",
                    message: "删除成功",
                    type: 'success'
                  });
                }else {
                  that.$message({
                    title: "删除成功",
                    message: "删除成功",
                    type: 'warning'
                  });
                }
              }).catch(function() {
              that.$notify({
                title: "删除失败",
                message: "服务器异常",
                type: "error"
              });
              console.log("服务呵呵呵");
            });
            this.AllVolunteerList.splice(index, 1);
          })
          .catch(() => {});
      },

      //数据转换
      getEditInfoFromInfo(){
        this.EditedVolunteerInfo.id=this.form.id;
        this.EditedVolunteerInfo.gender=this.form.gender;
        this.EditedVolunteerInfo.phone=this.form.phone;
        this.EditedVolunteerInfo.id_card=this.form.id_card;
        this.EditedVolunteerInfo.birthday=this.form.birthday;
        this.EditedVolunteerInfo.checkin_date=this.form.checkin_date;
        this.EditedVolunteerInfo.DESCRIPTION=this.form.description;

        console.log(this.EditedVolunteerInfo.id)
        console.log("++++++++++++++++转换完成++++++++++++++++")
        this.ChangeDate()

      },
      //获得管理员ID
      getID(){
        this.EditedVolunteerInfo.UPDATEBY=this.$store.state.userId;
        console.log(this.EditedVolunteerInfo.UPDATEBY);
      },
      // 改变日期格式
      ChangeDate(){
        if(this.EditedVolunteerInfo.birthday!=''){
          let delayTime = new Date(this.EditedVolunteerInfo.birthday).toJSON();
          this.EditedVolunteerInfo.birthday = new Date(
            +new Date(delayTime) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.EditedVolunteerInfo.birthday);
        }
        if(this.EditedVolunteerInfo.checkin_date!=''){
          //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
          let delayTime1 = new Date(this.EditedVolunteerInfo.checkin_date).toJSON();
          this.EditedVolunteerInfo.checkin_date = new Date(
            +new Date(delayTime1) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.EditedVolunteerInfo.checkin_date);
        }
        console.log("----");
      },
      // 采集人脸数据界面
      getFaceInfo(index,row){
        this.IfCollect=false
        this.collectTips='等待采集'
        this.collectLength=0
        this.idx=index
        this.FaceInfo=row
        console.log(row)
        this.FaceDialog=true;
      },
      //关闭人脸数据采集界面
      CancelFaceDialog(){
        this.FaceDialog=false;
      },
      // 开始采集
      StartCollect(){
        this.IfCollect=true
        this.FaceInfoId.ID=this.FaceInfo.id
        this.getUserID();
        console.log(this.FaceInfoId.ID)
        let that = this;
        let params= new FormData();
        params.append('userID',that.FaceInfoId.userID);
        params.append('ID',that.FaceInfoId.ID);
        params.append('type',"volunteer")

        // let params = JSON.stringify(that.FaceInfoId);
        runFaceCollectPython(params)
          .then(res =>{
            if (res.code == 1) {
              that.$message({
                title: "采集成功",
                message: "采集成功",
                type: 'success'
              });
              this.collectTips='采集完成'
              this.collectLength=100
              this.getVolunteer()
            }else {
              that.$message({
                title: "采集失败",
                message: "采集失败",
                type: 'warning'
              });
            }
          }).catch(function() {
          that.$notify({
            title: "采集失败",
            message: "服务器异常",
            type: "error"
          });
          console.log("服务呵呵呵");
        });
      },
      //查看大图
      showHuge(index,row){
        this.TouDialogVisible=true;
        this.idx=index;
        this.HugeURL=this.baseURL+row.imgset_dir
      },
      // 关闭大图
      closeDialog(){
        this.TouDialogVisible=false
      },
      //获得管理员ID
      getUserID() {
        // this.addOldPersonForm.CREATEBY=Cookies.get('User_ID')
        this.FaceInfoId.userID=this.$store.state.userId;
        console.log(this.FaceInfoId.userID);
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
        if(e.data=='开始采集15张眨眼图片'){
          this.collectTips='请眨眼睛'
          this.collectLength=0
        }
        if(e.data=='开始采集15张张嘴图片'){
          this.collectTips='请张嘴'
          this.collectLength=14
        }
        if(e.data=='开始采集15张笑的图片'){
          this.collectTips='请微笑'
          this.collectLength=28
        }
        if(e.data=='开始采集15张抬头图片'){
          this.collectTips='请向上看'
          this.collectLength=42
        }
        if(e.data=='开始采集15张低头图片'){
          this.collectTips='请向下看'
          this.collectLength=56
        }
        if(e.data=='开始采集15张看左边的图片'){
          this.collectTips='请看左边'
          this.collectLength=71
        }
        if(e.data=='开始采集15张看右边的图片'){
          this.collectTips='请看右边'
          this.collectLength=86
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
  .volunteerCard{
    font-weight: bold;
    font-family: 幼圆;
    margin-left: 20px;
    margin-right: 20px;
  }
  .DrawerClass{
    padding: 10px 10px;
    height: 100%;
    margin-left: 350px;
    margin-right: 350px;
    margin-top: 0px;
  }
  .InfoCard{
    font-weight: bold;
    font-family: 幼圆;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 0px;
    margin-top: 10px;
    /*padding: 0px;*/
  }
  .faceDialog{
    width: 100%;
  }
  .faceCard{
    margin-top: -30px;
    /*height: 450px;*/
  }
  .touDialog{
    width: 50%;
  }
  .touCard{

  }

</style>