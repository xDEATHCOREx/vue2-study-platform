<template>
<div class="menu-root">
 <mu-drawer  :open="open" :docked="docked" @close="closeMenu()">
  <div  class="menu-top" v-if="logIn" >
    <img class="user-head center-horizontal" :src="userInfo.userPic">
	  <p class="user-name center-horizontal">{{userInfo.userNickname}}</p> 
  </div>
  <div class="menu-top" v-else>
    <!-- <img class="user-head center-horizontal" src="http://18-newbee.top/img/head/20170425/10001.jpg"> -->
    <p class="user-name center-horizontal unlog">Login please❤</p> 
  </div>
  <router-link class="login-btn center-horizontal" :to="{path:'/login'}" v-if="!logIn">
 	 <mu-raised-button label="Regist/Login" class="demo-raised-button" @click.native="closeMenu()" secondary/>
  </router-link>
      <mu-list @itemClick="docked ? '' : closeMenu()">
        <router-link :to="{path:'/'}">
        	<mu-list-item class="menu-item" title="Index page" @click.native="closeMenu()">
        		 <mu-avatar slot="left" icon="home" :size="36" backgroundColor="purple600"/>
        	</mu-list-item>
        </router-link>
        <mu-divider />
        <router-link :to="{path:'/questions'}" >
          <mu-list-item class="menu-item" title="Questions" @click.native="closeMenu()">
               <mu-avatar slot="left" icon="help" :size="36" backgroundColor="green600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
     	<router-link :to="{path:'/personal'}" v-if="logIn">
        	<mu-list-item class="menu-item" title="Personal" @click.native="closeMenu()">
        	     <mu-avatar slot="left" icon="person" :size="36" backgroundColor="blue600"/>
        	</mu-list-item>
        </router-link>
        <mu-divider />
          <router-link :to="{path:'/starred'}" v-if="logIn">
          <mu-list-item class="menu-item" title="Star" @click.native="closeMenu()">
               <mu-avatar slot="left" icon="star" :size="36" backgroundColor="yellow600"/>
          </mu-list-item>
        </router-link>
        <mu-divider />
         <router-link :to="{path:'/exam',query:{id:'1'}}" v-if="logIn" >
          <mu-list-item class="menu-item" title="Personality Test" @click.native="closeMenu()">
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
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {
      userInfo:{}
    }
  },
  mounted(){
    //应该每次读取后端的信息 
      eventHub.$on('update',this.getInfo)
    
  },
  computed:mapState({
     open: 'open',
     docked: 'docked',
     user:'user',
     logIn:'logIn',
     dialog:'dialog',
     jumpComfirm:'jumpComfirm',
     userHeadUrl:'userHeadUrl'
  }),
  watch:{
    logIn:function(val,oldVal){ //监视登录态，及时异步请求getinfo
      if(val == true){
        eventHub.$emit('update')
        console.warn('!!!!')
      }else{
         console.warn('???')
      }
    }
  },
  methods: {
    getInfo(){
        var self = this
        this.axios.get('/user/getInfo.action')
        .then(function (res) {
          self.userInfo = res.data.object
          self.$store.commit('userHeadUpdate',self.userInfo.userPic)
           self.$store.commit('recordUserId',self.userInfo.userId)
        })
        .catch(function (err) {
          console.log(err)
        })
      },
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
.menu-root{
}
.menu-top{
  position: relative;
  background-color: #7e57c2;
  height: 150px;
}
.menu-item{
  padding-top: 10px;
}
.user-head{
  width: 80px;
  height: 80px;
  top: 60px;
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}
.user-name{
	 	text-align: center;
	 	color: #123;
	 	font-size: 20px;
    width: 256px;
    margin: 0 auto;
    color: #fff;
    bottom: -5px;
   /*  line-height: 150px; *//*与父div height保持一致*/
	 }
   .unlog{
    bottom: 30%;
   }
	 .log-out-btn{
	 	position: absolute;
    	bottom: 0%;
    	left: 50%;
    	transform: translate(-50%,-50%);
      background-color: #d1c4e9;
	 }
   .login-btn{
    bottom: 0%;
    display: block;
    text-align: center;
   }
.mu-list{
  position: absolute;
  top: 150px;
}
.center-horizontal{
  position: absolute;   
      left: 50%;
      transform: translate(-50%,-50%);
}
</style>


