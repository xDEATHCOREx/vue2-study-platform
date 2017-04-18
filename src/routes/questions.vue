<template>
<div>
 <p>questions</p>
<mu-raised-button 
  label="Ask something" 
  class="demo-raised-button ask-btn" 
  touch="true" 
  secondary 
  fullWidth 
  @click.native="jumpToAsk"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
       title:'Questions',
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
  computed:mapState({
    
  }),
  methods: {
    jumpToAsk(){
       this.$router.push({
              path: '/ask'
            })
    }
  },
  components:{
    },

}
</script>

<style type="text/css" scoped>	
.ask-btn{
    position: fixed;
    bottom: 0;
  }
</style>


