<template>
<div class="learning-root">
 <mu-card>
  <mu-card-title :title="detail.resource.resourceName" subTitle="副标题"/>
  <mu-card-text v-html="formattedArticleText">
  </mu-card-text>
</mu-card>
  <floating-btn @openList="openList"></floating-btn>
<course-list :open="open" :courseId="detail.resource.courseId" @closeList="closeList"></course-list>
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
      this.getResourceDetail()
    },
    computed:{
      formattedArticleText () { 
        var replaceText = String(this.detail.resource.article).replace(/\n/g,'<br/>')//注意写法！
         return replaceText
       },
    },
    methods:{
      getResourceDetail(){
        //获取资源详细信息
        this.axios.get('/resource/detail.action?resourceId='+this.$route.query.resourceId)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.detail = res.data.object
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