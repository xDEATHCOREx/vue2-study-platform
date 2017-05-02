<template>
<div>
  <mu-dialog :open="open" title="Change password">
    <mu-text-field 
      class="text-field" 
      label="New password" 
      hintText="Input your new password" 
      type="password" 
      v-model.trim="password" 
      @blur="isPasswordRight"
      labelFloat/>
    <mu-text-field 
      class="text-field" 
      label="Confirm password" 
      hintText="Input password again" 
      type="password" 
      v-model.trim="passwordConfirm" 
      @blur="isPasswordRight"
      :errorText="errorText"
      labelFloat/>
    <mu-flat-button label="Cancel" slot="actions" primary @click="close(false)"/>
    <mu-flat-button label="Confirm" slot="actions" primary @click="comfirm()"/>
  </mu-dialog>
</div>
</template>

<script>
import {eventHub} from './Event-hub.js'
export default {
  data () {
    return {
      password:'',
      passwordConfirm:'',
      errorText:'',
      equal:false,
    }
  },
  props:['open'],
  methods: {
    isPasswordRight(){
      if(this.password == this.passwordConfirm){
        console.warn("right")
        this.errorText = ''
        this.equal = true
      }else{
        this.errorText = 'two passwords are different!'
        console.warn("wrong")
        this.equal = false
      }
    },
    close (key) {
      this.password = ''
      this.passwordConfirm = ''
      this.errorText = ''
      eventHub.$emit('close',key)
    },
    comfirm(){
      if(this.password!=''&&this.passwordConfirm!=''){
        this.isPasswordRight()
        if(this.equal)
        {
          //调用修改密码的接口
          this.$store.commit('topPopupToggle',"Password changed!")
          this.password = ''
          this.passwordConfirm = ''
          this.errorText = ''
          eventHub.$emit('close',false)
        }
      }else{
        this.$store.commit('topPopupToggle',"Fill the blanks!")
      }
    }
  }
}
</script>

<style lang="css" scoped>
.text-field{
  width: 100%;
}
</style>
