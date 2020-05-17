import {request} from './request'
//周月年事件数据处理
export function getWeekCostAffair(){
	return request({
		url:'/weekcostaffair'
	})
}

export function getWeekIncomeAffair(){
	return request({
		url:'/weekincomeaffair'
	})
}

export function getMonthCostAffair(){
	return request({
		url:'/monthcostaffair'
	})
}

export function getMonthIncomeAffair(){
	return request({
		url:'/monthincomeaffair'
	})
}

export function getYearCostAffair(){
	return request({
		url:'/yearcostaffair'
	})
}

export function getYearIncomeAffair(){
	return request({
		url:'/yearincomeaffair'
	})
}