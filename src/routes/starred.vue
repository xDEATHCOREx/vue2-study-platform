<template>
<div>

 <mu-tabs :value="activeTab" @change="handleTabChange">
  <mu-tab value="tab1" icon="help" title="QUESTIONS" />
  <mu-tab value="tab2" icon="library_books" title="COURSES"/>
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
    <router-link class="link" v-for="n in 6" :to="{path:'/detail'}">
   <mu-card class="course-item" >
   <mu-card-media >
    <img :src="imgSrc" />
  </mu-card-media>
    <mu-card-header class="wrapper" :title="title" subTitle="sub title">
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
      this.axios.get('/collection/summary/2')
        .then(res=>{
          console.warn(res)
          if(res.data.success){
            this.questionList = res.data.object 
          }else{

          }
        })
        .catch(err=> {
          console.log(err)

        })
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val
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
