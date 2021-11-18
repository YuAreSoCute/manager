<template>
  <div class="app-container">
        <!-- 4模块开始 -->
          <div class="shop_new">
              <div class="shop_new_son" v-for="(item,id) in list" :key="item.id" @click="handClicks(item.id)">
                <div class="new_item_conter">
                 <img :src="item.img" alt="">
                  <div></div>
                  <div>
                     {{item.title}}
                    <span>{{item.number}}</span>
                     </div>
                </div>
                
              </div>
          </div>
        <!-- 4模块结束 -->

  </div>  
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.6.0",
      list:[
        {
          id:1,
          img:require("@/assets/images/s1.png"),
          title:"新订单",
          number:'25',
        },
        {
          id:2,
          img:require("@/assets/images/s2.png"),
          title:"已汇款",
          number:'7',
        },
        {
          id:3,
          img:require("@/assets/images/s3.png"),
          title:"缴费中",
          number:'18',
        },
        {
          id:4,
          img:require("@/assets/images/s4.png"),
          title:"已完成",
          number:'693',
        }
      ],
        
      
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    // 订单管理路由
    handClicks(id){
      console.log(id);
       if(id == 1){
         this.$router.push("system/post")
       }else if(id == 2){
          this.$router.push("system/menu")
       }else if(id == 3){
          this.$router.push('system/dept')
       }else{
          this.$router.push('system/config')
       }

    }
  },
};
</script>

<style scoped lang="scss">

body{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
    .shop_new{
       display: flex;
       margin: 3%;
       justify-content: space-between;
       flex-wrap: wrap;
       width: 88%;
       height: 100%;
    }

    .shop_new_son{
      cursor: pointer;
      width: 230px;
      height: 140px;
      // background-color: red;
      border: 1px solid rgba(153, 153, 153, 0.2);
      box-shadow: rgba(153, 153, 153, 0.3) 0px 0px 10px 2px;
      border-radius: 10px 10px;
      margin-bottom: 40px;
      position: relative;
      
      .new_item_conter{
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        img{
          float: left;
        }
        div:nth-child(2){
          width: 2px;
          height: 62px;
          background-color: #fff;
          float: left;
          margin-left: 20px;

        }
          div:nth-child(3){
            height: 62px;
             float: left;
             color: #ffffff;
             font-family: "Arial";
             margin-left: 20px;
            span{
              margin-top: 5px;
              font-size: 40px;
              display: block;
            } 

          }
      }
    }
    .shop_new_son:nth-child(1){
      background-color: #43A0F8;
    }
    .shop_new_son:nth-child(2){
      background-color: #6AD3FF;
    }
    .shop_new_son:nth-child(3){
      background-color: #76D8E8;
    }
    .shop_new_son:nth-child(4){
      background-color: #9DD0C6;
    }
    




</style>

