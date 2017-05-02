<template>
<div class="root">
   <mu-text-field 
    label="user" 
    hintText="Input User name" 
    :errorText="userErrorText"
    v-model.trim="user" 
    labelFloat
    @blur="isUserNameExist"/>
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
  <mu-raised-button 
    label="Regist" 
    class="demo-raised-button"   
    @click="regist" 
    :disabled="disabled"
    primary/>
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
        visibility:'visibility_off',
        codeSrc:'http://18-newbee.top/PCCreator.action',
        userErrorText:'',
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
        this.disabled = true
        setTimeout(()=>{ //短期禁用按钮，防刷
          this.disabled = false
        },1000)
      	console.info("regist")
      	if(this.user!==''&&this.password!==''){
           if(this.code!==''){
            //继续判断信息是否符合要求
             let data = { //构造注册post的数据
                user_account: this.user,
                user_password: this.password,
                register_code:this.code,
             }
            this.axios({
              url: '/user/register.action',
              method: 'post',
              data: {
                    user_account: this.user,
                    user_password: this.password,
                    register_code:this.code,
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
              if(res.data.success){
                console.warn(res.data.success,res.data.result_msg)  
                this.$store.commit('topPopupToggle',"regist success!")
                this.$router.push({
                  path:'/login'
                })
              }else{
                console.warn(res)
                // 根据error code进行别的操作（验证码错误则更换验证码）
                switch (res.data.code){
                  case "1" :
                    console.warn("regist fail")
                    this.$store.commit('topPopupToggle',"Regist fail!")
                    this.refresh()
                    break
                  case "2" :
                    console.warn("User name occupied")
                    this.$store.commit('topPopupToggle',"User name occupied!")
                    this.refresh()
                    break
                  case "3" :
                    console.warn("Wrong code")
                    this.$store.commit('topPopupToggle',"Wrong code!")
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
      refresh(){
        this.codeSrc='http://18-newbee.top/PCCreator.action?d='+new Date().getTime()
      },
      isUserNameExist(){//判断用户名是否可用
        console.warn("blurrrrr")
        if(this.user!==''){
          this.axios.get('/user/isExistAct/'+this.user)
                .then(res =>{
                  console.warn(res)
                  if(res.data.success){
                     //继续判断 or 注册
                     this.$store.commit('topPopupToggle',"Usable")
                     this.userErrorText= ""
                     this.disabled = false
                  }else{
                    this.$store.commit('topPopupToggle',"User already exists!")
                    this.userErrorText= "User already exists!"
                    this.disabled = true
                  }
                })
                .catch(err =>{
                  console.warn(err)
                })
        }
      }

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
