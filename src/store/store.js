import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		title:'Index',
		user:'',
		logIn:false,
		open: false,
        docked: true,
        topPopup:false,
        tips:{
        	type:'test',
        	info:'test',
        	color:'red',
        },
        dialog:{
        	show:false,
        	info:''
        },
        event:''
	},
	mutations:{
		setTitle:(state,title)=>{
			state.title = title
		},
		logIn:(state,user)=>{
			localStorage.user = user//token存进LS
			state.user = user//同样存进store的state中
			state.logIn = true
			console.info("logged in")

		},
		logOut:(state)=>{
			localStorage.removeItem('user')
			state.userName = ''
			state.logIn = false
		},
		toggle:(state,flag)=>{
	      state.open = !state.open
	      if(flag){
	      	state.docked = !flag
	      }
    	},
    	topPopupToggle:(state,info)=>{
    		state.tips.info = info
    		state.topPopup= !state.topPopup	
    	},
    	dialogToggle:(state,payload)=>{
    		state.dialog.show = !state.dialog.show
    		state.dialog.info = payload.info
    		state.event = payload.event
    	}
	}
})

export default store