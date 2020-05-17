import {request} from './request'

//周月年数据按日期总计
export function getWeekCost(){
	return request({
		url:'/weekcost'
	})
}

export function getWeekIncome(){
	return request({
		url:'/weekincome'
	})
}

export function getMonthCost(){
	return request({
		url:'/monthcost'
	})
}

export function getMonthIncome(){
	return request({
		url:'/monthincome'
	})
}

export function getYearCost(){
	return request({
		url:'/yearcost'
	})
}

export function getYearIncome(){
	return request({
		url:'/yearincome'
	})
}