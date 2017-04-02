<template>
<div>
 <video src="../../src/assets/test.mp4"  width="100%" height="100%"  id = "container"  controls>Video player not available.</video>
  <mu-sub-header>阳光</mu-sub-header>
  <mu-content-block>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-content-block>
   <mu-divider />
</div>

</template>

<script>
	export default {
    data () {
      return {
      	
        title:'Detail',

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
