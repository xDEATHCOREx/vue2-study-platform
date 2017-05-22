<template>
<div class="answer-root">
  <mu-text-field 
    label="内容" 
    hintText="请输入回答的内容" 
    v-model="answerDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>

   <upload @upload="uploadPic"></upload>

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
    
</div>
</template>

<script>
import {mapState} from 'vuex'
import upload from '../components/upload.vue'
export default {
  data () {
    return {
       value:'1',
       title:'回答中',
       answerDetail:'',
       answerPic:'',
       answerPicName:'',
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
      if(this.answerPic!=''){//若父组件有接收到图片数据
        formData.append("pictureFile", this.answerPic,this.answerPicName)
      }
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
                this.$store.commit('topPopupToggle',"已保存！")
                this.$router.push({ 
                  path: '/question' ,
                  query:{id:this.$route.query.titleId}
                })
              }else{//其他情况
                this.$store.commit('topPopupToggle',"保存失败！")
              }
            })
            .catch(err =>{
               this.$store.commit('topPopupToggle',"Error！")
             this.$store.commit('loadingToggle')
              console.warn(err)
            })  
    },
    check(){
      if(this.answerDetail!=''){
        this.submit()
      }else{
        this.$store.commit('topPopupToggle',"请填写回答内容！")
      }
    },
    uploadPic(data,name){
      this.answerPic = data
      this.answerPicName = name
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
          info : '确认到'+to.name+'中？',
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


