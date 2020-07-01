<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >老年人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >录入信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="oddCard" >
<!--      <el-form  ref="addOldPersonForm" :rules="rules" :model="addOldPersonForm" label-width="80px">-->
      <el-form ref="addOldPersonForm" :rules="rulesForm" :model="addOldPersonForm" label-width="90px" >
        <el-container>
          <el-aside width="500px" style="transform: translate(0%,25%);">
            <el-form-item label="姓名" prop="username">
              <el-input style="width: 200px" v-model="addOldPersonForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="addOldPersonForm.gender" label="M">男</el-radio>
              <el-radio v-model="addOldPersonForm.gender" label="F">女</el-radio>
            </el-form-item>
          </el-aside>
          <el-main>
            <el-form-item label="姓名" >
              <el-input style="width: 200px" v-model="addOldPersonForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="addOldPersonForm.gender" label="M">男</el-radio>
              <el-radio v-model="addOldPersonForm.gender" label="F">女</el-radio>
            </el-form-item>
          </el-main>
        </el-container>
<!--        <el-form-item label="姓名" >-->
<!--          <el-input style="width: 200px" v-model="addOldPersonForm.username"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="性别">-->
<!--          <el-radio v-model="addOldPersonForm.gender" label="M">男</el-radio>-->
<!--          <el-radio v-model="addOldPersonForm.gender" label="F">女</el-radio>-->
<!--        </el-form-item>-->
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
            <el-form-item label="第二监护"  class="fontSize">
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="亲属关系" >
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_relationship"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码" >
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="微信号" >
              <el-input style="width: 200px" v-model="addOldPersonForm.secondguardian_wechat"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="健康状态" prop="health_state">
          <el-input style="width: 200px" v-model="addOldPersonForm.health_state"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="备注" prop="DESCRIPTION" >
              <el-input style="width: 200px" v-model="addOldPersonForm.DESCRIPTION"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button style="margin-left: 600px" type="primary" @click="submitForm('addOldPersonForm')">录入</el-button>
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

  export default {
    name: "addOldPerson",
    data(){
      return{
        addOldPersonForm:{
          username:'',
          gender:'',
          phone:'11111111111',
          id_card:'1111111111111111111111',
          birthday:'',
          checkin_date:'',
          room_number:'',
          firstguardian_name:'',
          firstguardian_relationship:'',
          firstguardian_phone:'',
          firstguardian_wechat:'',
          secondguardian_name:'',
          secondguardian_relationship:'',
          secondguardian_phone:'',
          secondguardian_wechat:'',
          health_state:'',
          DESCRIPTION:'',
          ISACTIVE:'',
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


          health_state: [
            {required: true, message: '请输入项健康状态', trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
      ...mapMutations(['setToken']),
      submitForm(addOldPersonForm){

        //为表单绑定验证功能
        let that = this;
        that.ChangeDate();//改变日期格式
        that.$refs[addOldPersonForm].validate((valid) => {
          if(valid){
            that.$message({
              title: "录入信息成功",
              message: "录入信息成功",
              type: 'success'
            });
            console.log(that.addOldPersonForm.birthday);
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
        let birthday = new Date(this.addOldPersonForm.birthday).toJSON().split('T')[0];
        this.addOldPersonForm.birthday=birthday;
        console.log(this.addOldPersonForm.birthday);
        console.log("----");
        //UTC时间格式.toJSON().split('T')[0]截取后格式：2019-10-14
        let checkin_date = new Date(this.addOldPersonForm.checkin_date).toJSON().split('T')[0];
        this.addOldPersonForm.checkin_date=checkin_date;
        console.log(this.addOldPersonForm.checkin_date);


        // // UTC时间格式转换——2019-10-14 12:20:12
        // let delayTime = new Date(this.addOldPersonForm.birthday).toJSON();
        // this.addOldPersonForm.birthday = new Date(
        //   +new Date(delayTime) + 8 * 3600 * 1000
        // )
        //   .toISOString()
        //   .replace(/T/g, " ")
        //   .replace(/\.[\d]{3}Z/, "");
        // console.log(this.addOldPersonForm.birthday);
      }
    }
  }
</script>

<style scoped>
.oddCard{
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
</style>