<template>
  <div id="app">
      <popup></popup>
       <confirm ></confirm>
      <top-header ></top-header>
     <transition>
      <router-view class="view"></router-view>
      </transition>
  </div>
</template>

<script> 
import popup from './components/popup.vue'
import header from './components/header.vue'
import confirm from './components/confirm.vue'
export default{
   data () {
    return {
      
    }
  },
    components:{
      'top-header': header,
      'popup': popup,//这里是全局提示的组件
      'confirm': confirm,
    },
  }
</script>

<style lang="css">
  html,body{
    //height: 100%;
  }
  .view{
    margin-top: 56px;
  }
</style>
