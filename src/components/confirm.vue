<template>
<div>
  <mu-dialog :open="dialog" title="Dialog" >
    {{info}}
    <mu-flat-button slot="actions" @click="cancel" primary label="Cancel"/>
    <mu-flat-button slot="actions" primary @click="confirm" label="Confirm"/>
  </mu-dialog>
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
     dialog:state=>state.dialog.show,
     info:state=>state.dialog.info,
     event:state=>state.event
  }),
  methods: {
    cancel(){
      this.$store.commit('dialogToggle',{//关闭确认框并清除相关信息
        info : '',
        event : ''
      })
      console.info("canceled")
    },
    confirm () {
      console.warn(this.event)
      this.$store.commit(this.event)//执行传入的mutation
      this.$store.commit('dialogToggle',{//关闭确认框并清除相关信息
        info : '',
        event : ''
      })
    }
  }
}
</script>