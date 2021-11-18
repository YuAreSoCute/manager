
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="10">
        <div class="title_top">近五年专利申请量</div>
      </el-col>
      <el-col :span="10">
          <div class="title_top" style="margin-left:70px;">逐年专利申请量</div>
      </el-col>
    </el-row>
<el-row :gutter="24">
    <!-- <div>近五年专利申请量</div> -->
    <el-col :span="10" class="title_col">
    <el-card shadow="always" style="position: relative;">
    <div id="myChart" :style="{width: '100%', height: '320px'}" class="echar_left"></div>
    </el-card>
    </el-col>
 <!-- <div>近五年专利申请量</div> -->
    <el-col :span="10" class="title_col">
    <el-card shadow="always">
    <!-- <div id="myChart" :style="{width: '100%', height: '320px'}" class="echar_left"></div> -->
    <div id="main" :style="{width: '100%', height: '320px'}"></div>
    </el-card>
    </el-col>

</el-row>
  </div>
</template>

<script>
import { listApplyType, getApplyType, delApplyType, addApplyType, updateApplyType, exportApplyType } from "@/api/manager/applyType";
import { getCache } from "@/api/monitor/cache";
import echarts from "echarts";

export default {
  name: "ApplyType",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created() {

  },
  mounted(){
    this.drawLine();
    this.drawZine();
  },
  methods: {
       drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            // title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["2017年","2018年","2019年","2020年","2021年",]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [810, 200, 400, 600, 800, 1000, 1200]
            }]
        });
    },
    drawZine(){
     var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {},
       itemStyle:{
    normal:{
        color:'#ABE5EF'    // 设置图形的颜色
    }
},    
    },
     
  ]
};

option && myChart.setOption(option);
    }

  },
};
</script>
<style scoped lang="scss">
.title_top{
    color: #918d8d;
    margin-left: 25px;
}
  .echar_left{
    margin-left: 10%;
    // margin: 0 auto;
    align-content: center;
   
  }
  .title_col{
    margin: 20px;
    
  }
</style>
