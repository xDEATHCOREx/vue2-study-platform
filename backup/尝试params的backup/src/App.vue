<template>

  <div id="app" >
      <popup></popup>
       <confirm></confirm>
       <loading></loading>
      <top-header></top-header>
<!--      <keep-alive include="picture"></keep-alive> -->
      <transition name="router-view" mode="out-in">
        <router-view class="view"></router-view>
      </transition>

      <!-- <bottom-nav v-show="isLearning"></bottom-nav> -->
  </div>
</template>

<script> 
import {mapState} from 'vuex'
import popup from './components/popup.vue'
import header from './components/header.vue'
import confirm from './components/confirm.vue'
import loading from './components/loading.vue'
//import bottomNav from './components/bottomNav.vue'
export default{
   data () {
    return {
      
    }
  },
  computed:mapState({
     isLearning:'isLearning'
    }),
    components:{
      'top-header': header,//顶部条
      'popup': popup,//这里是全局提示的组件
      'confirm': confirm,
      'loading':loading,
     // 'bottom-nav':bottomNav,
    },
  }
</script>

<style lang="css">
  html,body{
  } 
  .view{
    height: 100%;

  }
  /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.router-view-enter-active, .router-view-leave-active {
  transition: opacity .15s ease;
}
.router-view-enter, .router-view-leave-active {
  opacity: 0;
}
</style>
