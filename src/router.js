import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import login from './components/login.vue'
import regist from './components/regist.vue'
import detail from './components/detail.vue'
import store from './store/store'
Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		name:'index',
		component:index
	},
	{
		path:'/login',
		name:'login',
		component:login
	},
	{
		path:'/regist',
		name:'regist',
		component:regist
	},
	{
		path:'/detail',
		name:'detail',
		component:detail
	}
	
]

let user = localStorage.getItem('user') //每次刷新时检测LS中相关值以自动登录
if(user){
	console.info("user existed,automatic logging in...")
	store.commit('logIn',user)
}

const router = new VueRouter({
	routes
});

export default router