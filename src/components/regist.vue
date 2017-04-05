<template>
<div class="root">
   <mu-text-field label="user" hintText="Input User name" v-model.trim="user" labelFloat/><br/>
   <mu-text-field label="password" hintText="Input password" type="password" v-model.trim="password" labelFloat/><br/>
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
</style>
