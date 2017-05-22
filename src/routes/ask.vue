<template>
<div class="ask-root">
 <mu-text-field 
   label="标题" 
   hintText="请简明概要地描述问题关键" 
   v-model.trim="questionTitle" 
   labelFloat 
   fullWidth
   :errorText="inputErrorText"
    @textOverflow="handleInputOverflow" 
    :maxLength="30"
  />
  <mu-text-field 
    label="内容" 
    hintText="请详细描述问题的内容，可以输入多行" 
    v-model="questionDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>

  <mu-raised-button 
    label="提交" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native="check"
    :disabled="disabled"/>
    <br/>
    <br/> 
{{questionPic}}
   <upload @upload="uploadPic"></upload>

     
</div>
</template>

<script>
import {mapState} from 'vuex'

import upload from '../components/upload.vue'
export default {
  data () {
    return {
       value:'1',
       title:'提问中',
       questionTitle:'',
       questionDetail:'',
       questionPic:'',
       questionPicName:'',
       inputErrorText: '',
       disabled:false,
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
  computed:mapState({
    jumpConfirm:'jumpConfirm',
    logIn:'logIn'
  }),
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '超过长度！' : ''
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
      if(this.questionPic!=''){//若父组件有接收到图片数据
        formData.append("pictureFile", this.questionPic,this.questionPicName)
      }
      formData.append("title", this.questionTitle)
      formData.append("question_text", this.questionDetail)
      this.axios({//上传信息接口
              url: '/community/saveQues.action',
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
                this.$store.commit('topPopupToggle',"已保存！")
                this.$router.replace({ 
                  path: '/questions' 
                })
              }else{//其他情况
                this.$store.commit('topPopupToggle',res.data.result_msg)
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
        this.$store.commit('topPopupToggle',"请填写标题和内容！")
      }
    },
    uploadPic(data,name){
      this.questionPic = data
      this.questionPicName = name
    }
  },
  components:{
     'upload':upload,
    },
  beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
      //之后可能还要加个提交态，判断是提交后跳转还是非提交跳转
        if(this.logIn == true){//已登录
          console.warn("leaving to:",to.fullPath)
          this.$store.commit('dialogToggle',{
          info : '确认到'+to.name+'中?',
          title : '确认',
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

.ask-root{
  padding: 20px 20px 36px 20px;
  text-align: center;
  overflow: auto;
}
.submit-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

</style>


