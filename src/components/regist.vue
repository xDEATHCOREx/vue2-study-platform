<template>
<div>
 <p>regist</p>
 <p>{{user}}{{password}}</p>
   <mu-text-field label="user" hintText="Input User name" v-model="user" labelFloat/><br/>
   <mu-text-field label="password" hintText="Input password" type="password" v-model="password" labelFloat/><br/>
  <mu-raised-button label="Regist" class="demo-raised-button"  @click="regist" primary/>
   <router-link class="link" :to="{path:'/login'}">
        <mu-flat-button label="Log in" class="demo-flat-button" secondary/>
   </router-link>
   <popup></popup>
</div>
</template>

<script>
import popup from './popup.vue'
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
    },
    methods:{
      regist(){
      	console.info("regist")
      	if(this.user!==''&&this.password!==''){
          console.info("User  "+this.user+"  password  "+this.password)
        }else{
          console.warn("regist info null")
          this.$store.commit('topPopupToggle',"Regist info must be filled")
        }
      }
    },
    components:{
      'popup': popup,
    },
  }
</script>

<style lang="css">

</style>
