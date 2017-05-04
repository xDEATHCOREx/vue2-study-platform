<template>
<div>

 <mu-tabs :value="activeTab" @change="handleTabChange">
  <mu-tab class="starred-tab" value="tab1" icon="help" title="QUESTIONS" @click.once="getStarred(2)"/>
  <mu-tab class="starred-tab" value="tab2" icon="library_books" title="COURSES" @click.once="getStarred(1)"/>
</mu-tabs>
<div v-if="activeTab === 'tab1'">
    <router-link class="link" v-for="(item,index) in questionList" :to="{path:'/question',query:{id:item.titleId}}">
   <mu-card class="question-item" >
    <mu-card-header class="wrapper" :title="item.communityTitle" :subTitle="item.communityAsk.askNickName">
       <mu-paper class="demo-paper" :zDepth="2">
              <small>{{item.answerCount}}</small><br/>
              <small>回答</small>
            </mu-paper>  
      <p class="collect-time">{{item.communityAsk.communityAsktime}}</p>
    </mu-card-header>
   </mu-card>
   </router-link>
  </div>
  <div v-if="activeTab === 'tab2'" class="tab2">
    <router-link class="link" v-for="(item,index) in courseList" :to="{path:'/detail',query:{id:item.courseId}}">
   <mu-card class="course-item" >
   <mu-card-media >
    <img :src="item.course.coursePic" />
  </mu-card-media>
    <mu-card-header class="wrapper"  >
      <span>{{item.course.courseName}}</span>
    </mu-card-header>
   </mu-card>
   </router-link>
  </div>
</div>

</template>

<script>
	export default {
    data () {
      return {
        activeTab: 'tab1',//可设置默认tab
        title:'Starred',
        n:'1',
        imgSrc:'http://18-newbee.top/dist/image/a1.jpg',
        questionList:[],
        courseList:[],
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //接下来应该从接口取得收藏过的问题/课程列表，然后渲染
      document.getElementsByClassName('starred-tab')[0].click()
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val
      },
      getStarred(type){
         this.axios.get('/collection/summary/'+type)
        .then(res =>{
          if(res.data.success){
            switch (type){
              case 1 :
                this.courseList = res.data.object
                break
              case 2 :
                this.questionList = res.data.object 
                break
            }
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
      confirm(info,title,event,jumpTo){
      this.$store.commit('dialogToggle',{
        info : info,
        title : title,
        event : event,
        jumpTo : jumpTo
      })
      console.warn(event,"test")
    },
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.question-item{
    margin: 15px auto;
    width: 95%;
  }
.course-item{
    width: 48%;
    display: inline-block;
    margin: 1%;
}
.wrapper{
  position: relative;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  color: #000;
}
.collect-time{
  display: inline-block;
  position: absolute;
  bottom: 16px;
    margin: 0;
  right: 60px;
  font-size: 10px;
  -webkit-transform : scale(0.84,0.84) ;/*试用*/
  -ms-transform: scale(0.84,0.84) ;
  -moz-transform: scale(0.84,0.84) ;
  -o-transform: scale(0.84,0.84) ;
  transform: scale(0.84,0.84) ;
}
.header {
    padding-right: 29px;
}
 .demo-paper {
    position: absolute;
    right: 10px;
    height: 43px;
    width: 40px;
    margin: 2px;
    top: 50%;
    transform: translate(0%,-50%);
    text-align: center;
    color: #7e57c2;
    background-color: #d1c4e9;
}
</style>
