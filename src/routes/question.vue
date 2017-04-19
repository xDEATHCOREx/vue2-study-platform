<template>
<div class="root">
  <mu-card>
  <mu-card-title title="Vue中组件划分和组合使用的问题" subTitle="Vue JavaScript"/>
  <mu-card-text>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
    在vue中引入muse-ui使用单个组件加载，根据muse-ui官网引入相应的文件一直提示these dependencies were not found 这是为什么请大神们帮忙解答
     <br/>
    ..在vue中引入muse-ui使用单个组件加载，根据muse-ui官网引入相应的文件一直提示these dependencies were not found 这是为什么请大神们帮忙解答在vue中引入muse-ui使用单个组件加载，根据muse-ui官网引入相应的文件一直提示these dependencies were not found 这是为什么请大神们帮忙解答
  </mu-card-text>
  <mu-card-actions>
    <mu-flat-button label="△"/>
    <mu-flat-button label="↓"/>
    <mu-icon-menu
        v-if=""
        icon="more_vert"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
        <mu-menu-item title="Delete" />
    </mu-icon-menu>
  </mu-card-actions>
</mu-card>

<mu-card class="answer">
  <mu-card-header title="Myron Avatar" subTitle="Aug 1st">
     <mu-avatar slot="avatar" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-card-header>
  <mu-card-text>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
  <mu-card-actions>
    <mu-flat-button label="Action 1"/>
    <mu-flat-button label="Action 2"/>
  </mu-card-actions>
</mu-card>
<mu-raised-button 
    label="Star" 
    icon="star"
    :iconClass="star"
    class="demo-raised-button btn star-btn" 
    @click.native="checkLogInState('star')"
    primary/>
<mu-raised-button 
    label="Answer" 
    icon=""
    class="demo-raised-button btn answer-btn" 
    @click.native="checkLogInState('answer')" 
    secondary/>

    
</div>



</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
       title:'10 Answers',
       star:'unstar',
       rightBottom: {horizontal: 'right', vertical: 'bottom'},
      }
    },
    mounted(){
     //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)  
    },
    computed:mapState({
      logIn:'logIn',//记录了vuex store中的登录态
    }),
    methods:{
      checkLogInState(type){//收藏需要检查登录态
        console.warn("checking login state",this.logIn)
        if(this.logIn){
          switch (type){
            case 'star' :
              this.toStar()
              break
            case 'answer' :
              this.toAnswer()
              break
            default:
          }
        }else{//记录下当前url并跳转到登录页
          this.$router.push({
              path: '/login',
              query:{redirect:this.$route.fullPath}
            })
        }
      },
      toStar(){//收藏逻辑（发ajax请求及改变样式）
        if(this.star == 'unstar'){
          this.star = 'starred'
        }else{
          this.star = 'unstar'
        }
      },
      toAnswer(){
        console.warn("toAnswer")
      }
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.root{
  margin:56px 10px;

}
.answer{
  margin-top: 10px;
}
.btn{
     width: 50%;
    position: fixed;
    bottom: 0;
}
.answer-btn{
    right: 0;
  }
  .star-btn{
    left: 0;
  }
.mu-icon-menu{
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>