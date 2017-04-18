<template>
<div class="root">
   <mu-text-field label="user" hintText="Input User name" v-model.trim="user" labelFloat/><br/>
   <div class="password-input">
   <mu-text-field label="password" hintText="Input password" :type="passwordType" v-model.trim="password" labelFloat/>
   <i class="eye mu-icon material-icons" @click="isVisible">{{visibility}}</i>
   </div>
   <div class="identifying-code-input">
   <mu-text-field label="identifying code" hintText="Input code"  v-model.trim="code" labelFloat/>
   <img class="identifying-code" src="http://18-newbee.top/PCCreator.action" height="34" width="108">
   </div>
   <br/>
  <mu-raised-button label="Regist" class="demo-raised-button"  @click="regist" primary/>
   <router-link class="link" :to="{path:'/login'}">
        <mu-flat-button label="Log in" class="demo-flat-button" secondary/>
   </router-link>
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'Regist',
		    user: '',
        password:'',
        code:'',
        passwordType:'password',
        disabled:false,
        visibility:'visibility_off'
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
       //检查每次的登录态，已登录则重定向
      this.checkLogInState()
    },
     computed:mapState({
      logIn:'logIn',//记录了vuex store中的登录态
    }),
    methods:{
      regist(){
      	console.info("regist")
      	if(this.user!==''&&this.password!==''){
           if(this.code!==''){
            //继续判断信息是否符合要求
             this.axios.get('/user/isExistAct/'+this.user)
              .then(res =>{
                console.warn(res)
                if(res.data.success){
                   //继续判断 or 注册
                   this.$store.commit('topPopupToggle',"Usable")
                }else{
                  this.$store.commit('topPopupToggle',"User already exists!")
                }
              })
              .catch(err =>{
                console.warn(err)
              })
          }
          else{//提示验证码不能为空
            this.$store.commit('topPopupToggle',"Identifying code must be filled!")
          }         
          console.info("User  "+this.user+"  password  "+this.password)
        }else{
          console.warn("regist info null")
          this.$store.commit('topPopupToggle',"Regist info must be filled")
        }
      },
       checkLogInState(){
        console.warn("checking login state",this.logIn)
        if(this.logIn){
          console.info("logged in,redirecting..")
          this.$router.replace({
            path:'/'
          })
        }
      },
      isVisible(){
        if(this.visibility=='visibility'){
          this.visibility = 'visibility_off'
          this.passwordType = 'password'
          console.info("password unseen")
        }else{
          this.visibility = 'visibility'
          this.passwordType = 'text'
        }
      },

    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
  .root{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    margin: 0;
  }
  .password-input{
    position: relative;
  }
  .eye{
    position: absolute;
    right: 0px;
    bottom: 22px;
  }
  .identifying-code-input{
    position: relative;
  }
  .identifying-code{
    position: absolute;
    top: 20px;
    right: 0px;
  }
</style>
