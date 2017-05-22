<template>
<div>
   <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="open" @close="close">
    <mu-appbar :title="title">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close"/>
    </mu-appbar>
    <mu-content-block>
      <p>
         &nbsp&nbsp&nbsp&nbsp {{detail}}
      </p>
    </mu-content-block>
  </mu-popup>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
       bottomPopup: false,
    }
  },
  props:['open','title','detail'],
  computed:mapState({

  }),
  methods: {
     close(){
       this.$emit('close')
     }
  },
  watch: {
   
  }
}
</script>

<style lang="css">
.demo-popup-bottom{
  width: 100%;
}

</style>