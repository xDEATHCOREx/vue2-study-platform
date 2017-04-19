<template>
<div class="root">
   <mu-text-field label="user" hintText="Input User name" v-model.trim="user" labelFloat/>
   <br/>
   <div class="password-input">
   <mu-text-field label="password" hintText="Input password" :type="passwordType" v-model.trim="password" labelFloat/>
   <i class="eye mu-icon material-icons" @click="isVisible">{{visibility}}</i>
   </div>
   <div class="identifying-code-input">
   <mu-text-field label="identifying code" hintText="Input code"  v-model.trim="code" labelFloat/>
   <img class="identifying-code" :src="codeSrc" height="34" width="108" @click="refresh">
   </div>
    <br/>
   <mu-raised-button label="Login" class="demo-raised-button" @click="login" :disabled="disabled" primary/>
   <router-link class="link" :to="{path:'/regist'}" replace>
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
        user: 'test',
        password:'test',
        code:'',
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
        let data = { //ajax
                user_account: 'test',
                user_password: 'test',
                login_code:this.code,
                auto: 0
        }

        /*this.axios({
          url: '/user/login.action',
          method: 'post',
          data: {
                user_account: 'test',
                user_password: 'test',
                login_code:this.code,
                auto: 0
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        })
        .then(res =>{
              console.warn(res.data.success)
            })
            .catch(err =>{
              console.warn(err)
            })*/
        this.axios.post('/user/login.action',data)
            .then(res =>{
              console.warn(res)
            })
            .catch(err =>{
              console.warn(err)
            })    



        if(this.user!==''&&this.password!==''){
          console.info("Login btn clicked")
          console.info("User  "+this.user+"  password  "+this.password)
          //判断有无输入验证码
          if(this.code!==''){
            //判断验证码正误
          //进行调用登录接口验证的逻辑编写（todo），先进行前端检查信息是否符合要求，再post到后端验证。
          //下面是接口返回验证成功的操作      
          
         this.$store.commit('logIn',this.user)      
         this.$store.commit('topPopupToggle',"Login success!")
          //重定向到登录拦截前的页面
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')//取得由router.js中配置好的登录后跳转路由的query参数
            this.$router.push({
              path: redirect
            })
          }
          else{//提示验证码不能为空
            this.$store.commit('topPopupToggle',"Identifying code must be filled!")
          }
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
