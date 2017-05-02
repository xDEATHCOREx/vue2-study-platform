<template>
<div class="header-root">
  <mu-appbar :title="title" class="header-nav" :class="{hidden : isScroll}" >
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
  mounted: function () {
    this.$nextTick(function () {
    var beforeScrollTop = document.body.scrollTop
      window.addEventListener('scroll',this.debounce(this.onScroll,50)) //若页面在非顶部刷新，刷新后也算做scroll事件被触发
    })
  },
  computed:mapState({
     title:'title',
     isScroll:'isScroll',
  }),
  methods: {
    showMenu(flag) {
      console.info("show Side Menu")
      this.$store.commit('toggle',flag)
    },
     onScroll(){
      var afterScrollTop = document.body.scrollTop
      console.log('onScroll')
      //this.$store.commit('scrolling')
    },
    debounce(func, wait, immediate) {  //scroll的防抖函数
	    var timeout;  
	    return function() {  
	        var context = this, args = arguments;  
	        var later = function() {  
	            timeout = null;  
	            if (!immediate) func.apply(context, args);  
	        };
	        var callNow = immediate && !timeout;  
	        clearTimeout(timeout);  
	        timeout = setTimeout(later, wait);  
	        if (callNow) func.apply(context, args);  
	    };
	},  
  },
  components:{
      'side-menu': menu,
    },
}
</script>

<style lang="css" scoped>
.header-root{
  position: relative;

}
	.demo-raised-button{
	
	}
	.header-nav{
		position: fixed;
		top: 0;
		z-index:100;/*保持最大除了遮罩层和侧滑菜单*/
		transition: top .5s;
	}
	.hidden{
		top:-56px;
	}
</style>
