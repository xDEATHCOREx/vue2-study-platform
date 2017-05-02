<template>
<div>
 <video src="../../src/assets/test.mp4"  width="100%"  id = "container"  controls>Video player not available.</video>
</div>
</template>

<script>
	export default {
    data () {
      return {
        title:'videoCourse',

      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    methods:{
      
    },
    components:{
    },
  }
</script>

<style lang="css">

</style>
