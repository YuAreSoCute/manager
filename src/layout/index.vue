<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
   <!-- 公共头部开始 -->
   <div class="login_top_conter">
     <img src="~@/assets/images/logTop.png" alt="">
     <!-- <h3 id="TitleTxt">尚谷 (天津) 科技有限公司</h3> -->
     <div class="xaImg">
       <img src="@/assets/images/xa.png" alt="" class="top_imgs">
        <img src="~@/assets/images/wenzi.png" alt="" class="top_banner">
     </div>
   </div>
   <!-- 公共头部结束 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <!-- 左边导航栏开始 -->
    <sidebar class="sidebar-container" style="background-color:red;" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }" />
    <!-- 左边导航栏结束 -->
    <!--  -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .login_top_conter{
    z-index: 1;
    position: fixed;
    background: #5989db;
    box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
    width: 100%;
    top: 0;
    left: 0;
    height: 85px;
    overflow: hidden;
  }
  .login_top_conter>img{
    margin-left: 8%;
    // margin-top: 10px;
    max-width: 230px;
    max-height: 77px;
  }
  #TitleTxt{
    color: whitesmoke;
    display: inline-block;
    position: relative;
    margin-left: 40px;
  }

 .login_top_conter .xaImg{
   margin-top: 2px;
   display: inline-block;
   float: right;
   margin-right: 150px;
   .top_imgs{
   width: 130px;
   height: 205px;
 }
 .top_banner{
   display: inline-block;
   width: 230px;
   height: 41px;
   float: right;
   margin-top: 30px;
 }
 }
</style>
