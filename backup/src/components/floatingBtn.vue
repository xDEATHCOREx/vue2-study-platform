<template>
<div>
  <mu-float-button icon="add" mini class="demo-float-button" @click="toOpen"/>
</div>
</template>
<script>
	export default {
    data () {
      return {
      

      }
    },
    mounted(){

    },
    methods:{
      toOpen(){
      	this.$emit('openList')
      }
    },
    components:{
    },
     
  }
</script>
<style lang="css" scoped>
  .demo-float-button {
    position: fixed;
    bottom: 145px;
    right: 10px;
    z-index: 2017;
  }
</style>