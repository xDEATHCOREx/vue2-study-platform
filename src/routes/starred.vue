<template>
<div>

 <mu-tabs :value="activeTab" @change="handleTabChange">
  <mu-tab value="tab1" icon="phone" title="QUESTIONS"  @click.native="confirm('Confirm to jump to detail?','Jump?','jump','/detail')"/>
  <mu-tab value="tab2" icon="favorite" title="COURSES"/>
</mu-tabs>
<div v-if="activeTab === 'tab1'">
    <h2>Tab One</h2>
    <p>
      这是第一个 tab
    </p>
  </div>
  <div v-if="activeTab === 'tab2'">
    <h2>Tab Two</h2> 
    <router-link class="link" :to="{path:'/detail'}">
   <mu-card class="personal-card" v-for="n in 6">
    <mu-card-header :title="title" subTitle="sub title">
      <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
    </mu-card-header>
   </mu-card>
   </router-link>
  </div>
</div>

</template>

<script>
	export default {
    data () {
      return {
        activeTab: 'tab1',
        title:'Starred',
        n:'1'
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //接下来应该从接口取得收藏过的问题/课程列表，然后渲染
    },
    methods:{
      handleTabChange (val) {
        this.activeTab = val
      },
      confirm(info,title,event,jumpTo){
      this.$store.commit('dialogToggle',{
        info : info,
        title : title,
        event : event,
        jumpTo : jumpTo
      })
      console.warn(event,"test")
    },
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.personal-card{
    margin: 15px auto;
    width: 95%;
  }
</style>
