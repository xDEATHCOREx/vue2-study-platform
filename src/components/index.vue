<template>
<div>
	 <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide class="slide" id="slide1" >
    	<router-link class="link" :to="{path:'/detail',query:{id:'1'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide2">
    	<router-link class="link" :to="{path:'/detail',query:{id:'2'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide3">
    	<router-link class="link" :to="{path:'/detail',query:{id:'3'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide4">
    	<router-link class="link" :to="{path:'/detail',query:{id:'4'}}"></router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
  <preview :list="list"></preview>
  <preview :list="list2"></preview>
  <p class="copyright">Copyright © 2017 Minhan Li</p>
</div>
</template>

<script>
import preview from './preview.vue'
 export default {
    name: 'Main',
    data() {
      return {
      list: [{
        image: '../assets/img/a1.jpg',
        title: 'Breakfast',
        author: 'Myron'
      }, {
        image: '../../src/assets/img/a9.jpg',
        title: 'Burger',
        author: 'Linyu'
      }, {
        image: '../../src/assets/img/a8.jpg',
        title: 'Camera',
        author: 'ruolin'
      }, {
        image: '../../src/assets/img/a10.jpg',
        title: 'Hats',
        author: 'kakali'
      }],
      list2: [{
        image: '../../src/assets/img/a3.jpg',
        title: 'Test',
        author: 'fuck'
      }, {
        image: '../../src/assets/img/a4.jpg',
        title: 'check',
        author: 'Linyu'
      }, {
        image: '../../src/assets/img/a5.jpg',
        title: 'heyyyyyyyyyyyy',
        author: 'ruolin'
      }, {
        image: '../../src/assets/img/a6.jpg',
        title: 'Hats',
        author: 'xxxxxxxxxxxxxx'
      }],
      	title:'Index',
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
         // autoplay: 3000,
          //direction : 'vertical',
          grabCursor : true,
          setWrapperSize :true,
         // autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          //lazyLoading : true,//设置lazyload
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            //console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    components:{
    	'preview': preview
    },
    mounted() {
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      //console.log('this is current swiper instance object', this.swiper)   
      //this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style lang="css" scoped>
	.slide{
		width: 100%;
		height: 100%;	
		background-size: 100% 100%;
	  background-repeat: no-repeat;	
	}
	.swiper{
		width: 100%;
		height: 200px;
	}
	.link{
		display: block;
		width: 100%;
		height: 100%;	
	}
	#slide1{
	  background-image: url('../assets/img/a1.jpg');
	  
	}
	#slide2{
	  background-image: url('../assets/img/a2.jpg');
	}
	#slide3{
	  background-image: url('../assets/img/a3.jpg');
	}
	#slide4{
	  background-image: url('../assets/img/a5.jpg');
	}
	.copyright{
		font-size: 0.5rem;
    	color: #B7BBBf;
    	text-align: center;
	}
</style>
