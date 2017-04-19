<template>
<div>
 <mu-drawer  :open="open" :docked="docked" @close="closeMenu()">
  <div v-if="logIn">
	 <p class="user-name">{{user}}</p> 
  </div>
  <div v-else>
    <p class="user-name">Login please❤</p> 
  </div>
  <router-link class="login-btn" :to="{path:'/login'}" v-if="!logIn">
 	 <mu-raised-button label="Regist/Login" class="demo-raised-button" @click.native="closeMenu()" secondary/>
  </router-link>
      <mu-list @itemClick="docked ? '' : closeMenu()">
        <router-link :to="{path:'/'}">
        	<mu-list-item title="Index page" @click.native="closeMenu()">
        		 <mu-avatar slot="left" icon="home" :size="36" backgroundColor="purple600"/>
        	</mu-list-item>
        </router-link>
        <mu-divider />
        <router-link :to="{path:'/questions'}" >
          <mu-list-item title="Questions" @click.native="closeMenu()">
               <mu-avatar slot="left" icon="Q" :size="36" backgroundColor="green600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
     	<router-link :to="{path:'/personal'}" v-if="logIn">
        	<mu-list-item title="Personal" @click.native="closeMenu()">
        	     <mu-avatar slot="left" icon="person" :size="36" backgroundColor="blue600"/>
        	</mu-list-item>
        </router-link>
        <mu-divider />
          <router-link :to="{path:'/starred'}" v-if="logIn">
          <mu-list-item title="Star" @click.native="closeMenu()">
               <mu-avatar slot="left" icon="star" :size="36" backgroundColor="yellow600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
         <router-link :to="{path:'/exam',query:{id:'1'}}" v-if="logIn" >
          <mu-list-item title="Personality Test" @click.native="closeMenu()">
               <mu-avatar slot="left" icon="PT" :size="36" backgroundColor="red600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
        <mu-list-item v-if="docked" @click.native="closeMenu()" title="Close"/>
      </mu-list>
     	 <mu-raised-button v-if="logIn" label="Log out" class="demo-raised-button log-out-btn" @click.native="closeMenu(),confirm('Confirm to log out?','Log out??','logOut')" /> 
       {{jumpComfirm}}
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
     jumpComfirm:'jumpComfirm'
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
	 	font-size: 25px;
	 }
	 .log-out-btn{
	 	position: absolute;
    	bottom: 0%;
    	left: 50%;
    	transform: translate(-50%,-50%);
      background-color: #d1c4e9;
	 }
   .login-btn{
    position: absolute;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%,-50%);
    display: block;
    text-align: center;
   }
   .mu-list{
    position: absolute;
    top: 87px;
   }
</style>


