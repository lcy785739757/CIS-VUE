<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >老年人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item >老人列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域  -->
    <el-card class="oddCard">
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
      <el-table :data="oddPersonList">
        <el-table-column label="姓名" prop="username"  align="center"></el-table-column>
        <el-table-column label="姓别" prop="gender"  align="center"></el-table-column>
        <el-table-column label="电话" prop="phone"  align="center"></el-table-column>
        <el-table-column label="身份证号" prop="id_card" align="center"></el-table-column>
        <el-table-column label="入院日期" prop="checkin_date"  align="center"></el-table-column>
        <el-table-column label="详细信息"   align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-zoom-in"

            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-upload2"
              class="red"
            >加入</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
  export default {
    name: "queryOddPerson",
    data(){
      return{
        // 获取用户列表参数对象
        queryInfo:{
          query:'',
          pageNum:1,
          pageSize:2
        },
        oddPersonList:[
          {
            ID:'11',
            username:'aaa',
            gender:'男',
            phone:'110',
            id_card:'110',
            checkin_date:'2020-6-29'
          }
        ],
        total:0
      }
    },
    created() {
      this.getOddPerson()
    },
    methods:{
      getOddPerson(){

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
  }
</style>