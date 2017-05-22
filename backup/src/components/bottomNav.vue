<template>
<div class="bottom-nav-root">
<mu-paper>
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item 
      value="video" 
      title="Video" 
      icon="subscriptions"
      :to="{path:'/video'}"
      replace/>
    <mu-bottom-nav-item 
      value="picture" 
      title="Picture" 
      icon="image"
      :to="{path:'/picture'}"
      replace/>
    <mu-bottom-nav-item 
      value="article" 
      title="Article" 
      icon="edit"
      :to="{path:'/article'}"
      replace/>
  </mu-bottom-nav>
</mu-paper>
</div>
</template>

<script>
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {
      bottomNav: 'video'
    }
  },
  mounted(){
      eventHub.$on('updateNav',this.handleChange)
    
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
<style lang="css" scoped>
  .bottom-nav-root{
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
</style>
