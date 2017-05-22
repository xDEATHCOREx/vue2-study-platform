<template>
<div class="learning-root">
 <swiper :options="swiperOption" ref="mySwiper" class="main-swiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in detail.resource.picArray" class="slide"  >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" :src="item">
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
    <swiper-slide v-for="(item,index) in detail.resource.picArray" class="slide"  >
     <div class="swiper-zoom-container">
      <img class="picture swiper-lazy" :src="item">
      </div>
    </swiper-slide>
    <!-- Optional controls -->

    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
<floating-btn @openList="openList" ></floating-btn>
<course-list :open="open" :courseId="detail.resource.courseId" @closeList="closeList"></course-list>

<evaluate 
  :target="target" 
  :toOpenEvaluate="toOpenEvaluate" 
  :resourceId="detail.resourceId"
  :courseId="detail.resource.courseId"
  @closeEvaluate="closeEvaluate"></evaluate>

  <mu-raised-button 
    :disabled="!detail.judged" 
    label="重新评价" 
    class="demo-raised-button" 
    fullWidth 
    secondary
    @click="openEvaluate"/>

</div>
</template>

<script>
import {eventHub} from '../components/Event-hub.js'
import {mapState} from 'vuex'
import floatingBtn from '../components/floatingBtn.vue'
import courseList from '../components/courseList.vue'
import evaluate from '../components/evaluate.vue'
	export default {
    data () {
      return {
        title:'图片资源',
        open:false,
        toOpenEvaluate:false,
        target:'',
        detail: {
          "resourceId": "",
          "resource": {
            "courseId": "",
            "picArray": [
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
               "http://18-newbee.top/img/blank.png",
            ],
            "resourceId": "",
            "resType": "",
            "resourceName": ""
          },
          "judged": ''
        },
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
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
         // slidesPerView : '2',
          zoom:true,//使swiper有双击放大，触摸放缩效果！
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
    watch: {//路由query更新时重新取数据
      '$route':'getResourceDetail'
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      swiper2() {
        return this.$refs.mySwiper2.swiper
      },
       ...mapState({
        evaluated:'evaluated',
         logIn:'logIn',//记录了vuex store中的登录态
      })
    },
    mounted(){
     
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.$store.commit('startLearning')
      eventHub.$emit('updateNav','picture')
      this.swiper2.params.control = this.swiper
      this.swiper.params.control = this.swiper2
      console.warn(this.swiper.params.control)

      this.$store.commit('resetEvaluated')
      
       //获取资源内容（这里是图片资源）
      this.getResourceDetail()

    },
    
    methods:{
       getResourceDetail(){
        //获取资源详细信息
        this.axios.get('/resource/detail.action?resourceId='+this.$route.query.resourceId)
        .then(res =>{
          console.warn(res.data)
          if(res.data.success){
            this.detail = res.data.object
            if(this.detail.judged){
              //调用接口取得数据及是否已评价情况，if已评价
              this.$store.commit('setEvaluated')
               this.target='' //重置内部跳转的缓存
            }else{
              this.$store.commit('resetEvaluated')
             
            }
          }else{
            this.$store.commit('topPopupToggle',res.data.result_msg)
          }
        })
        .catch(err=> {
          console.log(err)
        })


      },
       openList(){
        this.open = true
      },
       closeList(){
        this.open = false
      },
      openEvaluate(){
        this.toOpenEvaluate = true
      },
      closeEvaluate(){
        this.toOpenEvaluate =false
      }
    },
    components:{
      'floating-btn':floatingBtn,
      'course-list':courseList,
      'evaluate':evaluate,
    },
     beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
        this.$store.commit('endLearning')
        if(this.evaluated){  
          this.open = false  //重要！！关闭选择资源的dialog
        console.warn("evaluated:",this.evaluated)   
        next()
      }else{
       if(this.logIn){//这里检查登录状态若已登录才弹出评价！
          this.open = false //重要！！关闭选择资源的dialog
          if(to.path=='/detail'){//判断是初次评价却返回到详情页逻辑
             this.target =  {
              path : 'detail',
              query:{id: this.detail.resource.courseId}
           }
          }else{
            this.target = {
                path : to.path,
                query:{resourceId:to.query.resourceId}
             }
          }   
          this.openEvaluate()//这里带上评价后的目的路由及参数？
          next(false)
           console.warn("evaluated:",this.evaluated)   
        }else{
          next()
        }  
      }
    },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
      if(this.evaluated){  
        this.open = false  //重要！！关闭选择资源的dialog
        console.warn("evaluated:",this.evaluated)   
        next()
      }else{  
        if(this.logIn){//这里检查登录状态若已登录才弹出评价！
          this.open = false //重要！！关闭选择资源的dialog
          this.target = {
              path : to.path,
              query:{resourceId:to.query.resourceId}
           }
          this.openEvaluate()//这里带上评价后的目的路由及参数？
          next(false)
           console.warn("evaluated:",this.evaluated)   
        }else{
          next()
        }
      }
    },
  }
</script>

<style lang="css" scoped>
.main-swiper{
  height: 85%;
}
.preview-swiper{
  height: 15%
}
.picture{
  width: 100%;
}
.demo-raised-button{
  position: fixed;
  bottom: 0px;
}
</style>