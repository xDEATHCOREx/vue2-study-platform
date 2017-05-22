<template>
<div>
    <div class="learning-root article-root">
       <mu-card>
        <mu-card-title :title="detail.resource.resourceName" subTitle="副标题"/>
        <mu-card-text v-html="formattedArticleText">
        </mu-card-text>
      </mu-card>
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
    </div>
    <mu-raised-button 
    v-if="detail.judged" 
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
        title:'文字资源',
        open:false,
        toOpenEvaluate:false,
        target:'',
        detail:{
          "resourceId": "",
          "resource": {
            "courseId": "",
            "article": "",
            "resourceId": "",
            "resType": "",
            "resourceName": ""
          },
          "judged": ''
        },
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.$store.commit('startLearning')

      eventHub.$emit('updateNav','article')

      this.$store.commit('resetEvaluated')

      this.getResourceDetail()
    },
    computed:{
      formattedArticleText () { 
        var replaceText = String(this.detail.resource.article).replace(/\n/g,'<br/>')//注意写法！
         return replaceText
       },
       ...mapState({
        evaluated:'evaluated',
        logIn:'logIn',//记录了vuex store中的登录态
      })
    },
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
  z-index: 9999;
}
.article-root{
      overflow: auto;
      -webkit-overflow-scrolling: touch;/* 这里btn和root是同一个层级，不然会发生btn被遮盖的情况 */
      position: relative;
      height: 100%;
}
</style>