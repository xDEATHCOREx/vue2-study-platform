<template>
<div class="answer-root">
  <mu-text-field 
    label="detail" 
    hintText="Answer the question" 
    v-model="answerDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>

  <textarea rows="2" cols="36" wrap="hard" v-model="answerDetail"></textarea> 

  <mu-raised-button 
    label="Submit" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="check"
    :disabled="disabled"/>
    <br/>
    <br/> 
    
</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
       value:'1',
       title:'Answering',
       answerDetail:'',
       inputErrorText: '',
       text:'',
       disabled:true,
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
  computed:{
    ...mapState({
      jumpConfirm:'jumpConfirm',
      logIn:'logIn'
    })
  },
  watch:{
    answerDetail:{
      handler:function(val,oldVal){
        if(val==''){
          this.disabled = true
        }else{
          this.disabled = false
        }
      }
    }
  },
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? 'Over length' : ''
      this.disabled = isOverflow ? true : false
    },
     handleChange (value) {
      this.value = value
    },
    submit(){
      this.disabled = true
        setTimeout(()=>{ //短期禁用按钮，防刷
          this.disabled = false
        },1000)
      this.$store.commit('loadingToggle')//转菊花
      var formData = new FormData()
      formData.append("titleId", this.$route.query.titleId)
      formData.append("answer_text", this.answerDetail)
      this.axios({//上传信息接口
              url: '/community/saveAnsr.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              this.$store.commit('loadingToggle')
              console.warn(res)
              if(res.data.success){              
                //弹出提示
                this.$store.commit('topPopupToggle',"Saved！")
                this.$router.push({ 
                  path: '/question' ,
                  query:{id:this.$route.query.titleId}
                })
              }else{//其他情况
                this.$store.commit('topPopupToggle',"Failed!")
              }
            })
            .catch(err =>{
               this.$store.commit('topPopupToggle',"Error！")
             this.$store.commit('loadingToggle')
              console.warn(err)
            })  
    },
    check(){
      if(this.questionTitle!=''&&this.questionDetail!=''){
        this.submit()
      }else{
        this.$store.commit('topPopupToggle',"Fill the blanks!")
      }
    }
  },
  components:{

    },
  beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
      //之后可能还要加个提交态，判断是提交后跳转还是非提交跳转
        if(this.logIn == true){//已登录
          console.warn("leaving to:",to.fullPath)
          this.$store.commit('dialogToggle',{
          info : 'Sure leaving to '+to.name+'?',
          title : 'Confirm',
          event : 'jump',
          jumpTo : to.fullPath
          })
          if(this.jumpConfirm){
             next()
          }
        }else{//若在此路由点击了menu的登出按钮改变了登录态直接不执行确认逻辑
          next()
        }
    },
}
</script>

<style type="text/css" scoped>	

.answer-root{
  padding: 20px 20px 36px 20px;
  text-align: center;
}
.submit-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

</style>


