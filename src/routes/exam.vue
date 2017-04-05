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
      {{exam.time}}
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
    <mu-icon class="icon" value="home"/>
      {{exam.tags}}
    </mu-flexbox-item>
  </mu-flexbox>
 </mu-paper>
 <mu-paper class="sub-title">Single select</mu-paper>
 <mu-card v-for="n in 4" :id="'q'+n">
   <mu-card-text>Question{{n}} : choose !!!dassssssss
   ssssssssssssssssssssssssssssssssssssssssss
   ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</mu-card-text>
     <mu-radio label="Choose 1" :name="questions[n]" nativeValue="A" v-model="answer[n]" class="demo-radio"/> <br/>
  <mu-radio label="Choose 2" :name="questions[n]" nativeValue="B" v-model="answer[n]"  class="demo-radio"/> <br/>
  <mu-radio label="Choose 3" :name="questions[n]" nativeValue="C" v-model="answer[n]"  class="demo-radio"/> <br/>
  <mu-radio label="Choose 4" :name="questions[n]" nativeValue="D" v-model="answer[n]"  class="demo-radio"/> <br/>
 </mu-card>
 <mu-paper class="sub-title">Multi selects</mu-paper>
  {{answer}}

  <a href="/exam#q3">
    <mu-float-button icon="add" mini class="demo-float-button"/>
    </a>

</div>

</template>

<script>
	export default {
    data () {
      return {   	
        title:'Exam',
        exam:{
          title:'A simple test in JavaScript & front-end skills',
          time:'90 minutes',
          difficulty:'easy',
          tags:['JavaScript','CSS']
        },
        answer:{
          1:'',2:'',3:'',4:'',
        },
        questions:["q1","q2","q3","q4"]
      }
    },
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
    methods:{
      
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
    margin-left: 30px;
  }
  .mu-float-button{
    position: fixed;
    bottom: 5px;
    right: 5px;
  }
</style>
