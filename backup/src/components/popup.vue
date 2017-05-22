<template>
<div>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    {{info}}
  </mu-popup>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
    
    }
  },
  computed:mapState({
     info:state=>state.tips.info,//复杂对象用这种写法？
     topPopup:'topPopup', 
  }),
  methods: {
     
  },
  watch: {
    topPopup (val) { 
      if (val) {
        setTimeout(() => { //提示延时消失的时间
         this.$store.commit('topPopupToggle','')
        }, 1500)
      }
    }
  }
}
</script>

<style lang="css">
.demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
</style>