<template>
<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist-demo">
    <mu-sub-header>Courses</mu-sub-header>
    <mu-grid-tile v-for="item, index in list" :key="index">
    <router-link class="link" :to="{path:'/detail',query:{id:item.courseId}}">
      <img :src="item.course.coursePic"/>
    </router-link>
      
      <span class="title" slot="title">{{item.course.courseName}}</span>
      <star-btn :isStarred="item.starred" :courseId="item.courseId" slot="action"></star-btn>
    </mu-grid-tile>
  </mu-grid-list>
</div>

</template>
<script>
import starBtn from './starBtn.vue'
	export default {
    data () {
      return {
       
      }
    },
    mounted(){
     
     
    },
    props:['list'],
    methods:{
      
    },
    components:{
      'star-btn':starBtn
    },
  }
</script>

<style lang="css" scoped>
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding:5px;
}

.gridlist-demo{
  overflow-y: auto;
  width: 100%;
}
.title{
  font-size: 12px;
}
img{
  width: 100%;
  height: 100%;
}
.mu-sub-header{
  line-height: 33px;
}
.link{
    display: block;
    width: 100%;
    height: 100%; 
  }
</style>
