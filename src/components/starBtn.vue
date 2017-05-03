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
      	
         star:'unstar',
      }
    },
    mounted(){

    },
    computed:{
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
          formData.append("infoId", this.data.titleId)
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
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>

</style>
