import {request} from './request'

export function getDetailData(path){
	return request({
		url:'/'+path
	})
}

export function deleteDetailData(item){
	return request({
		url:'/deleteitem',
		method:'post',
		params:item
	})
}

export function insertDetailData(item){
	return request({
		url:'/incredata',
		method:'post',
		params:item
	})
}