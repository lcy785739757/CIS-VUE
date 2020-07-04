<template>
  <div>
    <!--   面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >老人数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" ref="oldPerData" style="width: 800px;height:400px;"></div>
    </el-card>
    <!--    <el-divider content-position="left"></el-divider>-->
    <el-card>
      <div id="piemain" style="width: 700px;height:400px;"></div>
    </el-card>
    <el-card>
      <div id="healthmain" style="width: 700px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
  import Schart from 'vue-schart';
  import {OldPer} from "../../api";
  import echarts from 'echarts'
  var echart = require('echarts');

  export default {
    name: 'OldPer',
    components: {
      echarts
    },
    data() {
      return {
        oldPerData:{},
        // EmployInfoAllDrawer: false,
        AllOldPerList:[
          {
            totalNumber: "",
            numberOfL1: "",
            numberOfL2: "",
            numberOfL3: "",
            numberOfFe: "",
            numberOfMa: "",
            numberOfA: "",
            numberOfB: "",
            numberOfC: "",
            numberOfD: ""
          }]
      };
    },
    created() {
      this.getOldPerData()
    },
    methods:{
      getOldPerData(){
        let that = this;
        let params = JSON.stringify(that.info);
        OldPer(params)
                .then(res =>{
                  console.log('-----------获取信息---------------')
                  console.log(res)
                  console.log(res.numberOfFe)
                  if (res.code == 1) {
                    console.log('-----------VolunteerInfo---------------')
                    that.AllOldPerList=res;
                    console.log('-----------VolunteerInfo---------------')
                    // that.AllEmployList=res.data;
                    console.log(res.numberOfFe);
                    let myChart1 = echarts.init(document.getElementById('main'))
                    let myChart2 = echarts.init(document.getElementById('piemain'))
                    let myChart3 = echarts.init(document.getElementById('healthmain'))
                    console.log("111111111111111111111")
                    let ageList= new Array();
                    let healthList = new Array();
                    // let healthList = new Array();
                    ageList[0]=res.numberOfL1;
                    ageList[1]=res.numberOfL2;
                    ageList[2]=res.numberOfL3;
                    healthList[0] = res.numberOfA;
                    healthList[1] = res.numberOfB;
                    healthList[2] = res.numberOfC;
                    healthList[3] = res.numberOfD;

                    console.log("ageList: "+ageList);
                    console.log("healthList: "+healthList);
                    // console.log(res)
                    let option1 ={
                      color: ['#2FA2F2'],
                      tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                          type : 'shadow'
                        }
                      },
                      title:{
                        text:'健康状况分布',
                        x:'center'
                      },
                      xAxis : [
                        {
                          type : 'category',
                          data : ['心脏病','糖尿病','高血压','高血脂'],
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
                          name:'人数',
                          type:'bar',
                          data:healthList
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
                        data : ['60岁以下',"60岁-70岁","70岁及以上"],
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
                    myChart3.setOption(option1);
                    //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                    window.addEventListener('resize',function() {myChart1.resize()});
                    window.addEventListener('resize',function() {myChart2.resize()});
                    window.addEventListener('resize',function() {myChart3.resize()});

                  }else {
                    _this.notify('错误', 'error')
                  }
                }).catch(failResponse => {})
      }

    }


  };
</script>

<style scoped>
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
  #healthmain{
    width: 50%;
    height: 500px;
    /*border: 1px solid red;*/
    margin: 0 auto;
  }

</style>
