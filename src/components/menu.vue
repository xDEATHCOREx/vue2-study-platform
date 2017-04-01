<template>
<div>
 <mu-drawer  :open="open" :docked="docked" @close="closeMenu()">  
  <router-link :to="{path:'/login'}" v-if="!logIn">
 	 <mu-raised-button label="Regist/Login" class="demo-raised-button" @click.native="closeMenu()" secondary/>
  </router-link>
      <mu-list @itemClick="docked ? '' : closeMenu()">
        <router-link :to="{path:'/'}">
        	<mu-list-item title="Index page" @click.native="closeMenu()"/>
        </router-link>
        <mu-list-item v-if="docked" @click.native="closeMenu()" title="Close"/>
      </mu-list>
      <div v-if="logIn">
     	 <p>{{user}}</p>
     	 <mu-raised-button label="Log out" class="demo-raised-button" @click.native="confirm('Confirm to log out?','logOut')" />
      </div>
      <confirm ></confirm>
  </mu-drawer>

</div>
</template>

<script>
import {mapState} from 'vuex'
import confirm from './confirm.vue'
export default {
  data () {
    return {
    }
  },
  computed:mapState({
     open: 'open',
     docked: 'docked',
     user:'user',
     logIn:'logIn',
     dialog:'dialog',
  }),
  methods: {
    closeMenu (flag) {
      console.info("close")
      this.$store.commit('toggle',flag)
    },
    confirm(info,event){
    	this.$store.commit('dialogToggle',{
    		info : info,
    		event : event
    	})
    	console.warn(event,"test")
    },
    logOut(){
    	this.$store.commit('logOut')
    	
    },
  },
  components:{
      'confirm': confirm,
    },

}
</script>

<style lang="css">

</style>
