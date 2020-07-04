<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >工作人员信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >录入信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="employeeCard" >
      <el-form ref="addEmployeeForm" :rules="rulesForm" :model="addEmployeeForm" label-width="90px" >
<!--        <el-container>-->
<!--          <el-aside width="500px">-->
<!--            <el-row>-->
<!--              <el-col :span="8" style=";margin-left: 160px">-->
<!--                <el-form-item label="姓名" prop="username">-->
<!--                  <el-input style="width: 200px" v-model="addEmployeeForm.username"></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row >-->
<!--              <el-col :span="8" style=";margin-left: 160px">-->
<!--                <el-form-item label="性别" prop="gender">-->
<!--                  <el-radio v-model="addEmployeeForm.gender" label="男">男</el-radio>-->
<!--                  <el-radio v-model="addEmployeeForm.gender" label="女">女</el-radio>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-aside>-->
<!--          <el-main style="background-color: #303133">-->
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
            <el-form-item label="姓名" prop="username">
              <el-input style="width: 200px" v-model="addEmployeeForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8" style=";margin-left: 160px">
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="addEmployeeForm.gender" label="男">男</el-radio>
              <el-radio v-model="addEmployeeForm.gender" label="女">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="电话号码" prop="phone">
              <el-input style="width: 200px" v-model="addEmployeeForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="身份证号" prop="id_card" >
              <el-input style="width: 200px" v-model="addEmployeeForm.id_card"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" style=";margin-left: 160px">
            <el-form-item label="出生日期" prop="birthday" >
              <div class="block" >
                <span class="demonstration" ></span>
                <el-date-picker
                  v-model="addEmployeeForm.birthday"
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
            <el-form-item label="入职日期" prop="hire_date" >
              <div class="block" style="width: 200px">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="addEmployeeForm.hire_date"
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
              <el-input style="width: 200px" v-model="addEmployeeForm.DESCRIPTION"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <el-button id="btn" style="margin-left: 290px" :disabled="btnBoolean" type="primary" @click="submitForm('addEmployeeForm')">录入</el-button>
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
  import {addEmployee, addOldImg, Register} from "../../api";

  export default {
    name: "addEmployee",
    data(){
      return{
        fileList:[],
        imgUrl:'',
        btnBoolean: false,
        btnStatus: -1,
        admin_Name:'',
        addEmployeeForm:{
          username:'222',
          gender:'女',
          phone:'11111111111',
          id_card:'1111111111111111111111',
          birthday:'',
          hire_date:'',
          DESCRIPTION:'好得很',
          ISACTIVE:'不知道',
          CREATEBY:'',
        },
        rulesForm:{
          username: [
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
            {required: true, message: '请输入省份证号', trigger: 'blur'},
            {min: 22, max: 22, message: '请输入22位省份证号', trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          hire_date: [
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
        fd.append('user',JSON.stringify(this.addEmployeeForm.id_card))
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
      submitForm(addEmployeeForm){
        //为表单绑定验证功能
        let that = this;
        that.ChangeDate();//改变日期格式
        that.$refs[addEmployeeForm].validate((valid) => {
          that.getID();
          console.log('-----------addEmployeeForm---------------')
          console.log(that.addEmployeeForm);
          let params = JSON.stringify(that.addEmployeeForm);
          if(valid&& this.imgUrl!==''){
            console.log('-----------表单验证通过---------------')
            addEmployee(params).then(res => {
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
        if(this.addEmployeeForm.birthday!=''){
          let delayTime = new Date(this.addEmployeeForm.birthday).toJSON();
          this.addEmployeeForm.birthday = new Date(
            +new Date(delayTime) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addEmployeeForm.birthday);
        }
        if(this.addEmployeeForm.hire_date!=''){
          //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
          let delayTime1 = new Date(this.addEmployeeForm.hire_date).toJSON();
          this.addEmployeeForm.hire_date = new Date(
            +new Date(delayTime1) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          console.log(this.addEmployeeForm.hire_date);
        }
        console.log("----");

        // //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
        // let checkin_date = new Date(this.addEmployeeForm.checkin_date).toJSON().split('T')[0];
        // this.addEmployeeForm.checkin_date=checkin_date;
        // console.log(this.addEmployeeForm.checkin_date);

        // UTC时间格式转换——2019-10-14 12:20:12
        // let delayTime = new Date(this.addEmployeeForm.birthday).toJSON();
        // this.addEmployeeForm.birthday = new Date(
        //   +new Date(delayTime) + 8 * 3600 * 1000
        // )
        //   .toISOString()
        //   .replace(/T/g, " ")
        //   .replace(/\.[\d]{3}Z/, "");
        // console.log(this.addEmployeeForm.birthday);
      },
      //获得管理员ID
      getID(){
        this.addEmployeeForm.CREATEBY=this.$store.state.userId;
        console.log(this.addEmployeeForm.CREATEBY);
      },
    }
  }
</script>

<style scoped>
  .employeeCard{
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