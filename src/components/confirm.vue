<template>
<div>
  <mu-dialog :open="dialog" :title="title" >
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
     title:state=>state.dialog.title,
     event:state=>state.event,
     jumpTo:state=>state.jumpTo,
     docked:state=>state.docked,
  }),
  methods: {
    cancel(){
      this.$store.commit('dialogCancel')
      console.info("canceled")
    },
    confirm () {
      console.warn(this.event)
      if(this.event){
        //this.$store.commit(this.event)//执行传入的mutation
      }
      if(this.event == 'logOut'){ //如果是确认登出则重定向至首页
        this.axios.post('/user/logout.action')//登出请求提交到后端
            .then(res =>{
              console.warn(res)
              this.$store.commit(this.event)//执行传入的mutation
              this.$store.commit('topPopupToggle',"Log out success!")
              this.$router.push({ 
                path : '/'
              })
            })
            .catch(err =>{
              console.warn(err)
            })   
        
      }else if(this.event =='jump'){
        this.$store.commit('setJumpConfirm')
          setTimeout(()=>{
            this.$store.commit('cancelJumpConfirm')
          },1000)
        if(this.jumpTo){
          this.$router.push({ 
              path : this.jumpTo
            })
        }
      }
      this.$store.commit('dialogCancel')  
    }
  }
}
</script>