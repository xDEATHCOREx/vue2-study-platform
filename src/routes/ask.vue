<template>
<div class="ask-root">
 <mu-text-field 
   label="title" 
   hintText="say it briefly" 
   v-model.trim="questionTitle" 
   labelFloat 
   fullWidth
   :errorText="inputErrorText"
    @textOverflow="handleInputOverflow" 
    :maxLength="30"
  />
  <mu-text-field 
    label="detail" 
    hintText="Describe the question" 
    v-model="questionDetail"
    labelFloat 
   fullWidth
    multiLine 
    :rows="3" 
    :rowsMax="15"/>

  <mu-raised-button 
    label="Submit" 
    class="demo-raised-button submit-btn" 
    touch="true" 
    secondary 
    fullWidth 
    @click.native=""/>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
       title:'Asking',
       questionTitle:'',
       questionDetail:'',
       inputErrorText: '',
    }
  },
  mounted(){
      //更改header的title，实际上是改变store里的值
      this.$store.commit('setTitle',this.title)
    },
  computed:mapState({
    
  }),
  methods: {
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? 'Over length' : ''
    },
  },
  components:{
    },

}
</script>

<style type="text/css" scoped>	
.ask-root{
  padding: 20px;
}
.submit-btn{
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>


