<template>

<div class="container">
  <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list>
    <transition-group name="tabs" mode="out-in" tag="div">
      <div v-for="(item,index) in result" class="item-wrapper" v-bind:key="item">
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
      </transition-group> 
  </mu-list>
  
</div>
   
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      refreshing: false,
      trigger: null,
    }
  },
   mounted(){   
      this.trigger = this.$el
    },
  props:['activeTab','newestList','hottestList','myList'],
  computed:{
    result(){
      switch(this.activeTab){
        case "tab1":
          return this.newestList
        case "tab2":
          return this.hottestList
        case "tab3":
          return this.myList
      }
    }
  },
  methods: {
     refresh () {
      this.refreshing = true
      console.warn("refreshing")
      setTimeout(() => {
        this.refreshing = false
      }, 1000)
      switch (this.activeTab){
            case 'tab1' :
              console.warn("tab1")
              this.$emit('getQuestions',1)
              break
            case 'tab2' :
              console.warn("tab2")
              this.$emit('getQuestions',2)
              break
            case 'tab3' :
              console.warn("tab3")
             this.$emit('getQuestions',3)
              break
            default:
          }
    },
  },
 
}
</script>

<style lang="css" scoped>
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

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.tabs-enter-active, .tabs-leave-active {
  transition: opacity .15s ease;
}
.tabs-enter, .tabs-leave-active {
  opacity: 0;
}
</style>