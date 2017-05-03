<template>
<div class="learning-root">
 <video src="http://18-newbee.top/media/video/java/movie.mp4"  width="100%" id = "container"  controls>Video player not available.</video>
  <mu-card>

  <mu-card-title title="课程标题" subTitle="其他信息"/>
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
<floating-btn @openList="openList"></floating-btn>
<course-list :open="open" @closeList="closeList"></course-list>
<evaluate :target="target" :toOpenEvaluate="toOpenEvaluate"  @closeEvaluate="closeEvaluate"></evaluate>
</div>
</template>

<script>
import {eventHub} from '../components/Event-hub.js'
import {mapState} from 'vuex'
import floatingBtn from '../components/floatingBtn.vue'
import courseList from '../components/courseList.vue'
import evaluate from '../components/evaluate.vue'
	export default {
    data () {
      return {
        title:'videoCourse',
        open:false,
        toOpenEvaluate:false,
        target:''
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //底部学习nav备用↓
      this.$store.commit('startLearning')
      eventHub.$emit('updateNav','video')
      //调用接口取得数据及是否已评价情况，if已评价
      //this.$store.commit('setEvaluated')
      this.$store.commit('resetEvaluated')
    },
    computed:mapState({
      evaluated:'evaluated',
    }),
    methods:{
      openList(){
        this.open = true
      },
       closeList(){
        this.open = false
      },
      openEvaluate(){
        this.toOpenEvaluate = true
      },
      closeEvaluate(){
        this.toOpenEvaluate =false
      }
    },
    components:{
      'floating-btn':floatingBtn,
      'course-list':courseList,
      'evaluate':evaluate,
    },
     beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
      this.$store.commit('endLearning')
      if(this.evaluated){  
        console.warn("evaluated:",this.evaluated)   
        next()
      }else{
        this.openEvaluate()//这里带上评价后的目的路由及参数？
        next(false)
         console.warn("evaluated:",this.evaluated)  
         this.target = {
            path : '/picture',
            query:{}
         }
       
        
      }
    },
  }
</script>

<style lang="css">

</style>
