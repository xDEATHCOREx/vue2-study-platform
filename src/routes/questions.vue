<template>
<div class="questions-root">
<!-- {{newestList}}
{{hottestList}}
{{myList}} -->
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab class="tab1" value="tab1" title="Newest" @click.once="getQuestions(1)"/>
    <mu-tab class="tab2" value="tab2" title="Hottest" @click.once="getQuestions(2)"/>
    <mu-tab class="tab3" value="tab3" title="Mine" @click.once="getQuestions(3)"/>
  </mu-tabs>

  <div v-if="activeTab === 'tab1'" class="container">
     <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <mu-list>
      <div v-for="(item,index) in newestList" class="item-wrapper">
        <router-link class="link" :to="{path:'/question',query:{id:item.titleId}}">
          <mu-list-item   :title="item.communityTitle"  titleClass="title" class="item">
            <p class="date-time sub-info">{{item.communityAsk.communityAsktime}}</p>
            <p class="chapter sub-info">{{item.communityAsk.askNickName}}</p>
           </mu-list-item>
         </router-link>
         <mu-paper class="demo-paper" :zDepth="2">
              <small>{{item.answerCount}}</small><br/>
              <small>回答</small>
            </mu-paper>   
      <mu-divider/>
      </div>
  </mu-list>
  </div>
  <div v-if="activeTab === 'tab2'" class="container">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <mu-list>
      <div v-for="(item,index) in hottestList" class="item-wrapper">
        <router-link class="link" :to="{path:'/question',query:{id:item.titleId}}">
          <mu-list-item :title="item.communityTitle"  titleClass="title" class="item">
            <p class="date-time sub-info">{{item.communityAsk.communityAsktime}}</p>
            <p class="chapter sub-info">{{item.communityAsk.askNickName}}</p>
           </mu-list-item>
         </router-link>
         <mu-paper class="demo-paper" :zDepth="2">
              <small>{{item.answerCount}}</small><br/>
              <small>回答</small>
            </mu-paper>   
      <mu-divider/>
      </div>
  </mu-list>
  </div>
  <div v-if="activeTab === 'tab3'" class="container">
    <mu-list>
      <div v-for="(item,index) in myList" class="item-wrapper">
        <router-link class="link" :to="{path:'/question',query:{id:item.titleId}}">
          <mu-list-item  :title="item.communityTitle"  titleClass="title" class="item">
            <p class="date-time sub-info">{{item.communityAsk.communityAsktime}}</p>
            <p class="chapter sub-info">{{item.communityAsk.askNickName}}</p>
           </mu-list-item>
         </router-link>
         <mu-paper class="demo-paper" :zDepth="2">
              <small>{{item.answerCount}}</small><br/>
              <small>回答</small>
            </mu-paper>   
      <mu-divider/>
      </div>
  </mu-list>
  </div>
<mu-raised-button 
  label="Ask something" 
  class="demo-raised-button ask-btn" 
  touch="true" 
  secondary 
  fullWidth 
  @click.native="jumpToAsk"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
import questionList from '../assets/json/questionList.json'
export default {
  data () {
    return {
       refreshing: false,
      trigger: null,
       title:'Questions',
        activeTab: 'tab1',
        timestamp:1492584214,
        list:[],
        newestList:[],
        hottestList:[],
        myList:[]
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.trigger = this.$el
      this.list = questionList.res.list//测试用例
      if(this.$route.query.target=='tab3'){
        this.activeTab = 'tab3'
        document.getElementsByClassName('tab3')[0].click()
        //this.getQuestions('mine')
      }else{
         document.getElementsByClassName('tab1')[0].click()//页面加载时默认调用newest
      }
    },
  computed:{
      formattedDate () { //时间格式化
        var time = new Date(this.timestamp)
        return this.fullNum(Number(time.getMonth()) + 1)+ '-' + this.fullNum(time.getDate())+ ' '+ this.fullNum(time.getHours())+ ":"+ this.fullNum(time.getMinutes()) + ":" + this.fullNum(time.getSeconds())
      },
      ...mapState({
       
      })
    },
  methods: { 
   fullNum(obj){ //处理日期类型24小时格式
       if(Number(obj) < 10){ 
           return '0' + obj; 
      }else{ 
          return obj; 
       } 
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    jumpToAsk(){
       this.$router.push({
              path: '/ask'
            })
    },
    refresh () {
      this.refreshing = true
      console.warn("refreshing")
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
      switch (this.activeTab){
            case 'tab1' :
              console.warn("tab1")
              this.getQuestions(1)
              break
            case 'tab2' :
              console.warn("tab2")
              this.getQuestions(2)
              break
            case 'tab3' :
              console.warn("tab3")
              this.getQuestions(3)
              break
            default:
          }
    },
    getQuestions(sortType){
      console.warn("getQuestions",sortType)
      //根据参数调用获取接口，回调按if(sort=='mine')或者switch处理
      this.axios.get('/community/list/'+sortType)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            switch (sortType){
              case 1 :
                this.newestList = res.data.object
                break
              case 2 :
                this.hottestList = res.data.object
                break
              case 3 :
                this.myList = res.data.object
                break
            }
          }else{

          }
        })
        .catch(err=> {
          console.log(err)
        })
    },

  },
  components:{
    },

}
</script>

<style lang="css" scoped>	
.questions-root{
  overflow: auto; 
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
  position: relative;
  user-select: none;
  height: 100%;
}

.item-wrapper{
  position: relative;
 
}
.mu-item-content{
      align-self: top;
}
.mu-item{
  padding-right: 55px;
}
.title{
  max-width: 90%;
}
.item{
  /* height: 80px; */

}
.sub-info{
  position: relative;
  left: -5px;
  margin: 0;
  font-size: 12px;
  color: grey;
  display: inline-block;
  -webkit-transform : scale(0.84,0.84) ;/*试用*/
  -ms-transform: scale(0.84,0.84) ;
  -moz-transform: scale(0.84,0.84) ;
  -o-transform: scale(0.84,0.84) ;
  transform: scale(0.84,0.84) ;
}
.ask-btn{
    position: fixed;
    bottom: 0;
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
.container{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
  position: relative;
  user-select: none;
  /* height: 100%; */
 /*  margin-bottom: 36px; */
}
</style>


