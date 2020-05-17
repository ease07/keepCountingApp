import Vue from 'vue'
import Vuex from 'vuex'

import Axios from 'axios'

Vue.use(Vuex)

import {getDetailData} from '../network/detail.js'

export default new Vuex.Store({
  state: {
		data:[]
  },
  mutations: {
		getData(state, res){
			state.data = res;
			//console.log('data', state.data);
		}
  },
  actions: {
		getData(context){
			Axios.get('http://192.168.0.113:3000/curmonth').then((res)=>{
				//console.log('时间戳:',res.data[0].date)
				//时间格式化
				for(let i in res.data){
					var toDate = new Date(res.data[i].date);
					let year = toDate.getFullYear()+'年';
					let month = toDate.getMonth()+1+'月';
					let day = toDate.getDate()+'日';
					res.data[i].date = [year, month, day].join('');
				}
				context.commit('getData', res.data);
			})
			// getDetailData().then((res)=>{
			// 	context.commit('getData', res)
			// })
		}
  },
  modules: {
  }
})
