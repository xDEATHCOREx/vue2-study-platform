<template>
  <div id="app">
      <top-header ></top-header>
      <router-view></router-view>
  </div>
</template>

<script> 
import header from './components/header.vue'
export default{
   data () {
    return {
      
    }
  },
    components:{
      'top-header': header,
    },
  }
</script>

<style lang="scss">

</style>
