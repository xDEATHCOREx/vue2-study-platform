<template>
<div >
  <p class="result-title">Here's your result</p>
   {{score}}
   <chart :chart-data="data"></chart>
   <mu-raised-button 
      label="Start learning" 
      class="demo-raised-button start-btn" 
      secondary
      fullWidth
      @click.native="start"/>
</div>
</template>

<script>
import {mapState,store} from 'vuex'
import chart from '../components/chart'
	export default {
    data () {
      return {
        title:'score',
        data: {}//不能写成null！
      }
    },
    computed:mapState({
      score:'score'
    }),
    mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
      this.fillData()
    },
    methods:{
      fillData(){
        this.data = {//chart的配置项
          labels : ["Active","Sensing","Visual","Sequential","Reflective ","Intuitive","Verbal","Global"],
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
      }
    },
    components:{
      'chart':chart
    },
  }
</script>

<style lang="css" scoped>
 .result-title{
   font-size: 30px;
   margin: 20px 0px;
   padding-top: 10px;
   text-align: center;
 }
 .start-btn{
    position: fixed;
    bottom: 0;
    left: 0;
 }
</style>
