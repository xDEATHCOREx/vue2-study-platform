<template>
<div class="root">
   <mu-text-field label="user" hintText="Input User name" v-model.trim="user" labelFloat/>
   <br/>
   <div class="password-input">
   <mu-text-field label="password" hintText="Input password" :type="passwordType" v-model.trim="password" labelFloat/>
   <i class="eye mu-icon material-icons" @click="isVisible">{{visibility}}</i>
   </div>
   <br/>
   <mu-raised-button label="Login" class="demo-raised-button" @click="login" :disabled="disabled" primary/>
   <router-link class="link" :to="{path:'/regist'}">
       <mu-flat-button label="Regist" class="demo-flat-button" secondary/>
   </router-link>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
      return {
        title:'Login',
        user: '',
        password:'',
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
      login(){
        this.disabled = true
        setTimeout(()=>{ //短期禁用按钮，防刷
          this.disabled = false
        },1000)
        if(this.user!==''&&this.password!==''){
          console.info("Login btn clicked")
          console.info("User  "+this.user+"  password  "+this.password)
          //进行调用登录接口验证的逻辑编写（todo）
          //下面是接口返回验证成功的操作
          this.$store.commit('logIn',this.user)      
          this.$store.commit('topPopupToggle',"Login success!")
          //重定向到登录拦截前的页面
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')//取得由router.js中配置好的登录后跳转路由的query参数
            this.$router.push({
              path: redirect
            })
        }else{
          console.warn("info null")
          this.$store.commit('topPopupToggle',"Info must be filled!")
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
      }
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
    margin:0;
  }
  .password-input{
    position: relative;
  }
  .eye{
    position: absolute;
    right: 0px;
    bottom: 22px;
  }
</style>
