<template>
<div>
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
 </mu-paper>
 <mu-paper class="sub-title">Single select</mu-paper>
  {{answer}}

 <mu-card v-for="(item, index) in list" >
   <mu-card-text>Question{{index+1}} : {{item.question}}
  </mu-card-text>
     <mu-radio v-if="item.option1" :label="'A、'+item.option1" :name="questions[index]" nativeValue="A" v-model="answer[index+1]" class="demo-radio"/> <br/>
  <mu-radio v-if="item.option2" :label="'B、'+item.option2" :name="questions[index]" nativeValue="B" v-model="answer[index+1]"  class="demo-radio"/> <br/>
  <mu-radio v-if="item.option3" :label="'C、'+item.option3" :name="questions[index]" nativeValue="C" v-model="answer[index+1]"  class="demo-radio"/> <br/>
  <mu-radio v-if="item.option4" :label="'D、'+item.option4" :name="questions[index]" nativeValue="D" v-model="answer[index+1]"  class="demo-radio"/>  <br/>
 </mu-card>

 <mu-card>
   <mu-card-text>Question{{1}} : choose !!!{{multiSelectAnswer[1]}}
  </mu-card-text>
      <mu-checkbox name="group" nativeValue="checkbox1" v-model="multiSelectAnswer[1]" label="checkbox1" class="demo-checkbox"/> <br/>
    <mu-checkbox name="group" nativeValue="checkbox2" v-model="multiSelectAnswer[1]" label="checkbox2" class="demo-checkbox"/> <br/>
    <mu-checkbox name="group" nativeValue="checkbox3" v-model="multiSelectAnswer[1]" label="checkbox3" class="demo-checkbox"/> <br/>
 </mu-card>

 <mu-paper class="sub-title" v-for="x in 20" >
  <a class="target-fix" :id="'type'+x"></a>
  Multi selects{{x}}
 </mu-paper>


    <mu-icon-menu
        icon="add"
        :anchorOrigin="rightBottom"
        :targetOrigin="rightBottom">
      <a :href="'#type'+a" v-for="a in 4">
        <mu-menu-item :title="'type'+a" />
      </a>
       <a href="#type10">
        <mu-menu-item title="Send feedback" />
      </a>
       <a href="javascript:void(0)" @click='intoView(8)'>
        <mu-menu-item title="Settings" />
       </a>
    </mu-icon-menu>
</div>

</template>

<script>
import testJson from '../assets/json/test.json'
	export default {
    data () {
      return {   	
        title:'Exam',
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
        answer:{},//存储单选回答的对象
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)

      if(this.$route.query.id==1){
        this.list = testJson.result.list
        this.exam = {
          title: testJson.result.title,
          time: testJson.result.time,
          difficulty : testJson.result.difficulty,
          tags : testJson.result.type,
        }
        var temp ={ }
        for(var i=1 ;i<=testJson.result.total;i++){
          temp[i] = ''
        }
        this.answer = temp
      }
      //获取题目内容，通过接口get，参数是id=xxx是试卷代号
      
      /*this.axios.get('../assets/json/test.json')
        .then(res =>{
          console.warn(res)
        })
        .catch(err =>{
          console.warn(err)
        })    */
    },
    created(){
      //this.$store.commit('setJumpConfirm')
    },
    methods:{
      intoView(index){
        var type = document.getElementById('type'+index)
        if(typeof type.scrollIntoViewIfNeeded == "function"){ //支持将元素显示在页面中间
          type.scrollIntoViewIfNeeded(true)
        }
        else{
          type.scrollIntoView(false)
        }
      }
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
  .demo-paper{
     display: block;
  height: 200px;
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
  .mu-radio{
    margin-left: 15px;
    display: block;
  }

  .mu-radio-wrapper{
    position:relative;
  }

  .mu-radio-label{
    position:absolute;
    top: 0px;
  }
  .mu-icon-menu{
    position: fixed;
    bottom: 5px;
    right: 5px;
  }
  .target-fix { /*暗锚的样式*/
    position: relative;
    top: -80px; 
    display: block;
    height: 0;
    overflow: hidden;
  }
</style>
