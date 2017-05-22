<template>
<div class="index-root">
	 <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <!-- slides -->
    <swiper-slide class="slide" id="slide1" >
    	<router-link class="link" :to="{name:'video',params:{resourceId:'10001'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide2">
    	<router-link class="link" :to="{name:'exam',query:{id:'3'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide3">
    	<router-link class="link" :to="{path:'/detail',query:{id:'3'}}"></router-link>
    </swiper-slide>
    <swiper-slide class="slide" id="slide4">
    	<router-link class="link" :to="{path:'/detail',query:{id:'4'}}"></router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
  <preview :list="list"></preview>
  <!-- <preview :list="list2"></preview> -->
  <p class="copyright">Copyright © 2017 Minhan Li</p>
</div>
</template>

<script>
import preview from './preview.vue'
import {eventHub} from './Event-hub.js'
 export default {
    //name: 'Main',
    data() {
      return {
      title:'学习平台',
      list: [{
      "courseId": "",
      "course": {
        "courseId": "",
        "courseName": "",
        "coursePic": ""
      },
      "starred": ""
    },],
      list2: [{
        image: '../../src/assets/img/a3.jpg',
        title: 'Test',
        author: 'f'
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
          autoplay: 3000,
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
          loop : true,//loop模式：会在原本slide前后复制若干个slide并在合适的时候切换，让Swiper看起来是循环的。 【bug：循环后页面的链接跳转会重新加载，暂时不用】
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
    methods:{
      getCourses(){
        //获取课程信息
        this.axios.get('/course/summary.action')
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.list = res.data.object
          }else{

          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
      resetStar(){
        console.warn("resettttt")
        for(var i=0;i<this.list.length;i++){
          this.list[i].starred = false
        }
      }
    },
    components:{
    	'preview': preview
    },
    mounted() {
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.getCourses()
      eventHub.$on('resetStar',this.resetStar)
    }
  }
</script>

<style lang="css" scoped>
.index-root{
  overflow: visible;
}
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
