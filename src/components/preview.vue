<template>
<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist-demo">
    <mu-sub-header>Courses</mu-sub-header>
    <mu-grid-tile v-for="tile, index in list" :key="index">
    <router-link class="link" :to="{path:'/detail',query:{id:'4'}}">
      <img src="../assets/img/a5.jpg"/>
    </router-link>
      
      <span slot="title">{{tile.title}}</span>
      <span slot="subTitle">by <b>{{tile.author}}</b></span>
      <mu-icon-button icon="star_border" slot="action"/>
    </mu-grid-tile>
  </mu-grid-list>
</div>

</template>

<script>
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
