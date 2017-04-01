<template>
<div>
  <mu-appbar :title="title">
  	<mu-icon-button icon='menu' slot="left" label="undocked drawer" @click="showMenu(true)"/>
  	<mu-icon-button icon='expand_more' slot="right"/>
  </mu-appbar>
  <side-menu ></side-menu>
</div>
</template>

<script>
import {mapState} from 'vuex'
import menu from './menu.vue'
export default {
  data () {
    return {

    }
  },
  computed:mapState({
     title:'title',
  }),
  methods: {
    showMenu(flag) {
      console.info("show Side Menu")
      this.$store.commit('toggle',flag)
    }
  },
  components:{
      'side-menu': menu,
    },
}
</script>

<style lang="css" scoped>
	.demo-raised-button{
	
	}
</style>
