<template>
<div class="root">
   <mu-text-field label="账号" hintText="请输入账号" v-model.trim="user" labelFloat/>
   <br/>
   <div class="password-input">
   <mu-text-field label="密码" hintText="请输入密码" :type="passwordType" v-model.trim="password" labelFloat/>
   <i class="eye mu-icon material-icons" @click="isVisible">{{visibility}}</i>
   </div>
   <div class="identifying-code-input">
   <mu-text-field label="验证码" hintText="请输入验证码"  v-model.trim="code" labelFloat/>
   <img class="identifying-code" :src="codeSrc" height="34" width="108" @click="refresh">
   </div>
    <mu-switch label="自动登录" class="demo-switch" v-model="auto"/>
    <br/>
    <br/>
   <mu-raised-button label="登录" class="demo-raised-button" @click="login" :disabled="disabled" primary/>
   <router-link class="link" :to="{path:'/regist'}" replace>
       <mu-flat-button label="去注册" class="demo-flat-button" secondary/>
   </router-link>

</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
export default {
    data () {
      return {
        title:'登录',
        user: 'test',
        password:'test',
        code:'',
        auto:true,
        passwordType:'password',
        disabled:false,
        visibility:'visibility_off',
        codeSrc:'http://18-newbee.top/PCCreator.action'
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
        let data = { 
                user_account: this.user,
                user_password: this.password,
                login_code:this.code,
                auto: this.auto?"1":"0",
        }

        /*this.axios.post('/user/login.action',dat)
            .then(res =>{
              console.warn(res)
               this.$store.commit('logIn',this.user)      
              this.$store.commit('topPopupToggle',"Login success!")
            })
            .catch(err =>{
              console.warn(err)
            })    */



        if(this.user!==''&&this.password!==''){
          console.info("Login btn clicked")
          console.info("User  "+this.user+"  password  "+this.password)
          //判断有无输入验证码
          if(this.code!==''){
            //判断验证码正误
          //进行调用登录接口验证的逻辑编写（todo），先进行前端检查信息是否符合要求，再post到后端验证。
          //下面是接口返回验证成功的操作      
           this.axios({
              url: 'http://18-newbee.top/user/login.action',
              method: 'post',
              withCredentials: true,
              data: {
                    user_account: this.user,
                    user_password: this.password,
                    login_code:this.code,
                    auto: this.auto?"1":"0",
              },
            })
            .then(res =>{
                  console.warn(res.data.success)
                  if(res.data.success){
                    this.$store.commit('logIn',this.user)      
                    this.$store.commit('topPopupToggle',"登录成功！")
                    //重定向到登录拦截前的页面
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/')//取得由router.js中配置好的登录后跳转路由的query参数

                     eventHub.$emit('updateTestStatus')//更新测试态
                     
                    this.$router.push({
                      path: redirect
                    })
                  }else{
                    console.warn(res)
                    // 根据error code进行别的操作（验证码错误则更换验证码）
                    switch (res.data.code){
                      case "1" :
                        console.warn("Login fail")
                        this.$store.commit('topPopupToggle',"登录失败！")
                        this.refresh()
                        break
                      case "2" :
                        console.warn("User name or password incorrect")
                        this.$store.commit('topPopupToggle',"账号或密码错误!")
                        this.refresh()
                        break
                      case "3" :
                        console.warn("Wrong code")
                        this.$store.commit('topPopupToggle',"验证码错误!")
                        this.refresh()
                        break  
                      default:
                    }
                  }
                })
            .catch(err =>{
                  console.warn(err)
              })             
            }
          else{//提示验证码不能为空
            this.$store.commit('topPopupToggle',"验证码不能为空!")
          }
        }else{
          console.warn("info null")
          this.$store.commit('topPopupToggle',"请完整填写信息!")
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
      refresh(){
        this.codeSrc='http://18-newbee.top/PCCreator.action?d='+new Date().getTime()
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
    height: auto;
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
