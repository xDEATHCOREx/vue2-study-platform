<template>
<div>
 <video src="http://18-newbee.top/media/video/java/movie.mp4"  width="100%" id = "container"  controls>Video player not available.</video>
  <mu-card>

  <mu-card-title title="Title" subTitle="课程章节"/>
  <mu-divider />
  <mu-card-text>
    <p>课程简介</p>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
  <mu-card-actions>
    <mu-flat-button label="Action 1"/>
    <mu-flat-button label="Action 2"/>
  </mu-card-actions>
</mu-card>
   <mu-divider />
   <img src="http://18-newbee.top/src/dist/a1.jpg?696e24d72681c4447f221c2ef9dfc8bb" alt="test1">
   <img src="http://18-newbee.top/src/dist/a2.jpg" alt="test2">
   <img src="http://18-newbee.top/src/dist/a3.jpg" alt="test3">
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
