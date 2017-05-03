<template>
<div class="learning-root">
 <mu-card>
  <mu-card-title title="Content Title" subTitle="Content Title"/>
  <mu-card-text>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    <br/>调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    <br/>似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    <br/>找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    <br/>调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    <br/>似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    <br/>找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    <br/>调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    <br/>似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    <br/>找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    <br/>调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    <br/>似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    <br/>找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
</mu-card>
  <floating-btn @openList="openList"></floating-btn>
<course-list :open="open" @closeList="closeList"></course-list>
</div>
</template>

<script>
import {eventHub} from '../components/Event-hub.js'
import floatingBtn from '../components/floatingBtn.vue'
import courseList from '../components/courseList.vue'
	export default {
    data () {
      return {
        title:'articleCourse',
        open:false,
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.$store.commit('startLearning')
      eventHub.$emit('updateNav','article')
    },
    methods:{
       openList(){
        this.open = true
      },
       closeList(){
        this.open = false
      },
    },
   components:{
      'floating-btn':floatingBtn,
      'course-list':courseList,
    },
     beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
        this.$store.commit('endLearning')
        next()
    },
  }
</script>

<style lang="css">

</style>