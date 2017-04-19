<template>
<div>
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="Newest"/>
    <mu-tab value="tab2" title="Hottest"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'" class="container">
   <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <mu-list>
      <div v-for="(item,index) in list" class="item-wrapper">
        <router-link class="link" :to="{path:'/question',query:{id:item.id}}">
          <mu-list-item  :title="item.title"  titleClass="title" class="item">
            
           </mu-list-item>
         </router-link>
         <mu-paper class="demo-paper" :zDepth="2">
              <small>{{item.answer}}</small><br/>
              <small>回答</small>
            </mu-paper>   
      <mu-divider/>
      </div>
  </mu-list>
  </div>
  <div v-if="activeTab === 'tab2'" class="container">
    <h2>Tab Two</h2>
    <p>
      这是第二个 tab
    </p>
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
        list:[]
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.trigger = this.$el
      this.list = questionList.res.list
    },
  computed:mapState({
    
  }),
  methods: {
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
    }
  },
  components:{
    },

}
</script>

<style lang="css" scoped>	

.mu-item{
height: 80px;
   width: 89%;
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
  height: 80px;

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
    top: 15px;
    text-align: center;
    color: #7e57c2;
    background-color: #d1c4e9;
}
.container{
  position: relative;
}
</style>


