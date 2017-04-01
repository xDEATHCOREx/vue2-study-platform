<template>
<div>
  <p>login{{user}}{{password}}</p>
   <mu-text-field label="user" hintText="Input User name" v-model="user" labelFloat/><br/>
   <mu-text-field label="password" hintText="Input password" type="password" v-model="password" labelFloat/><br/>
   <mu-raised-button label="Login" class="demo-raised-button" @click="login" primary/>
   <router-link class="link" :to="{path:'/regist'}">
       <mu-flat-button label="Regist" class="demo-flat-button" secondary/>
   </router-link>
   <popup></popup>
</div>
</template>

<script>
import popup from './popup.vue'
export default {
    data () {
      return {
        title:'Login',
        user: '',
        password:'',

      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    methods:{
      login(){
        if(this.user!==''&&this.password!==''){
          this.$store.commit('logIn',this.user)
          console.info("Login btn clicked")
          console.info("User  "+this.user+"  password  "+this.password)
        }else{
          console.warn("info null")
          this.$store.commit('topPopupToggle',"Info must be filled")
        }
      }
    },
    components:{
      'popup': popup,
    },
  }
</script>

<style lang="scss">

</style>
