<template>
<div class="personal-root">
<mu-card class="personal-card">
  <mu-card-header :title="user" subTitle="sub title">
    <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
      <mu-icon-button  id="personal-icon" icon="android" @click="jump('/personalInfo')"/>   
  </mu-card-header>
</mu-card>
  <mu-list class="personal-list">
    <mu-list-item title="Inbox">
      <mu-icon slot="left" value="inbox"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="Starred" @click="jump('/starred')" >
      <mu-icon slot="left" value="grade"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="Sent mail">
      <mu-icon slot="left" value="send"/>
    </mu-list-item>
    <mu-divider />
    <mu-list-item title="Drafts">
      <mu-icon slot="left" value="drafts"/>
    </mu-list-item>
  </mu-list>
  <mu-divider />
 
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
        title:'personal',
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    computed:mapState({
     user:'user'
    }),
    methods:{
      jump(route){
        this.$router.push({
              path:route
            })
      }
    },
    components:{
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
