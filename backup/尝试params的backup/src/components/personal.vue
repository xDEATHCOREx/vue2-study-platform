<template>
<div class="personal-root">
<mu-card class="personal-card">
  <mu-card-header :title="userInfo.userNickname" :subTitle="userInfo.userSignature">
    <mu-avatar :src="userInfo.userPic" slot="avatar"/>
      <mu-icon-button  id="personal-icon" icon="account_box" @click="jump('/personalInfo')"/>  
  </mu-card-header>
</mu-card>
  <mu-list class="personal-list">
    <mu-list-item title="我的问题" @click="jump('/questions','tab3')">
      <mu-icon slot="left" value="help"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="收藏" @click="jump('/starred')" >
      <mu-icon slot="left" value="grade"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="修改密码" @click="changePassword()">
      <mu-icon slot="left" value="send"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="Drafts">
      <mu-icon slot="left" value="drafts"/>
    </mu-list-item>
  </mu-list>
  <mu-divider />
 <change :open="open"></change>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {eventHub} from './Event-hub.js'
import change from './passwordChange.vue'
	export default {
    data () {
      return {
        title:'个人中心',
        userInfo:{},
        open:false,
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //应该每次读取后端的信息 
      this.getInfo()
      eventHub.$on('close',this.closeAction)
    },
    computed:mapState({
     user:'user'
    }),
    methods:{
      getInfo(){
        var self = this
        this.axios.get('/user/getInfo.action')
        .then(function (res) {
          self.userInfo = res.data.object
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      jump(route,query){
        this.$router.push({
              path:route,
              query:{target:query}
            })
      },
      changePassword(){
        this.open = true
      },
      closeAction(key){
        this.open = key
      }
    },
    components:{
      'change':change
    },
  }
</script>

<style lang="css" scoped>
  .personal-root{
 
  }
  .personal-card{
    margin: 5px auto;
    width: 95%;
  }
  #personal-icon{
    position: absolute;
    right: 0;
  }
  .mu-list{
    margin: 0px auto;
    width: 95%;
  }

</style>
