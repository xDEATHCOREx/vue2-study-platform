<template>
<div>
  <mu-dialog :open="open" title="Change password">
    <mu-text-field 
      class="text-field" 
      label="New password" 
      hintText="Input your new password" 
      type="password" 
      v-model.trim="password" 
      @blur="isPasswordSame"
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
    isPasswordSame(){
      let formData = new FormData()
          formData.append("password", this.password)
           this.axios({//上传信息接口
              url: '/user/pswd/same.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              if(res.data.success){
                if(res.data.object){
                  //与原密码相同
                   this.$store.commit('topPopupToggle',"不能和原密码相同！")
                }else{
                  //与原密码不同
                   this.$store.commit('topPopupToggle',"新密码可用！")
                }
              }else{
                this.$store.commit('topPopupToggle',"查询失败 "+res.data.result_msg)
              }
            })
            .catch(err =>{
              console.warn(err)
            })  
    },
    editPassword(){
      let formData = new FormData()
          formData.append("password", this.password)
           this.axios({//上传信息接口
              url: '/user/updatePswd.action',
              method: 'post',
              data: formData,
              transformRequest: [function (data) {//这里重置http.js中全局的transform
                // Do whatever you want to transform the data
                return data;
              }],
            })
            .then(res=>{
              if(res.data.success){
                //调用修改密码的接口
                this.$store.commit('topPopupToggle',"Password changed!")
              }else{
                this.$store.commit('topPopupToggle',res.data.result_msg)
              }
              this.password = ''
              this.passwordConfirm = ''
              this.errorText = ''
              eventHub.$emit('close',false)
            })
            .catch(err =>{
              console.warn(err)
            })  

         
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
          this.editPassword()
        }else{
          this.$store.commit('topPopupToggle',"两次输入的密码不同！")
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
