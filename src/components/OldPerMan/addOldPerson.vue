<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >老年人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >录入信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="oldCard" >
<!--      <el-form  ref="addOldPersonForm" :rules="rules" :model="addOldPersonForm" label-width="80px">-->
      <el-form ref="addOldPersonForm" :rules="rulesForm" :model="addOldPersonForm" label-width="90px" >
        <el-container>
          <el-aside width="900px">
            <el-row>
              <el-col :span="1">
                <el-form-item label="姓名" prop="username">
                  <el-input style="width: 200px" v-model="addOldPersonForm.username"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="1">
                <el-form-item label="性别" prop="gender" >
                  <el-radio v-model="addOldPersonForm.gender" label="男">男</el-radio>
                  <el-radio v-model="addOldPersonForm.gender" label="女">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-aside>
          <el-main >
            <el-upload

              :auto-upload="false"
              action="#"
              class="avatar-uploader"
              :limit="1"
              :on-change="handleChange"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <div class="el-upload__text"> <em>头像</em></div>
              <div class="el-upload__text">&nbsp</div>
              <img v-if="imgUrl" :src="imgUrl" class="avatar">

              <i v-else class="el-icon-plus avatar-uploader-icon;" style="size: A3"></i>
            </el-upload>
          </el-main>
        </el-container>

        <el-row>
          <el-col :span="6">
            <el-form-item label="电话号码" prop="phone">
              <el-input style="width: 200px" v-model="addOldPersonForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号" prop="id_card" >
              <el-input style="width: 200px" v-model="addOldPersonForm.id_card"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="出生日期" prop="birthday" >
              <div class="block" >
                <span class="demonstration" ></span>
                <el-date-picker
                  v-model="addOldPersonForm.birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入院日期" prop="checkin_date" >
              <div class="block" style="width: 200px">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="addOldPersonForm.checkin_date"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间号"prop="room_number" >
              <el-input style="width: 200px" v-model="addOldPersonForm.room_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="第一监护" prop="firstguardian_name">
              <el-input style="width: 200px" v-model="addOldPersonForm.firstguardian_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="亲属关系" prop="firstguardian_relationship">
              <el-input style="width: 200px" v-model="addOldPersonForm.firstguardian_relationship"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码" prop="firstguardian_phone">
              <el-input style="width: 200px" v-model="addOldPersonForm.firstguardian_phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="微信号" prop="firstguardian_wechat">
              <el-input style="width: 200px" v-model="addOldPersonForm.firstguardian_wechat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="第二监护"prop="secondguardian_name" >
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="亲属关系" prop="secondguardian_relationship" >
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_relationship"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码" prop="secondguardian_phone">
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="微信号"  prop="secondguardian_wechat">
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_wechat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-form-item label="健康状态" prop="health_state">-->
<!--          <el-input style="width: 200px" v-model="addOldPersonForm.health_state"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="健康状态" prop="health_state">
          <el-checkbox-group v-model="checkedHealth" @change="handleCheckedHealthChange">
            <el-checkbox v-for="health in healths" :label="health" :key="health">{{health}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="备注" prop="DESCRIPTION" >
              <el-input style="width: 200px" v-model="addOldPersonForm.DESCRIPTION"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button id="btn" style="margin-left: 600px" :disabled="btnBoolean" type="primary" @click="submitForm('addOldPersonForm')">录入</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { mapMutations } from 'vuex';
  import {addOldImg, addOldPerson, Register} from "../../api";
  const healthsOptions = ['心脏病', '糖尿病', '高血压', '高血脂'];
  export default {
    name: "addOldPerson",
    data(){
      return{
        fileList:[],
        imgUrl:'',
        healths: healthsOptions,
        checkedHealth: ['心脏病'],
        btnBoolean: false,
        btnStatus: -1,
        admin_Name:'',
        addOldPersonForm:{
          username:'222',
          gender:'女',
          phone:'11111111111',
          id_card:'1111111111111111111111',
          birthday:'',
          checkin_date:'',
          room_number:'12',
          firstguardian_name:'aaa',
          firstguardian_relationship:'儿子',
          firstguardian_phone:'11111111111',
          firstguardian_wechat:'aaaaaa',
          secondguardian_name:'aaa',
          secondguardian_relationship:'儿子',
          secondguardian_phone:'11111111111',
          secondguardian_wechat:'aaaaaa',
          health_state:'好',
          DESCRIPTION:'好得很',
          ISACTIVE:'不知道',
          CREATEBY:'',
        },
        rulesForm:{
          username: [
            {required: true, message: '请输入老人姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个汉字', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位电话号码', trigger: 'blur'}
          ],
          id_card: [
            {required: true, message: '请输入省份证号', trigger: 'blur'},
            {min: 22, max: 22, message: '请输入22位省份证号', trigger: 'blur'}
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
          DESCRIPTION: [
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
            {required: true, message: '请输入监护人姓名', trigger: 'blur'},
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
        }
      }
    },
    methods:{
      ...mapMutations(['setToken']),
      handleAvatarSuccess(res, file) {
        if (res.code === 1) {
          this.imageUrl = URL.createObjectURL(file.raw)

          this.$store.commit('setAvator', res.avator)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.notify('修改失败', 'error')
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$notify({
            title: "上传失败",
            message: "上传头像图片只能是 JPG 格式!",
            type: "error"
          });
        }
        if (!isLt2M) {
          this.$notify({
            title: "上传失败",
            message: "上传头像图片大小不能超过 2MB!",
            type: "error"
          });
        }
        return isJPG && isLt2M;
      },
      handleChange(file,fileList){
        this.fileList=fileList;
        console.log(file)
        this.imgUrl = URL.createObjectURL(file.raw)
        console.log("+++++++++++++++++imgUrl+++++++++++++++++++")
        console.log(this.imgUrl)

      },
      // 上传头像
      uploadUrl () {
        // return `${this.$store.state.HOST}/user/avatar/update?id=${this.form.id}`
        // console.log(this.imageUrl)
        // that.getOldPerson();
        console.log("===========开始上传1++++++++++++")
        let that =this
        let fd= new FormData();
        let face = this.fileList[0];
        // console.log(this.fileList[0])
        fd.append('file',this.fileList[0].raw)
        fd.append('user',this.stringify(this.addOldPersonForm.id_card))
        console.log("+++++++++file+user+++++++++++")
        console.log(fd.get('user'))
        console.log(fd.get('file'))
        console.log("+++++++++file+user+++++++++++")
        console.log(fd)
        addOldImg(fd)
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
          that.$message({
            title: "图片上传失败",
            message: "图片上传失败，服务器异常",
            type: "error"
          });
        })
      },
      submitForm(addOldPersonForm){
        //为表单绑定验证功能
        let that = this;
        that.ChangeDate();//改变日期格式
        that.$refs[addOldPersonForm].validate((valid) => {
          that.getID();
          console.log('-----------addOldPersonForm---------------')
          console.log(that.addOldPersonForm);
          let params = JSON.stringify(that.addOldPersonForm);
          if(valid && this.imgUrl!==''){
            console.log('-----------表单验证通过---------------')
            addOldPerson(params).then(res => {
              console.log('-----------res---------------')
              console.log(res.code)
              if (res.code == 1) {
                console.log('=====================');
                that.$message({
                  title: "录入成功",
                  message: "录入成功",
                  type: 'success'
                });
                this.btnBoolean = true;
                console.log('============上传图片-===========');
                this.uploadUrl();
                console.log('============上传图片完成-===========');
              }else {
                console.log('-----------老人重复---------------');
                that.$message({
                  title: "录入失败",
                  message: "用户名重复",
                  type: "error"
                });
              }
            }).catch(function() {
              that.$message({
                title: "录入失败",
                message: "服务器异常",
                type: "error"
              });
              console.log("服务呵呵呵");
             });
          }else if(valid && this.imgUrl===''){
            that.$message({
              title: "请上传头像",
              message: "请上传头像",
              type: "error"
            });
          }
          else{
            that.$message({
              message: '表单填写有误',
              type: 'error'
            });
            return false;
          }
        });
      },
      // 改变时间格式
      ChangeDate(){
        //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
        if(this.addOldPersonForm.birthday!=''){
          let delayTime = new Date(this.addOldPersonForm.birthday).toJSON();
          this.addOldPersonForm.birthday = new Date(
            +new Date(delayTime) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addOldPersonForm.birthday);
        }
        if(this.addOldPersonForm.checkin_date!=''){
          //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
          let delayTime1 = new Date(this.addOldPersonForm.checkin_date).toJSON();
          this.addOldPersonForm.checkin_date = new Date(
            +new Date(delayTime1) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addOldPersonForm.checkin_date);
        }
        console.log("----");

      },
      //获得管理员ID
      getID(){
        // this.addOldPersonForm.CREATEBY=Cookies.get('User_ID')
        this.addOldPersonForm.CREATEBY=this.$store.state.userId;
        console.log(this.addOldPersonForm.CREATEBY);
      },
      //检测选项框
      handleCheckedHealthChange(value) {
        // console.log(this.checkedHealth[0])
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
        this.addOldPersonForm.health_state=total
        console.log(this.addOldPersonForm.health_state)
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
  padding-bottom: -200px;
  /*padding: 0px;*/

}
  .fontSize{
    font-size: 18px;
  }
.avatar-uploader .el-upload {
  border: 10px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #55a532;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>