import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		title:'Index', //顶部导航条的标题
		user:'', //登录用户名
		logIn:false, //用户登录态
		open: false, //侧边菜单打开状态
        docked: true, // 侧边菜单遮罩状态
        topPopup:false, //上方提示条状态
        tips:{ //提示条配置
        	type:'test',
        	info:'test',
        	color:'red',
        },
        dialog:{ //提示弹出框配置
        	show:false,
        	title:'',
        	info:''
        },
        event:'', //记录当前事件
        jumpTo:'',//记录当前要跳转到的位置
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
			state.user = ''
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
    		state.dialog.title = payload.title
    		state.event = payload.event
    		if(payload.jumpTo){
    			state.jumpTo =  payload.jumpTo
    		}

    	}
	}
})

export default store