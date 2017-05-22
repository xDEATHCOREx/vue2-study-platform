<template>
<div>
 <mu-circular-progress v-if="isLoading" :size="40"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
	export default {
    data () {
      return {
      }
    },
    mounted(){
    },
    computed:mapState({
     isLoading:'isLoading', 
    }),
    methods:{
      
    },
    components:{
    },
  }
</script>

<style lang="css" scoped>
.mu-circular-progress{
     position: fixed;
     top: 50%;
    left: 50%;
    transform: translate(-50%,-50%); 
  }
</style>
