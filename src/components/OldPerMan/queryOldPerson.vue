<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >老年人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >老人列表</el-breadcrumb-item>
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
      <el-table :data="AllOldPersonList">
        <el-table-column label="姓名" width="80px"  prop="username"  align="center"></el-table-column>

        <el-table-column label="头像" prop="imgset_dir"  align="center" width="80px"  >
          <template slot-scope="scope">
            <img :src=baseURL+scope.row.imgset_dir alt="头像" title="查看大图"  width="50px" style="margin: 0 0px 0px; cursor:pointer" @click="showHuge(scope.$index, scope.row)">
          </template>
        </el-table-column>

        <el-table-column label="姓别" width="80px" prop="gender"  align="center"></el-table-column>
        <el-table-column label="电话" width="120px"  prop="phone"  align="center"></el-table-column>
        <el-table-column label="身份证号" width="190px" prop="id_card" align="center"></el-table-column>
        <el-table-column label="房间号" width="80px" prop="room_number"  align="center"></el-table-column>
        <el-table-column label="入院时间" prop="checkin_date"  align="center"></el-table-column>
        <el-table-column label="人脸采集" prop="isactive"  align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isactive=='0'"
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

    <body>
    <el-drawer
      title=""
      direction="ttb"
      :visible.sync="OldInfoAllDrawer"
      :with-header="false"
      class="DrawerClass"
      size="80%">
      <!--      :with-header="true"-->
      <div class="demo-drawer__content">
        <el-card @close="isEdit = false" class="InfoCard" custom-class="custom-dialog"
                 :close-on-click-modal='false'>
          <h3 class="register-title" style="margin-left: 600px;margin-top: 10px;font-size: 30px">老人信息管理</h3>
          <el-form ref="form" :rules="rulesForm" :model="form" label-width="90px" >

                <el-row>
                  <el-col :span="6" style="margin-left: 0px">
                    <el-form-item label="ID" prop="id">
                      <el-input style="width: 200px" v-model="form.id" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="margin-left: 0px">
                    <el-form-item label="姓名" prop="username">
                      <el-input style="width: 200px" v-model="form.username" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <el-form-item label="性别" prop="gender" >
                      <el-input style="width: 200px" v-model="form.gender" disabled></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="6" style="margin-left:0px">
                    <el-form-item label="电话号码" prop="phone">
                      <el-input style="width: 200px" v-model="form.phone" :disabled="!isEdit"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" style="margin-left: 0px">
                    <el-form-item label="身份证号" prop="id_card" >
                      <el-input style="width: 200px" v-model="form.id_card" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


            <el-row>
              <el-col :span="6">
                <el-form-item label="出生日期" prop="birthday" >
                  <div class="block" >
                    <span class="demonstration" ></span>
                    <el-date-picker
                      v-model="form.birthday"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px"
                      disabled>
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="入院日期" prop="checkin_date" >
                  <div class="block" style="width: 200px">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="form.checkin_date"
                      type="date"
                      placeholder="选择日期"
                      style="width: 200px"
                      disabled
                      >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房间号"prop="room_number" >
                  <el-input style="width: 200px" v-model="form.room_number" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                  <el-form-item label="第一监护" prop="firstguardian_name">
                    <el-input style="width: 200px" v-model="form.firstguardian_name" :disabled="!isEdit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="亲属关系" prop="firstguardian_relationship">
                    <el-input style="width: 200px" v-model="form.firstguardian_relationship" :disabled="!isEdit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="电话号码" prop="firstguardian_phone">
                    <el-input style="width: 200px" v-model="form.firstguardian_phone" :disabled="!isEdit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="微信号" prop="firstguardian_wechat">
                    <el-input style="width: 200px" v-model="form.firstguardian_wechat" :disabled="!isEdit"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="第二监护"  prop="secondguardian_name">
                  <el-input style="width: 200px" v-model="form.secondguardian_name" :disabled="!isEdit" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="亲属关系" prop="secondguardian_relationship">
                  <el-input style="width: 200px" v-model="form.secondguardian_relationship" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话号码" prop="secondguardian_phone">
                  <el-input style="width: 200px" v-model="form.secondguardian_phone" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="微信号" prop="secondguardian_wechat" >
                  <el-input style="width: 200px" v-model="form.secondguardian_wechat" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="健康状态" prop="health_state">
<!--              <el-input style="width: 200px" v-model="form.health_state" :disabled="!isEdit"></el-input>-->
              <el-checkbox-group v-model="checkedHealth" @change="handleCheckedHealthChange" :disabled="!isEdit">
                <el-checkbox v-for="health in healths" :label="health" :key="health">{{health}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注" prop="DESCRIPTION" >
                  <el-input style="width: 560px" v-model="form.description" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button v-if="!isEdit" @click="isEdit = true" style="width: 100px" >编 辑</el-button>
                  <el-button v-else @click="cancelEdit"  style="width: 100px">取消编辑</el-button>
                  <el-button type="primary" v-on:click="SaveOldPersonEdit('form')" style="width: 100px; margin-left: 20px" >保 存</el-button>
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
      title="人脸数据采集">
      <el-card
      class="faceCard">

        <el-form ref="FaceInfo" :model="FaceInfo" label-width="90px" >
          <el-container>
            <el-header style="margin-top: -10px">
              <el-row>
                <el-col :span="4">
                  <el-form-item label="老人ID：" prop="id" style="margin-left: -20px; margin-top: 10px">
                    <label >
                      {{FaceInfo.id}}
                    </label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="老人姓名：" prop="username" style="margin-left: 80px;  margin-top: 10px">
                    <label>
                      {{FaceInfo.username}}
                    </label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-header>
            <el-main style="">
              <el-container style="height: 324px" >
                <el-aside style=" width: 100px ">
<!--                  <el-progress :show-text="false" :stroke-width="44" :percentage=collectLength style="margin-top: 0px;width: 100px"></el-progress>-->
                  <el-progress v-if="collectLength!=100" :show-text="false" type="circle" :percentage=collectLength :width=80 status="success"></el-progress>
                  <el-progress v-else type="circle" :percentage=collectLength :width=80 status="success"></el-progress>
                  <h2 style="margin-left:15%">提示:</h2>
                  <h2 style="margin-left:0%; margin-top: 50%">{{collectTips}}</h2>
                </el-aside>
                <el-main style="" >
<!--                    <iframe :src="vedioURL" width="325px" height="250px" frameborder="0" id="mobsf" scrolling="no" style="margin-left: 30px"></iframe>-->
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
                  <el-button type="primary" :disabled="IfCollect" v-on:click="StartCollect()"  style="width: 100px; margin-top: 0px;margin-left: 200px" >开始采集</el-button>
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
    editOldPerson,
    editSysUser,
    queryOldPerson,
    removeOldPerson,
    runFaceCollectPython
  } from "../../api";
  import {initWebSocket, websocketclose, websocketonerror, websocketonmessage, websocketonopen} from "../../webSocket";
  const healthsOptions = ['心脏病', '糖尿病', '高血压', '高血脂'];
  export default {
    name: "queryOddPerson",

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
            src: "rtmp://182.92.84.33:1935/stream/test" //url地址
          }],
          // hls:true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
          techOrder: ['flash'], //播放rtmp必须加
          poster: "", //你的封面地址
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
        healths: healthsOptions,
        checkedHealth: [],
        isEdit: false,   // 是否编辑
        OldInfoAllDrawer: false,
        direction: 'ttb',
        // 获取用户列表参数对象
        info:{
        },
        queryInfo:{
          query:'',
          pageNum:1,
          pageSize:2
        },
        AllOldPersonList:[
          {
            username: "",
            gender: "",
            phone: "",
            id_card: "",
            birthday: "",
            checkin_date: "",
            checkout_date: "",
            imgset_dir: "",
            profile_photo: "",
            room_number: "",
            firstguardian_name: "",
            firstguardian_relationship: "",
            firstguardian_phone: "",
            firstguardian_wechat: "",
            secondguardian_name: "",
            secondguardian_relationship: "",
            secondguardian_phone: "",
            secondguardian_wechat: "",
            health_state: "",
            CREATED: "",
            UPDATED: "",
            id: "",
            description: "",
            isactive: "",
            createby: "",
            updateby: "",
            remove: "",
            created: "",
            updated: "",
            org_ID: "",
            client_ID: ""
          }
        ],
        oldPersonList:[
          {
            ID:'',
            username:'',
            gender:'',
            phone:'',
            id_card:'',
            checkin_date:''
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
            {required: true, message: '请选择入院日期', trigger: 'blur'},
          ],
          room_number: [
            {required: true, message: '请输入房间号', trigger: 'blur'},
            {min: 1, max: 3, message: '请输入1~100的数字', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入老人描述', trigger: 'blur'},
            {min: 2, max: 100, message: '100个字符以内', trigger: 'blur'}
          ],
          firstguardian_name: [
            {required: true, message: '请输入监护人姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个汉字', trigger: 'blur'}
          ],
          firstguardian_relationship: [
            {required: true, message: '请输入如老人关系', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          firstguardian_phone: [
            {required: true, message: '请输入监护人电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur'}
          ],
          firstguardian_wechat: [
            {required: true, message: '请输入监护人微信号', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          secondguardian_name: [
            {required: true, message: '请输入第二监护人姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个汉字', trigger: 'blur'}
          ],
          secondguardian_relationship: [
            {required: true, message: '请输入如老人关系', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          secondguardian_phone: [
            {required: true, message: '请输入监护人电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur'}
          ],
          secondguardian_wechat: [
            {required: true, message: '请输入监护人微信号', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
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
        EditedOldInfo:{
          ID:"",
          gender:"",
          phone:"",
          id_card:"",
          birthday:"",
          checkin_date:"",
          room_number:"",
          firstguardian_name:"",
          firstguardian_relationship:"",
          firstguardian_phone:"",
          firstguardian_wechat:"",
          secondguardian_name:"",
          secondguardian_relationship:"",
          secondguardian_phone:"",
          secondguardian_wechat:"",
          health_state:"",
          DESCRIPTION:"",
          ISACTIVE:"不知道",
          UPDATEBY:""
        },
        idx: -1,
        total:0,
        DeleteOldId:{
          ID: '',
        },
      }
    },
    computed:{
      player(){
        return this.$refs.videoPlayer.player
      }
    },
    created() {
      this.getOldPerson()
      this.initWebSocket(this.$store.state.userId)
    },
    mounted() {
      // this.message = websocketonmessage()
      // console.log(this.message+'aaaaaaaaaaaaaaaaaaa')
    },
    methods:{
      handleChange(file,fileList){
        this.fileList=fileList;
        console.log(file)
        this.imgUrl = URL.createObjectURL(file.raw)
        console.log("+++++++++++++++++imgUrl+++++++++++++++++++")
        console.log(this.imgUrl)

      },

      // 获得老人资料
      getOldPerson(){
        let that = this;
        let params = JSON.stringify(that.info);
        console.log('-----------获取信息1---------------')
        queryOldPerson(params)
        .then(res =>{
          console.log('-----------获取信息2---------------')
          console.log( res)
          if (res.code == 1) {

            console.log('-----------OldPersonInfo---------------')
            that.AllOldPersonList=res.data;
            console.log(that.AllOldPersonList);
            console.log(this.baseURL+that.AllOldPersonList[0].imgset_dir+"+++++++++++++++");
            console.log('-----------OldPersonInfo---------------')
          }else {
            _this.notify('错误', 'error')
          }
        }).catch(failResponse => {})
      },
      //获得老人所有信息
      getOldInfoAllDrawer(index,row){
        this.OldInfoAllDrawer=true;
        this.idx = index;
        this.form = row;
        console.log(this.form);
        console.log("+++++++++++++++解析字符串++++++++++++++++")
        this.Analyse();
      },
      //取消编辑
      cancelEdit(){
        this.isEdit = false
        // this.editForm = this.deepClone(this.currentItem)
      },
      // 保存编辑
      SaveOldPersonEdit(formName){
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.getID();
            that.getEditInfoFromInfo();
            that.ChangeDate();
            // that.uploadUrl();

            let params = JSON.stringify(that.EditedOldInfo);

            console.log(params)
            editOldPerson(params)
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
        // let params2 = JSON.stringify(that.EditedOldInfo);
        // this.$axios.post('api/oldperson/addPhotoOP',fd,).then
      },
      //删除操作
      DeleteOldInfo(index,row){
        console.log("===============删除操作==================")
        this.idx = index;
        this.form = row;
        this.DeleteOldId.ID=this.form.id;
        console.log(this.DeleteOldId.ID);
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            let that = this;
            let params = JSON.stringify(that.DeleteOldId);
            removeOldPerson(params)
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
            this.AllOldPersonList.splice(index, 1);
          })
          .catch(() => {});
      },

      //数据转换
      getEditInfoFromInfo(){
        this.EditedOldInfo.ID=this.form.id;
        this.EditedOldInfo.gender=this.form.gender;
        this.EditedOldInfo.phone=this.form.phone;
        this.EditedOldInfo.id_card=this.form.id_card;
        this.EditedOldInfo.birthday=this.form.birthday;
        this.EditedOldInfo.checkin_date=this.form.checkin_date;
        this.EditedOldInfo.room_number=this.form.room_number;
        this.EditedOldInfo.firstguardian_name=this.form.firstguardian_name;
        this.EditedOldInfo.firstguardian_phone=this.form.firstguardian_phone;
        this.EditedOldInfo.firstguardian_relationship=this.form.firstguardian_relationship;
        this.EditedOldInfo.firstguardian_wechat=this.form.firstguardian_wechat;
        this.EditedOldInfo.secondguardian_name=this.form.secondguardian_name;
        this.EditedOldInfo.secondguardian_phone=this.form.secondguardian_phone;
        this.EditedOldInfo.secondguardian_relationship =this.form.secondguardian_relationship;
        this.EditedOldInfo.secondguardian_wechat=this.form.secondguardian_wechat;
        this.EditedOldInfo.health_state=this.form.health_state;
        this.EditedOldInfo.DESCRIPTION=this.form.description;

        console.log(this.EditedOldInfo.ID)
        console.log("++++++++++++++++转换完成++++++++++++++++")

      },
      //获得管理员ID
      getID(){
        // this.addOldPersonForm.CREATEBY=Cookies.get('User_ID')
        this.EditedOldInfo.UPDATEBY=this.$store.state.userId;
        console.log(this.EditedOldInfo.UPDATEBY);
      },
      // 改变时间格式
      ChangeDate(){
        //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
        if(this.EditedOldInfo.birthday!=''){
          let delayTime = new Date(this.EditedOldInfo.birthday).toJSON();
          this.EditedOldInfo.birthday = new Date(
            +new Date(delayTime) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.EditedOldInfo.birthday);
        }
        if(this.EditedOldInfo.checkin_date!=''){
          //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
          let delayTime1 = new Date(this.EditedOldInfo.checkin_date).toJSON();
          this.EditedOldInfo.checkin_date = new Date(
            +new Date(delayTime1) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.EditedOldInfo.checkin_date);
        }
        console.log("----");
      },
      //检测选项框
      handleCheckedHealthChange(value) {
        let checkedCount = value.length;
        // console.log(checkedCount)
        // let sick=0;
        let sick0=0;
        let sick1=0;
        let sick2=0;
        let sick3=0;

        for(let sick=0;sick<checkedCount;sick++){
          if(this.checkedHealth[sick]=='心脏病'){
            sick0=1
          }else if(this.checkedHealth[sick]=='糖尿病'){
            sick1=1
          }else if(this.checkedHealth[sick]=='高血压'){
            sick2=1
          }else if(this.checkedHealth[sick]=='高血脂'){
            sick3=1
          }
        }
        console.log(sick0)
        console.log(sick1)
        console.log(sick2)
        console.log(sick3)

        let total = sick0+'_'+sick1+'_'+sick2+'_'+sick3;
        console.log(total)
        this.form.health_state=total
        console.log(this.form.health_state)
      },
      //解析健康状况
      Analyse(){

        let Data=this.form.health_state.split("_")

        console.log(this.form.health_state)
        for(let sick =0;sick<Data.length;sick++){
          if(Data[sick]=='1'&&sick==0){
            this.checkedHealth.push('心脏病')
          }
          if(Data[sick]=='1'&&sick==1){
            this.checkedHealth.push('糖尿病')
          }
          if(Data[sick]=='1'&&sick==2){
            this.checkedHealth.push('高血压')
          }
          if(Data[sick]=='1'&&sick==3){
            this.checkedHealth.push('高血脂')
          }

        }
        console.log(this.checkedHealth)
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
        params.append('type',"oldpeople")

        // let params = JSON.stringify(that.FaceInfoId);
        console.log("==============开始采集================")
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
              this.getOldPerson()

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
      getUserID(){
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
  .oldCard{
    font-weight: bold;
    font-family: 幼圆;
    margin-left: 20px;
    margin-right: 20px;
  }
  .DrawerClass{
    padding: 10px 10px;
    height: 100%;
  }
  .InfoCard{
     font-weight: bold;
     font-family: 幼圆;
     margin-left: 20px;
     margin-right: 20px;
     /*padding-bottom: 0px;*/
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