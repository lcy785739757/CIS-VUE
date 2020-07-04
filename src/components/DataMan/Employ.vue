<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >工作人员数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" ref="employeeData" style="width: 800px;height:400px;"></div>
    </el-card>
<!--    <el-divider content-position="left"></el-divider>-->
    <el-card>
      <div id="piemain" style="width: 700px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
  import Schart from 'vue-schart';
  import {Employ} from "../../api";
  import echarts from 'echarts'
  var echart = require('echarts');

  export default {
    name: 'Employ',
    components: {
      echarts
    },
    data() {
      return {
        employData:{},
        // EmployInfoAllDrawer: false,
        AllEmployList:[
          {
            totalNumber: "",
            numberOfL1: "",
            numberOfL2: "",
            numberOfL3: "",
            numberOfFe: "",
            numberOfMa: ""
          }]
      };
    },
    created() {
      this.getEmployeeData()
    },
    // watch:{
    //   employData(){
    //     this.getEmployeeData()
    //   }
    // },
    methods:{
      getEmployeeData(){
        // let myChart1= document.getElementById("main");
        let that = this;
        let params = JSON.stringify(that.info);
        Employ(params)
                .then(res =>{
                  console.log('-----------获取信息---------------')
                  console.log(res)
                  console.log(res.numberOfFe)
                  if (res.code == 1) {

                    console.log('-----------EmployInfo---------------')
                    that.AllEmployList=res.data;
                    // console.log(that.AllEmployList);
                    console.log('-----------EmployInfo---------------')
                    that.employData={ageData1:res.numberOfL1,
                      ageData2:res.numberOfL2,ageData3:res.numberOfL3,
                      sexData1:res.numberOfMa,sexData2:res.numberOfFe};
                    // that.AllEmployList=res.data;
                    console.log(res.numberOfFe);
                    let myChart1 = echarts.init(document.getElementById('main'))
                    let myChart2 = echarts.init(document.getElementById('piemain'))
                    console.log("111111111111111111111")
                    let ageList= new Array();
                    // let healthList = new Array();
                    ageList[0]=res.numberOfL1;
                    ageList[1]=res.numberOfL2;
                    ageList[2]=res.numberOfL3;

                    console.log("ageList: "+ageList);

                    console.log(res)
                    let option1 ={
                      color: ['#f44'],
                      tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                          type : 'shadow'
                        }
                      },
                      title:{
                        text:'年龄分布',
                        x:'center'
                      },
                      xAxis : [
                        {
                          type : 'category',
                          data : ['30',"30-40","40"],
                          axisTick: {
                            alignWithLabel: true
                          }
                        }
                      ],
                      yAxis : [
                        {
                          type : 'value'
                        }
                      ],
                      series : [
                        {
                          name:'年龄',
                          type:'bar',
                          data:ageList
                        }
                      ]
                    };
                    let mytextStyle = {
                      color: "#333",
                      fontSize: 18,
                    };
                    let mylabel = {
                      show: true,
                      position: "right",
                      offset: [30, 40],
                      formatter: '{b} : {c} ({d}%)',
                      textStyle: mytextStyle
                    };
                    let option2 ={
                      title:{
                        text:'性别分布',
                        x:'center'
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                      },
                      legend: {
                        data: ['男', '女'],
                        left:"center",
                        top:"bottom",
                        orient:"horizontal",
                      },
                      series: [
                        {
                          name: '性别',
                          type: 'pie',
                          radius: ['50%', '70%'],
                          center: ['50%', '50%'],
                          data: [
                            {value: res.numberOfMa, name: '男'},
                            {value: res.numberOfFe, name: '女'}
                          ],
                          animationEasing: 'cubicInOut',
                          animationDuration: 2600,
                          label: {
                            emphasis: mylabel
                          }
                        }
                      ]

                    };
                    let option3 = {
                      title:{
                        text:'年龄分布',
                        x:'center'
                      },
                      xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data : ['30岁以下',"30岁-40岁","40岁及以上"],
                      },
                      yAxis: {
                        type: 'value',
                        boundaryGap: [0, '30%']
                      },
                      visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: 0
                      },
                      series: [
                        {
                          type: 'line',
                          // smooth: 0.6,
                          symbol: 'none',
                          lineStyle: {
                            color: 'blue',
                            width: 2
                          },
                          markLine: {
                            symbol: ['none', 'none'],
                            label: { show: true }
                          },
                          data: ageList    // [[], []]
                        }
                      ]
                    }
                    myChart1.setOption(option3);
                    myChart2.setOption(option2);
                    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                    window.addEventListener('resize',function() {myChart1.resize()});
                    window.addEventListener('resize',function() {myChart2.resize()});

                  }else {
                    _this.notify('错误', 'error')
                  }
                }).catch(failResponse => {})
      },
      drawChart1(){
        let myChart1 = echarts.init(document.getElementById('main'))
        console.log("111111111111111111111")
        console.log(res+"-------------")
        myChart1.setOption({
          xAxis:{
            data:['30',"30-40","40"]
          },
          series:[
            {
              name:'30',
              data:res.numberOfL1
            },
            {
              name:'30-40',
              data:res.numberOfL2
            },
            {
              name:'40',
              data:res.numberOfL3
            },
          ]
        })
      }

    }


  };
</script>

<style scoped>
  .schart-box {
    display: inline-block;
    margin: 20px;
  }
  .schart {
    width: 600px;
    height: 400px;
    margin-left: 200px;
    margin-top: 20px;
  }
  .content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  #main{
    width: 50%;
    height: 500px;
    /*border: 1px solid red;*/
    margin: 0 auto;
  }
  #piemain{
    width: 50%;
    height: 500px;
    /*border: 1px solid red;*/
    margin: 0 auto;
  }

</style>
