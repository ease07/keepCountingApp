import axios from 'axios'
// http://172.19.4.1:3000 我的ip
export function request(config){
	const instance = axios.create({
		baseURL:'http://192.168.0.113:3000',
		timeout:5000
	})
	
	//创建拦截器
	instance.interceptors.request.use(config=>{
		return config;
	},err=>{
		console.log('request error', err);
	})
	
	instance.interceptors.response.use(res=>{
		return res.data;
	},err=>{
		console.log('response error', err);
	})
	
	return instance(config)
}