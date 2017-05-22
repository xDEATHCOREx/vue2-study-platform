<template>
<div class="score-root">
  <p class="result-title">您的测试结果如下：</p>
 <!--   {{score}} -->
   <chart :chart-data="data"></chart>
   <mu-raised-button 
      label="重新测试" 
      class="demo-raised-button retest-btn" 
      primary
      :to="{path:'exam',query:{id:1}}"/>

   <mu-raised-button 
      label="进入学习" 
      class="demo-raised-button start-btn" 
      secondary      
      @click.native="start"/>

 <mu-raised-button label="学习风格介绍" ref="button" @click="toggle"/>

<mu-popover 
  :open="openMenu" 
  :autoPosition="false" 
  :trigger="trigger" 
  :anchorOrigin="anchorOrigin" 
  :targetOrigin="targetOrigin" 
  @close="handleClose">
   <mu-menu>
      <mu-menu-item title="活跃型" @click="openIntro('活跃型',detail.active)"/>
      <mu-menu-item title="沉思型" @click="openIntro('沉思型',detail.reflective)"/>
      <mu-menu-item title="感悟型" @click="openIntro('感悟型',detail.sensing)"/>
      <mu-menu-item title="直觉型" @click="openIntro('直觉型',detail.intuitive)"/>
      <mu-menu-item title="视觉型" @click="openIntro('视觉型',detail.visual)"/>
      <mu-menu-item title="言语型" @click="openIntro('言语型',detail.verbale)"/>
      <mu-menu-item title="序列型" @click="openIntro('序列型',detail.sequentiale)"/>
      <mu-menu-item title="综合型" @click="openIntro('综合型',detail.global)"/>
    </mu-menu>
  </mu-popover>

  <pop-bottom :open="open" :title="introTitle" :detail="introDetail" @close="closeIntro"></pop-bottom>
</div>
</template>

<script>
import {mapState,store} from 'vuex'
import chart from '../components/chart'
import popBottom from '../components/popBottom.vue'
	export default {
    data () {
      return {
        title:'得分',
        data: {},//不能写成null！
        open:false,
        openMenu:false,
        trigger:null,
        introTitle:'',
        introDetail:'',
        detail:{
          active:'从信息加工的角度看，您的学习风格偏向于活跃型，那么您会倾向于和别人一起做事或讨论，喜欢和团体一起来解决问题。您可以多关注“学习支持服务”中的“我的学伴”，“我来出题”和“活学活用”等模块。和众多网友一起讨论，学习，或者帮助他人提出问题。',
          sensing:'从信息感知的角度看，您的学习风格偏向于感悟型，那么您可能很擅长记忆事实和做一些现成的工作，对复杂和突发的情况感到反感。您应当多看一些相关的案例，平时多记录一些有用的心得体会。而在“课程学习”中的“案例学习”和“学习支持服务中”的“学习笔记”都能给您提供帮助。',
          visual:'从信息输入的角度看，您的学习风格偏向于视觉型，那么你就一定是用眼睛学习一切学习材料。你应当多使用图片、图表、流程图、图像、影片等视觉辅助性工具。要多使用“课程学习”中的“知识概览”和“视频导学”，练习将词汇或概念等在脑海里视觉化或形成图象，并及时回顾。',
          sequential:'',
          reflective:'4',
          intuitive:'5',
          verbal:'6',
          global:'从信息理解的角度看，您的学习风格偏向于综合型，那么您可能习惯大步学习，吸收没有任何联系的随意的材料，然后突然获得它。或许您能更快地解决复杂问题，或者一旦您抓住了主要部分就用新奇的方式将它们组合起来，但您却很难解释清楚他们是如何工作的。您应当多看看“综合案例学习”，及有关的案例。您也可以到“学习答疑”那里试着解决问题。',
        },
        anchorOrigin: {"vertical":"top","horizontal":"middle"},
        targetOrigin: {"vertical":"bottom","horizontal":"middle"}
      }
    },
    computed:mapState({
      score:'score' //得分存在vuex的store中
    }),
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      //调用接口取得分数
      this.getScore()

      this.trigger = this.$refs.button.$el
     
    },
    methods:{
      getScore(){
         this.axios.get('style/getDimension.action')
        .then(res => {
          console.warn(res)
          if(res.data.success){
            //已经过测试，分数填到store中的score中
            this.$store.commit('recordScore',res.data.object)
             //填充图表
             this.fillData()
          }else{
             //填充图表
            this.fillData()
          }
        })
        .catch(err=> {
          console.log(err)
        })
      },
      fillData(){
        this.data = {//chart的配置项
          labels : ["活跃型","感悟型","视觉型","序列型","沉思型","直觉型","言语型","综合型"],
          datasets : [{
            label: 'Result',
            backgroundColor: 'rgba(126,87,194,0.5)',
            borderColor: '#673ab7',
            pointBorderColor: '#ff4081',
            data : [this.score.active,this.score.sensing,this.score.visual,this.score.sequential,this.score.reflective,this.score.intuitive,this.score.verbal,this.score.global]
            //
          }]
        }
      console.warn(this.score.active,this.score.reflective,this.score.sensing,this.score.intuitive)
      console.warn(this.data.datasets[0].data,"heyyy")
      },
      start(){
        this.$router.push({ 
              path : '/'
            })
      },
      openIntro(title,detail){
        this.introTitle = title
        this.introDetail = detail
        this.open = true
      },
      closeIntro(){
        this.open = false
      },
      toggle () {
      this.openMenu = !this.openMenu
    },
      handleClose () {
        this.openMenu = false
      },
    },
    components:{
      'chart':chart,
      'pop-bottom':popBottom
    },
  }
</script>

<style lang="css" scoped>
.score-root{
  overflow: auto;
  text-align: center;
}
 .result-title{
   font-size: 30px;
   margin: 20px 0px;
   padding-top: 10px;
   text-align: center;
 }
 .retest-btn{
  position: fixed;
    bottom: 0;
    left: 0;
    width: 50%;
 }
 .start-btn{
    position: fixed;
    bottom: 0;
    right: 0;
    width: 50%;
 }
</style>
