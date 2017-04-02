<template>
<div>
 <mu-drawer  :open="open" :docked="docked" @close="closeMenu()">
  <div v-if="logIn">
	 <p class="user-name">{{user}}</p> 
  </div>
  <router-link :to="{path:'/login'}" v-if="!logIn">
 	 <mu-raised-button label="Regist/Login" class="demo-raised-button" @click.native="closeMenu()" secondary/>
  </router-link>
      <mu-list @itemClick="docked ? '' : closeMenu()">
        <router-link :to="{path:'/'}">
        	<mu-list-item title="Index page" @click.native="closeMenu()">
        		 <mu-avatar slot="left" icon="home" :size="36"/>
        	</mu-list-item>
        </router-link>
     	<router-link :to="{path:'/personal'}" v-if="logIn">
        	<mu-list-item title="personal" @click.native="closeMenu()">
        	     <mu-avatar slot="left" icon="person" :size="36"/>
        	</mu-list-item>
        </router-link>
        <mu-list-item v-if="docked" @click.native="closeMenu()" title="Close"/>
      </mu-list>
     	 <mu-raised-button v-if="logIn" label="Log out" class="demo-raised-button log-out-btn" @click.native="closeMenu(),confirm('Confirm to log out?','Log out??','logOut')" /> 
  </mu-drawer>

</div>
</template>

<script>
import {mapState} from 'vuex'
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
    confirm(info,title,event){
    	this.$store.commit('dialogToggle',{
    		info : info,
    		title : title,
    		event : event
    	})
    	console.warn(event,"test")
    },
    logOut(){
    	this.$store.commit('logOut')
    },
  },
  components:{
    },

}
</script>

<style type="text/css" scoped>	
.user-name{
	 	text-align: center;
	 	color: #123;
	 	margin-top: 0;
	 	font-size: 20px;
	 }
	 .log-out-btn{
	 	position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%,-50%);
	 }
</style>


