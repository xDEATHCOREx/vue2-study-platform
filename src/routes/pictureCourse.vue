<template>
<div class="learning-root">
 <swiper :options="swiperOption" ref="mySwiper" class="main-swiper">
    <!-- slides -->
    <swiper-slide class="slide" id="slide1" >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" src="../assets/img/test01.jpg">
      </div>
    </swiper-slide>
    <swiper-slide class="slide" id="slide2">
      <div class="swiper-zoom-container">
    <img class="picture swiper-lazy" src="../assets/img/test02.jpg">
     </div>
    </swiper-slide>
    <swiper-slide class="slide"  >
    <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" src="../assets/img/test03.jpg">
      </div>
    </swiper-slide>
    <swiper-slide class="slide"  >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" src="../assets/img/test05.jpg">
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
 <swiper :options="swiperOption2" ref="mySwiper2" class="preview-swiper">
    <!-- slides -->
    <swiper-slide class="slide" id="slide1" >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" src="../assets/img/test01.jpg">
      </div>
    </swiper-slide>
    <swiper-slide class="slide" id="slide2">
      <div class="swiper-zoom-container">
    <img class="picture swiper-lazy" src="../assets/img/test02.jpg">
     </div>
    </swiper-slide>
    <swiper-slide class="slide"  >
    <div class="swiper-zoom-container">
      <img class="picture swiper-lazy"  src="../assets/img/test03.jpg">
      </div>
    </swiper-slide>
    <swiper-slide class="slide"  >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" src="../assets/img/test05.jpg">
      </div>
    </swiper-slide>
    <!-- Optional controls -->

    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
<floating-btn @openList="openList"></floating-btn>
<course-list :open="open" @closeList="closeList"></course-list>
</div>
</template>

<script>
import {eventHub} from '../components/Event-hub.js'
import floatingBtn from '../components/floatingBtn.vue'
import courseList from '../components/courseList.vue'
	export default {
    data () {
      return {
        title:'picCourse',
        open:false,
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
          //loop : true,//loop模式：会在原本slide前后复制若干个slide并在合适的时候切换，让Swiper看起来是循环的。 【bug：循环后页面的链接跳转会重新加载，暂时不用】
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          //lazyLoading : true,//设置lazyload
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
         // slidesPerView : '2',
          zoom:true,
          lazyLoading : true,
         // loop:true,
          onTransitionStart(swiper){
            //console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        },
        swiperOption2:{       
          notNextTick: true,
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
          debugger: true,
         slidesPerView : 4,
          centeredSlides : true,//重要！！！使slide居中
          lazyLoading : true,
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          //loop:true,
          onTransitionStart(swiper){
            //console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }

      }   
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      swiper2() {
        return this.$refs.mySwiper2.swiper
      },
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.$store.commit('startLearning')
      eventHub.$emit('updateNav','picture')
      this.swiper2.params.control = this.swiper
      this.swiper.params.control = this.swiper2
      console.warn(this.swiper.params.control)
      console.warn(this.swiper2)
    },
    
    methods:{
       openList(){
        this.open = true
      },
       closeList(){
        this.open = false
      },
    },
    components:{
      'floating-btn':floatingBtn,
      'course-list':courseList,
    },
     beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
        this.$store.commit('endLearning')
        next()
    },
  }
</script>

<style lang="css">
.main-swiper{
  height: 85%;
}
.preview-swiper{
  height: 15%
}
.picture{
  width: 100%;
}
</style>