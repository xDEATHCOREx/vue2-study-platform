<template>
<div>
 <mu-card>
   <mu-card-media class="title-pic" :title="detail.course.courseName" subTitle="副标题">
    <img :src="detail.course.coursePic"  />

     <star-btn 
      :isStarred="detail.starred" 
      :courseId="detail.courseId" 
      class="star-btn">
     </star-btn>

  </mu-card-media>
  <mu-card-text>
    <p>课程简介</p>
    {{detail.course.courseDesc}}
  </mu-card-text>
</mu-card>

 <mu-list>
  <mu-sub-header>请选择学习资源：</mu-sub-header>
  <mu-divider/>
    <mu-list-item v-for="(item,index) in resourceList"
      :title="item.resource.resourceName" 
      :to="{path:getResourceType(item.resource.resType),query:{resourceId:item.resourceId}}">
      <mu-icon slot="left" :value="getResourceIcon(item.resource.resType)"/>
    </mu-list-item>
     <mu-divider/>
  </mu-list>

</div>

</template>

<script>
import {mapState} from 'vuex'
import starBtn from './starBtn.vue'
	export default {
    data () {
      return {
      	
        title:'简介',
         star:'unstar',
         detail:{
            courseId: "",
            course: {
              courseId: "",
              courseName: "",
              coursePic: "http://18-newbee.top/img/course/20170504/6226A5E2404147E3878B32C01E91AB14.jpg",
              courseDesc: ""
            },
            starred: ''
          },
          resourceList:'',
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.getCourseDetail()//获取课程详情
      this.getResourceList()//获取学习资源列表
    },
    computed:{
      ...mapState({
        logIn:'logIn',//记录了登录态    
        userId:'userId',
      })
    },
    methods:{
      getResourceIcon(tag){
        switch(tag){
          case '1':
            return 'subscriptions'
          case '2':
            return 'image'
          case '3':
            return 'edit'
        }
      },
      getResourceType(tag){
        switch(tag){
          case '1':
            return '/video'
          case '2':
            return '/picture'
          case '3':
            return '/article'
        }
      },
      getCourseDetail(){
        //获取课程详细信息
        this.axios.get('/course/detail.action?courseId='+this.$route.query.id)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.detail = res.data.object
          }else{

          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
      getResourceList(){
        //获取课程资源列表
        this.axios.get('/resource/list.action?courseId='+this.$route.query.id)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.resourceList = res.data.object
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })
      }
    },
    components:{
      'star-btn':starBtn 
    },
  }
</script>

<style lang="css" scoped>
.title-pic{
  position: relative;
}
.star-btn{
    position: absolute;
    bottom: 20px;
    right: 5px;
    z-index: 2017;

}
</style>
