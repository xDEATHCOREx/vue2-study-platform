<template>
<div>
{{title}}
</div>

</template>

<script>
	export default {
    data () {
      return {
      	
        title:'Personl Info',

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

<style lang="css">

</style>
