<template>
<div>
  <div class="questions-root">
  <!-- {{newestList}}
  {{hottestList}}
  {{myList}} -->
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab class="tab1" value="tab1" title="最新" @click.once="getQuestions(1)"/>
      <mu-tab class="tab2" value="tab2" title="最热" @click.once="getQuestions(2)"/>
      <mu-tab class="tab3" value="tab3" title="我的" @click.once="getQuestions(3)"/>
    </mu-tabs>

     <question-list 
      :activeTab="activeTab" 
      :newestList="newestList" 
      :hottestList="hottestList" 
      :myList="myList"
      @getQuestions="getQuestions">     
     </question-list>
  </div>
  <mu-raised-button 
    label="提问" 
    class="demo-raised-button ask-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="jumpToAsk"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
//import questionList from '../assets/json/questionList.json'
import questionList from '../components/questionList.vue'
export default {
  data () {
    return {
       title:'问答社区',
        activeTab: 'tab1',
        list:[],
        newestList:[],
        hottestList:[],
        myList:[]
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //this.trigger = this.$el
     // this.list = questionList.res.list//测试用例
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
    getQuestions(sortType){//增加判断是否刷新的标志？用于决定是否显示主loading！
      this.$store.commit('loadingToggle')
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
          this.$store.commit('loadingToggle')
        })
        .catch(err=> {
          console.log(err)
        })
    },

  },
  components:{
    'question-list':questionList
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

.ask-btn{
    position: fixed;
    bottom: 0;
  }


</style>


