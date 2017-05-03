<template>
<div>
 <mu-card>
   <mu-card-media class="title-pic" title="课程标题" subTitle="副标题">
    <img src="../assets/img/a10.jpg"  />

     <star-btn  class="star-btn" ></star-btn>

  </mu-card-media>
  <mu-card-text>
    <p>课程简介</p>
    简介内容：散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
</mu-card>
 <mu-list>
  <mu-sub-header>请选择学习资源：</mu-sub-header>
  <mu-divider/>
    <mu-list-item title="5分钟学会前端" :to="{path:'/video'}">
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="关于java的100条知识" :to="{path:'/article'}">
      <mu-icon slot="left" value="edit" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="Vue组件生命周期图解" :to="{path:'/picture'}">
      <mu-icon slot="left" value="image" />
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="苍老师陪你学JS" :to="{path:'/video'}">
      <mu-icon slot="left" value="subscriptions"/>
    </mu-list-item>
     <mu-divider/>
    <mu-list-item title="C语言设计基础" :to="{path:'/article'}">
      <mu-icon slot="left" value="edit" />
    </mu-list-item>

  </mu-list>

</div>

</template>

<script>
import {mapState} from 'vuex'
import starBtn from './starBtn.vue'
	export default {
    data () {
      return {
      	
        title:'简介',
         star:'unstar',
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    computed:{
      ...mapState({
        logIn:'logIn',//记录了登录态    
        userId:'userId',
      })
    },
    methods:{
       checkLogInState(){//收藏需要检查登录态
        console.warn("checking login state",this.logIn)
        if(this.logIn){
          this.toStar()
        }else{//记录下当前url并跳转到登录页
          this.$router.push({
              path: '/login',
              query:{redirect:this.$route.fullPath}
            })
        }
      },
      toStar(){//收藏逻辑（发ajax请求及改变样式）
       // this.disabled = true //暂时禁用收藏按钮
        if(this.star == 'unstar'){
          //这里调用收藏接口
         this.starRequest('save')
         
        }else{
          //这里调用取消收藏
          this.starRequest('del')
        }
      },
    },
    components:{
      'star-btn':starBtn
    },
  }
</script>

<style lang="css" scoped>
.title-pic{
  position: relative;
}
.star-btn{
      position: absolute;
    bottom: 20px;
    right: 5px;
    z-index: 2017;
    color: white;
}
</style>
