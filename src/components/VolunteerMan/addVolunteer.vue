<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >义工信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >义工信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="volunteerCard" >
      <el-form ref="addVolunteerForm" :rules="rulesForm" :model="addVolunteerForm" label-width="90px" >
<!--        <el-container>-->
<!--          <el-aside width="500px">-->
<!--            <el-row>-->
<!--              <el-col :span="8" style=";margin-left: 160px">-->
<!--                <el-form-item label="姓名" prop="name">-->
<!--                  <el-input style="width: 200px" v-model="addVolunteerForm.name"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row >-->
<!--              <el-col :span="8" style=";margin-left: 160px">-->
<!--                <el-form-item label="性别" prop="gender">-->
<!--                  <el-radio v-model="addVolunteerForm.gender" label="男">男</el-radio>-->
<!--                  <el-radio v-model="addVolunteerForm.gender" label="女">女</el-radio>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-aside>-->
<!--          <el-main >-->
<!--            <el-upload-->

<!--              :auto-upload="false"-->
<!--              action="#"-->
<!--              class="avatar-uploader"-->
<!--              :limit="1"-->
<!--              :on-change="handleChange"-->
<!--              :show-file-list="false"-->
<!--              :on-success="handleAvatarSuccess"-->
<!--              :before-upload="beforeAvatarUpload">-->
<!--              <div class="el-upload__text"> <em>头像</em></div>-->
<!--              <div class="el-upload__text">&nbsp</div>-->
<!--              <img v-if="imgUrl" :src="imgUrl" class="avatar">-->

<!--              <i v-else class="el-icon-plus avatar-uploader-icon;" style="size: A3"></i>-->
<!--            </el-upload>-->
<!--          </el-main>-->
<!--        </el-container>-->
        <el-row>
          <el-col :span="8" style=";margin-left: 160px">
            <el-form-item label="头像" style="height: 60px">
              <el-upload style="margin-left: 80px"

                         :auto-upload="false"
                         action="#"
                         class="avatar-uploader"
                         :limit="1"
                         :on-change="handleChange"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <div class="el-upload__text">&nbsp</div>
                <img v-if="imgUrl" :src="imgUrl" class="avatar">

                <i v-else style="width: 20px">上传</i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style=";margin-left: 160px">
            <el-form-item label="姓名" prop="name">
              <el-input style="width: 200px" v-model="addVolunteerForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8" style=";margin-left: 160px">
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="addVolunteerForm.gender" label="男">男</el-radio>
              <el-radio v-model="addVolunteerForm.gender" label="女">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="电话号码" prop="phone">
              <el-input style="width: 200px" v-model="addVolunteerForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="身份证号" prop="id_card" >
              <el-input style="width: 200px" v-model="addVolunteerForm.id_card"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="出生日期" prop="birthday" >
              <div class="block" >
                <span class="demonstration" ></span>
                <el-date-picker
                  v-model="addVolunteerForm.birthday"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="入职日期" prop="checkin_date" >
              <div class="block" style="width: 200px">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="addVolunteerForm.checkin_date"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"style=";margin-left: 160px">
            <el-form-item label="备注" prop="DESCRIPTION" >
              <el-input style="width: 200px" v-model="addVolunteerForm.DESCRIPTION"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <el-button id="btn" style="margin-left: 290px" :disabled="btnBoolean" type="primary" @click="submitForm('addVolunteerForm')">录入</el-button>
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
  import {addVolunteer, addVolunteerImg} from "../../api";

  export default {
    name: "addVolunteer",
    data(){
      return{
        fileList:[],
        imgUrl:'',
        btnBoolean: false,
        btnStatus: -1,
        admin_Name:'',
        addVolunteerForm:{
          name:'222',
          gender:'女',
          phone:'11111111111',
          id_card:'1111111111111111111111',
          birthday:'',
          checkin_date:'',
          DESCRIPTION:'好得很',
          ISACTIVE:'0',
          CREATEBY:'',
        },
        rulesForm:{
          name: [
            {required: true, message: '请输入员工姓名', trigger: 'blur'},
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
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          checkin_date: [
            {required: true, message: '请选择入职日期', trigger: 'blur'},
          ],
          DESCRIPTION: [
            {required: true, message: '请输入员工描述', trigger: 'blur'},
            {min: 2, max: 100, message: '100个字符以内', trigger: 'blur'}
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
        fd.append('user',this.addVolunteerForm.id_card)
        console.log("+++++++++file+user+++++++++++")
        console.log(fd.get('user'))
        console.log(fd.get('file'))
        console.log("+++++++++file+user+++++++++++")
        console.log(fd)
        addVolunteerImg(fd)
          .then(res =>{
            if (res.code == 1) {
              that.$message({
                title: "图片上传成功",
                message: "图片上传成功",
                type: 'success'
              });
            }else {
              that.$message({
                title: "图片上传失败",
                message: "图片上传失败",
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

      submitForm(addVolunteerForm){
        //为表单绑定验证功能
        let that = this;
        that.ChangeDate();//改变日期格式
        that.$refs[addVolunteerForm].validate((valid) => {
          that.getID();
          console.log('-----------addVolunteerForm---------------')
          console.log(that.addVolunteerForm);
          let params = JSON.stringify(that.addVolunteerForm);
          if(valid && this.imgUrl!==''){
            console.log('-----------表单验证通过---------------')
            addVolunteer(params).then(res => {
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
                console.log('-----------员工重复---------------')
                that.$message({
                  title: "录入失败",
                  message: "用户名重复",
                  type: "error"
                });
              }
            }).catch(function() {
              that.$notify({
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
          }else{
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
        if(this.addVolunteerForm.birthday!=''){
          let delayTime = new Date(this.addVolunteerForm.birthday).toJSON();
          this.addVolunteerForm.birthday = new Date(
            +new Date(delayTime) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addVolunteerForm.birthday);
        }
        if(this.addVolunteerForm.checkin_date!=''){
          //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
          let delayTime1 = new Date(this.addVolunteerForm.checkin_date).toJSON();
          this.addVolunteerForm.checkin_date = new Date(
            +new Date(delayTime1) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addVolunteerForm.checkin_date);
        }
        console.log("----");

        // //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
        // let checkin_date = new Date(this.addVolunteerForm.checkin_date).toJSON().split('T')[0];
        // this.addVolunteerForm.checkin_date=checkin_date;
        // console.log(this.addVolunteerForm.checkin_date);

        // UTC时间格式转换——2019-10-14 12:20:12
        // let delayTime = new Date(this.addVolunteerForm.birthday).toJSON();
        // this.addVolunteerForm.birthday = new Date(
        //   +new Date(delayTime) + 8 * 3600 * 1000
        // )
        //   .toISOString()
        //   .replace(/T/g, " ")
        //   .replace(/\.[\d]{3}Z/, "");
        // console.log(this.addVolunteerForm.birthday);
      },
      //获得管理员ID
      getID(){
        this.addVolunteerForm.CREATEBY=this.$store.state.userId;
        console.log(this.addVolunteerForm.CREATEBY);
      },
    }
  }
</script>

<style scoped>
  .volunteerCard{
    font-weight: bold;
    font-family: 幼圆;
    margin-left: 300px;
    margin-right: 300px;
    padding-bottom: -200px;
    /*padding: 0px;*/

  }
  .fontSize{
    font-size: 18px;
  }
</style>