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
        <el-table-column label="姓别" prop="gender"  align="center"></el-table-column>
        <el-table-column label="电话" prop="phone"  align="center"></el-table-column>
        <el-table-column label="身份证号" prop="id_card" align="center"></el-table-column>
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
          <h3 class="register-title" style="margin-left:360px;margin-top: 10px;font-size: 30px">义工信息管理</h3>
          <el-form ref="form" :rules="rulesForm" :model="form" label-width="90px" >
            <el-row>
              <el-col :span="7">
                <el-form-item label="ID" prop="id">
                  <el-input style="width: 100px" v-model="form.id" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="姓名" prop="name">
                  <el-input style="width: 100px" v-model="form.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7 ">
                <el-form-item label="性别" prop="gender" >
                  <el-input style="width: 100px" v-model="form.gender" disabled></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="电话号码" prop="phone">
                  <el-input style="width: 150px" v-model="form.phone" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="身份证号" prop="id_card" >
                  <el-input style="width: 250px" v-model="form.id_card" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
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
                      :disabled="!isEdit">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="备注" prop="DESCRIPTION" >
                  <el-input style="width: 200px" v-model="form.description" :disabled="!isEdit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="5">
                <el-form-item>
                  <el-button v-if="!isEdit" @click="isEdit = true" style="width: 100px; margin-left: 400px" >编 辑</el-button>
                  <el-button v-else @click="cancelEdit"  style="width: 100px; margin-left: 400px">取消编辑</el-button>

                </el-form-item>
              </el-col>


              <el-col :span="5">
                <el-form-item>
                  <el-button type="primary" v-on:click="SaveVolunteerEdit('form')" style="width: 100px; margin-left: 400px" >保 存</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </el-drawer>

    </body>


  </div>
</template>

<script>
  import {editVolunteer,  queryVolunteer,  removeVolunteer} from "../../api";

  export default {
    name: "queryVolunteer",

    data(){
      return{
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
    created() {
      this.getVolunteer()
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
      }
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
    margin-left: 250px;
    margin-right: 250px;
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

</style>