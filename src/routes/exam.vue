<template>
<div>
<div class="exam-root">
 <mu-paper class="demo-paper" :zDepth="3" >
  <h3>{{exam.title}}</h3>
  <mu-flexbox align="stretch" class="flexbox">
     <mu-flexbox-item class="flex-demo">
     <mu-icon class="icon" value="flight"/>
      {{exam.difficulty}}
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
    <mu-icon class="icon" value="watch"/>
      {{exam.time+' minutes'}}
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
    <mu-icon class="icon" value="home"/>
      {{exam.tags}}
    </mu-flexbox-item>
  </mu-flexbox>
  <mu-content-block>
    {{exam.summary}}
  </mu-content-block>
 </mu-paper>

 <mu-paper class="sub-title">Single select</mu-paper>
 <mu-card v-for="(item, index) in list" :id="'question'+(index+1)">
  <mu-card-media v-if="item.pic_url">
    <img :src="item.pic_url" />
  </mu-card-media>
  <mu-card-text>Question{{index+1}} : {{item.question}}
  </mu-card-text>
     <mu-radio v-if="item.option1" :label="'A、'+item.option1" :name="questions[index]" nativeValue="a" v-model="answer[index+1]" class="demo-radio first"/> <br v-if="item.option1" />
  <mu-radio v-if="item.option2" :label="'B、'+item.option2" :name="questions[index]" nativeValue="b" v-model="answer[index+1]"  class="demo-radio"/> 
  <br v-if="item.option2" />
  <mu-radio v-if="item.option3" :label="'C、'+item.option3" :name="questions[index]" nativeValue="c" v-model="answer[index+1]"  class="demo-radio"/> 
  <br v-if="item.option3" />
  <mu-radio v-if="item.option4" :label="'D、'+item.option4" :name="questions[index]" nativeValue="d" v-model="answer[index+1]"  class="demo-radio" />  <br v-if="item.option4" />
 </mu-card>

<!--  <mu-card>
  <mu-card-text>Question{{1}} : choose !!!{{multiSelectAnswer[1]}}
 </mu-card-text>
     <mu-checkbox name="group" nativeValue="checkbox1" v-model="multiSelectAnswer[1]" label="checkbox1" class="demo-checkbox"/> <br/>
   <mu-checkbox name="group" nativeValue="checkbox2" v-model="multiSelectAnswer[1]" label="checkbox2" class="demo-checkbox"/> <br/>
   <mu-checkbox name="group" nativeValue="checkbox3" v-model="multiSelectAnswer[1]" label="checkbox3" class="demo-checkbox"/> <br/>
</mu-card> -->

  
<!-- 
 <mu-paper class="sub-title" v-for="x in 20" >
  <a class="target-fix" :id="'type'+x"></a>
  Multi selects{{x}}
 </mu-paper>
 -->

    <mu-icon-menu
        icon="add"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
      <!--  <a href="#question10">
       <mu-menu-item title="question10" />
            </a> -->
       <a href="javascript:void(0)" @click='intoView(1)'>
        <mu-menu-item title="第一题" />
       </a>
       <a href="javascript:void(0)" @click='intoView(10)'>
        <mu-menu-item title="第十题" />
       </a>
       <a href="javascript:void(0)" @click='intoView(20)'>
        <mu-menu-item title="第二十题" />
       </a>
       <a href="javascript:void(0)" @click='intoView(30)'>
        <mu-menu-item title="第三十题" />
       </a>
       <a href="javascript:void(0)" @click='intoView(40)'>
        <mu-menu-item title="第四十题" />
       </a>
    </mu-icon-menu>
</div>
<mu-raised-button 
    label="提交" 
    class="demo-raised-button submit-btn" 
    secondary
    @click="submitAnswer"
    :disabled="disabled"
    fullWidth/>
</div>
</template>

<script>
import testJson from '../assets/json/test.json'
import {mapState} from 'vuex'
import {eventHub} from '../components/Event-hub.js'
	export default {
    data () {
      return {   	
        title:'测试',
        rightBottom: {horizontal: 'right', vertical: 'bottom'},
        exam:{
          title:'A simple test in JavaScript & front-end skills',
          time:'90',
          difficulty:'easy',
          tags:['JavaScript','CSS']
        }, 
        multiSelectAnswer:{
          1:[],
          2:[],
        },
        questions:["q1","q2","q3","q4"],   
        list : [],//存储所有题目的数组
        answer:{1:"a"},//存储单选回答的对象
        letter: /[a-z]/g,
        answers:'abbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabba',
        disabled:true,
        answerLength:0,
      }
    },
    created(){

    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)

      if(this.$route.query.id==1){//id为1时是性格测试，载入对应json文件,先不用
        
      }
      this.list = testJson.result.list
        this.exam = {
          title: testJson.result.title,
          time: testJson.result.time,
          difficulty : testJson.result.difficulty,
          tags : testJson.result.type,
          summary : testJson.result.summary
        }
        var temp ={}
        for(var i=1 ;i<=testJson.result.total;i++){
          temp[i] = 'b'
        }
        temp[1]='a'//设置一个默认的答案
        this.answer = temp

      //获取题目内容，通过接口get，参数是id=xxx是试卷代号
      
      /*this.axios.get('../assets/json/test.json')
        .then(res =>{
          console.warn(res)
        })
        .catch(err =>{
          console.warn(err)
        })    */
    },
    computed:mapState({
      jumpConfirm:'jumpConfirm',
      logIn:'logIn'
    }),
    watch:{
      answer:{
        handler: function (val, oldVal) {
            this.answerLength = JSON.stringify(val).match(this.letter).length
              console.warn(this.answerLength)
              if(this.answerLength+""== testJson.result.total){//选择题目的数量和题目总数相等时启用按钮
                this.disabled = false 
              }
        },
        deep: true
      } 
    },
    methods:{
      intoView(index){
        var type = document.getElementById('question'+index)
        if(typeof type.scrollIntoViewIfNeeded == "function"){ //支持将元素显示在页面中间
          type.scrollIntoViewIfNeeded(true)
        }
        else{
          type.scrollIntoView(false)
        }
      },
      submitAnswer(){//提交答案
        console.warn(JSON.stringify(this.answer).match(this.letter).join(""))//答案对象转为post用的字符串
        var formatAnswers = JSON.stringify(this.answer).match(this.letter).join("")    
         this.axios({
              url: '/style/test.action',
              method: 'post',
              data: {
                    params:formatAnswers
              },
            })
      .then(res=>{
        console.warn(res,res.data)
        this.$store.commit('recordScore',res.data.object)
        //emit提交使侧滑菜单改变路由
        eventHub.$emit('updateTestStatus')
        this.$router.push({
          path: '/score'
        })
      })
      .catch(err =>{
        console.warn(err)
      })  
      }
    },
    components:{

    },
    beforeRouteLeave (to, from, next) {//可用于编写在离开此路由前的逻辑
      //之后可能还要加个提交态，判断是提交后跳转还是非提交跳转
        if(this.logIn == true){//已登录
          console.warn("leaving to:",to.fullPath)
          this.$store.commit('dialogToggle',{
            info : '确认到 '+to.name+'中？',
            title : '确认',
            event : 'jump',
            jumpTo : to.fullPath
          })
          if(this.jumpConfirm){
             next()
          }
        }else{//若在此路由点击了menu的登出按钮改变了登录态直接不执行确认逻辑
          next()
        }
    },
  }
</script>

<style lang="css" scoped>
.exam-root{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
     -moz-overflow-scrolling: touch; 
     -ms-overflow-scrolling: touch;
     overflow-scrolling: touch;
     height: 100%;
}
  .demo-paper{
     display: block;
  width: 95%;
  margin: 20px auto;
  text-align: center;
  padding-top: 10px;
  }
  .flexbox{
    text-align: center;
  }
  .flex-demo{
    border-right:1px solid grey;
  }
   .flex-demo:last-child{
    border:0;
   }
  .icon{
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .sub-title{
    display: block;
    height: 40px;
    text-align: center;
    width: 95%;
    margin: 20px auto;
  
  padding-top: 10px;
  }
  .mu-card{
    margin:10px;
  }
  .mu-radio.first{/* 多一个空格都不行 */
    margin-top: 0px;
  }

  .mu-radio{
    margin-left: 15px;
    margin-top: 35px;
    display: block;
  }
  
  .mu-radio-wrapper{
    position:relative;
  }

  .label{
    position:absolute;
    top: 0px;
  }
  .mu-icon-menu{
    position: fixed;
    bottom: 36px;
    right: 5px;
  }
  .target-fix { /*暗锚的样式*/
    position: relative;
    top: -80px; 
    display: block;
    height: 0;
    overflow: hidden;
  }
  .submit-btn{
    position: fixed;
    bottom: 0px;
  }
</style>
