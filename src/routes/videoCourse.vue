<template>
<div class="learning-root" @click.once="playVideo">
<video  :src="detail.resource.resUrl"  type="video/mp4" width="100%" id = "video-player"  controls>播放器不可用，请更换浏览器重试。</video>
  <mu-card>

  <mu-card-title :title="detail.resource.resourceName" />
  <mu-divider />
  <mu-card-text>
    <p>课程简介</p>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
  </mu-card>
  <mu-divider />
  <floating-btn @openList="openList"></floating-btn>
  <course-list 
    :open="open" 
    :courseId="detail.resource.courseId" 
    @closeList="closeList">
  </course-list>
  <evaluate 
    :target="target" 
    :toOpenEvaluate="toOpenEvaluate" 
    :resourceId="detail.resourceId"
    :courseId="detail.resource.courseId"
    @closeEvaluate="closeEvaluate">
  </evaluate>

   <mu-raised-button 
    :disabled="!detail.judged" 
    label="重新评价" 
    class="demo-raised-button" 
    fullWidth 
    secondary
    @click="openEvaluate"/>

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
        title:'视频资源',
        open:false,
        toOpenEvaluate:false,
        target:'',
        detail:{
          "resourceId": "",
          "resource": {
           
            "resUrl": "",
            "resourceId": "",
            "resType": "",
            "resourceName": ""
          },
          "judged": ''
        },
      }
    },
    watch: {
      '$route':'getResourceDetail'
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //底部学习nav备用↓
      this.$store.commit('startLearning')

      eventHub.$emit('updateNav','video')
      //调用接口取得数据及是否已评价情况，if已评价
      //注意此行！！！
      this.$store.commit('resetEvaluated')

      this.getResourceDetail()
    },
    computed:mapState({
      evaluated:'evaluated',
       logIn:'logIn',//记录了vuex store中的登录态
    }),
    methods:{
      getResourceDetail(){
        //获取资源详细信息
        this.axios.get('/resource/detail.action?resourceId='+this.$route.query.resourceId)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.detail = res.data.object
            if(this.detail.judged){
              //调用接口取得数据及是否已评价情况，if已评价
              this.$store.commit('setEvaluated')
            }else{
              this.$store.commit('resetEvaluated')
            }
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })

        this.target='' //重置内部跳转的缓存
      },
      regetResourceDetail(tag){
        //获取资源详细信息
        this.axios.get('/resource/detail.action?resourceId='+tag)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.detail = res.data.object
            if(this.detail.judged){
              //调用接口取得数据及是否已评价情况，if已评价
              this.$store.commit('setEvaluated')
            }else{
              this.$store.commit('resetEvaluated')
            }
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
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
      },
      playVideo(){
        let video = document.getElementById('video-player')
        console.warn("play video!")
        video.play()
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
        this.open = false  //重要！！关闭选择资源的dialog
        console.warn("evaluated:",this.evaluated)   
        next()
      }else{  
        if(this.logIn){//这里检查登录状态若已登录才弹出评价！
          this.open = false //重要！！关闭选择资源的dialog
          if(to.path=='/detail'){//判断是初次评价却返回到详情页逻辑
             this.target =  {
              path : 'detail',
              query:{id: this.detail.resource.courseId}
           }
          }else{
            this.target = {
                path : to.path,
                query:{resourceId:to.query.resourceId}
             }
          }
          this.openEvaluate()//这里带上评价后的目的路由及参数？
          next(false)
           console.warn("evaluated:",this.evaluated)   
        }else{
          next()
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
      if(this.evaluated){  
        this.open = false  //重要！！关闭选择资源的dialog
        console.warn("evaluated:",this.evaluated)   
        next()
      }else{  
        if(this.logIn){//这里检查登录状态若已登录才弹出评价！
          this.open = false //重要！！关闭选择资源的dialog
          this.target = {
              path : to.path,
              query:{resourceId:to.query.resourceId}
           }
          this.openEvaluate()//这里带上评价后的目的路由及参数？
          next(false)
           console.warn("evaluated:",this.evaluated)   
        }else{
          next()
        }
      }
    },
  }
</script>

<style lang="css" scoped>
.demo-raised-button{
  position: fixed;
  bottom: 0px;
}
</style>
