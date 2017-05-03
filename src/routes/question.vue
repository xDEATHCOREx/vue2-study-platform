<template>
<div class="root">
  <mu-card>
  <mu-card-title :title="data.communityTitle" subTitle="Vue JavaScript"/>
  <mu-card-header :title="data.communityAsk.askNickName" :subTitle="data.communityAsk.communityAsktime">
     <mu-avatar slot="avatar" color="deepOrange300" backgroundColor="purple500" :src="data.communityAsk.askAvartarUrl">
     </mu-avatar>
  </mu-card-header>
  <mu-card-text v-html="formattedQuestionText">
  </mu-card-text>
    <img class="ask-pic" v-if="data.communityAsk.askPic" :src="data.communityAsk.askPic">
  <mu-card-actions >
    <mu-flat-button  icon="arrow_upward" label="12"/>
    <mu-flat-button icon="arrow_downward" label="5"/>
    <mu-icon-menu
        v-if="isSelf"
        icon="more_vert"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
        <mu-menu-item title="Delete" @click="deleteQuestion"/>
        <mu-menu-item title="Edit" />
    </mu-icon-menu>
  </mu-card-actions>
</mu-card>


<comment :answerData="data.communityAnswer"></comment>


<mu-raised-button 
    :label="starText" 
    icon="star"
    :iconClass="star"
    class="demo-raised-button btn star-btn" 
    @click.native="checkLogInState('star')"
    :disabled="disabled"
    primary/>
<mu-raised-button 
    label="Answer" 
    icon=""
    class="demo-raised-button btn answer-btn" 
    @click.native="checkLogInState('answer')" 
    secondary/>

    
</div>



</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
import comment from '../components/comment.vue'
	export default {
    data () {
      return {
       title:'10 Answers',
       star:'unstar',
       starText:'STAR',
       disabled:false,
       rightBottom: {horizontal: 'right', vertical: 'bottom'},
       data:{
        communityAnswer:[{
          communityId:''
        },{
          communityId:''
        }],
        communityAsk:{
          askNickName:'test'
        }
       },
      }
    },
    mounted(){  
      this.axios.get('/community/detail/2/'+this.$route.query.id)
        .then(res => {
          console.warn(res)
          this.data = res.data.object
          //更改header的title，实际上是改变store里的值，这里根据回答数修改标题
        this.$store.commit('setTitle',this.data.answerCount+((this.data.answerCount==1||this.data.answerCount==0) ?' Answer':' Answers')) 
         this.star = this.data.starred?'starred':'unstar'//根据接口的收藏状态改变
         this.starText = this.data.starred? 'STARRED' : 'STAR'
        })
        .catch(err => {
          console.log(err)
        })
      eventHub.$on('delete',this.deleteAnswer)
    },
    watch:{
      star:{
        handler: function (val, oldVal) {
            
        },
      } 
    },
    computed:{
      formattedQuestionText () { 
        var replaceText = String(this.data.communityQuestion).replace(/\n/g,'<br/>')//注意写法！
        console.warn(typeof replaceText,replaceText)
         return replaceText
       },
       isSelf(){
         if(this.userId == this.data.communityAsk.communityAskid){
          return true
         }else{
          return false
         }
       },
      ...mapState({
        logIn:'logIn',//记录了登录态    
        userId:'userId',
      })
    },
    methods:{
      checkLogInState(type){//收藏需要检查登录态
        console.warn("checking login state",this.logIn)
        if(this.logIn){
          switch (type){
            case 'star' :
              this.toStar()
              break
            case 'answer' :
              this.toAnswer()
              break
            default:
          }
        }else{//记录下当前url并跳转到登录页
          this.$router.push({
              path: '/login',
              query:{redirect:this.$route.fullPath}
            })
        }
      },
      toStar(){//收藏逻辑（发ajax请求及改变样式）
        this.disabled = true //暂时禁用按钮
        if(this.star == 'unstar'){
          //这里调用收藏接口
         this.starRequest('save')
         
        }else{
          //这里调用取消收藏
          this.starRequest('del')
        }
      },
      starRequest(tag){
         let formData = new FormData()
          formData.append("infoId", this.data.titleId)
           this.axios({//上传信息接口
              url: '/collection/'+tag+'/2',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              setTimeout(()=>{ //恢复禁用
                  this.disabled = false
                },2000)
              this.$store.commit('loadingToggle')
              console.warn(res)
              if(res.data.success){              
                //弹出提示
                this.$store.commit('topPopupToggle',tag)
                this.$store.commit('loadingToggle')
                
                
                if(tag == 'save'){
                 this.star = 'starred'
                 this.starText = 'starred'
                }else{
                  this.star = 'unstar'
                  this.starText = 'star'
                }
              }else{//其他情况
                this.$store.commit('topPopupToggle',"Failed!")
              }
            })
            .catch(err =>{
              setTimeout(()=>{
                  this.disabled = false
                },2000)
               this.$store.commit('topPopupToggle',"Error！")
               this.$store.commit('loadingToggle')
              console.warn(err)
            })  
      },
      toAnswer(){
        console.warn("toAnswer")
        this.$router.push({
              path: '/answer',
              query:{titleId:this.data.titleId}
            })
      },
      deleteAnswer(index){//删除回答
       //console.warn("receive",index)
        //console.warn(this.data.communityAnswer[index])
      
        //引入接口真正在后端删除
        var formData = new FormData()
        console.warn(this.data.communityAnswer[index],this.data.communityAnswer[index].communityId)
        formData.append("communityId", this.data.communityAnswer[index].communityId)
        formData.append("answerId", this.data.communityAnswer[index].communityAnswerid)
         this.axios({//删除回答
              url: '/community/delAnsr.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{    
              console.warn(res)  
              if(res.data.success){  
                //弹出提示
                this.$store.commit('topPopupToggle',"Deleted!")            
                this.data.communityAnswer.splice(index,1,'')//前端删除答案
              }else{
                //弹出提示
                this.$store.commit('topPopupToggle',"Failed!")
              }
            })
            .catch(err =>{
              console.warn(err)
            })  
      },
      deleteQuestion(){
        var formData = new FormData()
        formData.append("titleId", this.data.titleId)
        formData.append("askId", this.data.communityAsk.communityAskid)
         this.axios({//删除问题
              url: '/community/delQues.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{    
              console.warn(res)  
              if(res.data.success){  
                //弹出提示
                this.$store.commit('topPopupToggle',"Deleted!")
                this.$router.push({ 
                  path: '/questions',
                })           
              }else{
                //弹出提示
                this.$store.commit('topPopupToggle',"Failed!")
              }
            })
            .catch(err =>{
              console.warn(err)
            })  
      }
    },
    components:{
      'comment':comment
    },
    beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
     eventHub.$off('delete')//记得移除监听器！否则会出现再次进入该路由时重复监听的情况，导致删除时出现多次请求
     next()
    },
  }
</script>

<style lang="css" scoped>
.root{

  overflow: auto;
}
.ask-pic{
    width: 92%;
    max-width: 100%;
    display: block;
    vertical-align: top;
    margin: 0 auto;
    box-shadow: 0 3px 10px rgba(0,0,0,0.656863), 0 3px 10px rgba(0,0,0,.227451);
}
.btn{
     width: 50%;
    position: fixed;
    bottom: 0;
}
.answer-btn{
    right: 0;
  }
  .star-btn{
    left: 0;
  }
.mu-icon-menu{
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>