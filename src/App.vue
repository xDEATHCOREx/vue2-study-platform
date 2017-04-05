<template>
  <div id="app" >
      <popup></popup>
       <confirm></confirm>
       <loading></loading>
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
import loading from './components/loading.vue'
export default{
   data () {
    return {
      
    }
  },
    components:{
      'top-header': header,//顶部条
      'popup': popup,//这里是全局提示的组件
      'confirm': confirm,
      'loading':loading,
    },
  }
</script>

<style lang="css">
  html,body{
  }
  .view{
    margin-top: 56px;
  }
</style>
