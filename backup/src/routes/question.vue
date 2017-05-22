<template>
<div>
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
        <mu-menu-item title="删除" @click="deleteQuestion"/>
        <mu-menu-item title="修改" />
    </mu-icon-menu>
  </mu-card-actions>
</mu-card>


  <comment 
    :answerData="data.communityAnswer"
    @agree="agree"
    @disagree="disagree"></comment> 
</div>
<mu-raised-button 
    :label="starText" 
    icon="star"
    :iconClass="star"
    class="demo-raised-button btn star-btn" 
    @click.native="checkLogInState('star')"
    :disabled="disabled"
    primary/>
<mu-raised-button 
    label="回答" 
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
        communityAnswer:[],
        /*communityAnswer:[{
          communityId:'',
        },{
          communityId:''
        }],原来的写法，看去掉后有无bug*/
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
         this.starText = this.data.starred? '已收藏' : '收藏'
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
                },1500)
              this.$store.commit('loadingToggle')
              console.warn(res)
              if(res.data.success){              
                //弹出提示
                this.$store.commit('topPopupToggle',res.data.result_msg)
                this.$store.commit('loadingToggle')
                           
                if(tag == 'save'){
                 this.star = 'starred'
                 this.starText = '已收藏'
                }else{
                  this.star = 'unstar'
                  this.starText = '收藏'
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
                this.$store.commit('topPopupToggle',"已删除！")            
                this.data.communityAnswer.splice(index,1,'')//前端删除答案
              }else{
                //弹出提示
                this.$store.commit('topPopupToggle',res.data.resultMsg)
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
                this.$store.commit('topPopupToggle',"已删除！")
                this.$router.push({ 
                  path: '/questions',
                })           
              }else{
                //弹出提示
                this.$store.commit('topPopupToggle',res.data.resultMsg)
              }
            })
            .catch(err =>{
              console.warn(err)
            })  
      },
      agree(index){
        if(this.logIn){
          if(this.data.communityAnswer[index].communityAnswerid != this.userId){
            var formData = new FormData()
            formData.append("communityId", this.data.communityAnswer[index].communityId)
             this.axios({//删除问题
                  url: '/agree/save/1',
                  method: 'post',
                  data: formData,
                  transformRequest: [function (data) {//这里重置http.js中全局的transform
                    // Do whatever you want to transform the data
                    return data;
                  }],
                })
                .then(res=>{    
                  console.warn(res)  
                  if(res.data.code=='1'){//点赞
                    this.data.communityAnswer[index].agreeType = '1'
                    this.data.communityAnswer[index].agreeCount+=1
                  }else if (res.data.code=='2'){//取消点赞
                    this.data.communityAnswer[index].agreeType = null
                    this.data.communityAnswer[index].agreeCount-=1
                  }else if (res.data.code=='0'){
                    this.data.communityAnswer[index].agreeType = '1'
                    this.data.communityAnswer[index].agreeCount+=1
                    this.data.communityAnswer[index].disagreeCount-=1
                  }   
                })
                .catch(err =>{
                  console.warn(err)
                })  
          }else{
            this.$store.commit('topPopupToggle',"不能给自己点评！")
          }
        }else{
          this.$store.commit('topPopupToggle',"请先登录再点评！")
        }
      },
      disagree(index){
        if(this.logIn){
          if(this.data.communityAnswer[index].communityAnswerid != this.userId){
            var formData = new FormData()
            formData.append("communityId", this.data.communityAnswer[index].communityId)
             this.axios({//删除问题
                  url: '/agree/save/2',
                  method: 'post',
                  data: formData,
                  transformRequest: [function (data) {//这里重置http.js中全局的transform
                    // Do whatever you want to transform the data
                    return data;
                  }],
                })
                .then(res=>{    
                  console.warn(res)  
                    if(res.data.code=='3'){
                    this.data.communityAnswer[index].agreeType = '2'
                    this.data.communityAnswer[index].disagreeCount+=1
                  }else if (res.data.code=='4'){
                    this.data.communityAnswer[index].agreeType = null
                    this.data.communityAnswer[index].disagreeCount-=1
                  }else if (res.data.code=='0'){
                    this.data.communityAnswer[index].agreeType = '2'
                    this.data.communityAnswer[index].disagreeCount+=1
                   this.data.communityAnswer[index].agreeCount-=1
                  }
                })
                .catch(err =>{
                  console.warn(err)
                }) 
          }else{
            this.$store.commit('topPopupToggle',"不能给自己点评！")
          } 
        }else{
          this.$store.commit('topPopupToggle',"请先登录再点评！")
        }
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
  padding: 5px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
     height: 100%;
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