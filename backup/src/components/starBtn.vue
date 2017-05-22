<template>
<div>
     <mu-icon-button  
      icon="star_border"  
      :iconClass="star"
      @click.native="checkLogInState"/>  
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
      	    star:'unstar'  
      }
    },
    props:['isStarred','courseId'],
    mounted(){//这里取不到detail.vue中传过来的isStarred...
      console.warn(this.isStarred,"star status mounted")
      if(this.isStarred){
          this.star = 'starred'
        }else{
          this.star =  'unstar'
        }
    },
    watch:{
      isStarred:function(val,oldVal){//这里可以是异步观测isStarred的值？
        console.warn(val,oldVal,"star status watch")
        if(val){
          this.star = 'starred'
        }else{
          this.star =  'unstar'
        }
      }
    },
    computed:{
     /* checkStar(){
        if(this.isStarred){
          this.star = 'starred'
        }else{
          this.star =  'unstar'
        }
      },*/
      ...mapState({
        logIn:'logIn',//记录了登录态    
      })
    },
    methods:{
       checkLogInState(){//收藏需要检查登录态
        console.warn("checking login state",this.logIn)
        if(this.logIn){
          this.toStar()
        }else{//记录下当前url并跳转到登录页
          this.$router.push({
              path: '/login',
              query:{redirect:this.$route.fullPath}
            })
        }
      },
      toStar(){//收藏逻辑（发ajax请求及改变样式）
       // this.disabled = true //暂时禁用收藏按钮
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
          formData.append("infoId", this.courseId)
           this.axios({//上传信息接口
              url: '/collection/'+tag+'/1',
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
                
                this.$store.commit('loadingToggle')                    
                if(tag == 'save'){
                  this.$store.commit('topPopupToggle','收藏成功！')
                 this.star = 'starred'      
                }else{
                  this.$store.commit('topPopupToggle','已取消收藏！')
                  this.star = 'unstar'
                }
              }else{//其他情况
                this.$store.commit('loadingToggle')  
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
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>

</style>
