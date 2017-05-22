import {Radar,mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default Radar.extend({
  /*data () {
    return {
      datacollection: {
        labels : ["Active","Sensing","Visual","Sequential","Reflective ","Intuitive","Verbal","Global"],
  datasets : [
    {
      label: 'Result',
      backgroundColor: 'rgba(126,87,194,0.5)',
      data : [3,10,4,6,8,1,7,5]
    }
  ]
      }
    }
  },*/

  mixins: [reactiveProp],//使父组件传过来的数据是响应式的，参见chart文档
  //props: ['data'],
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
})