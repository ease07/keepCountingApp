import {handleDate} from './handleDate.js'

export function handleDetailData(res){
				//1.取出所有日期
				let totalDate = [];
				res.forEach(function(item, index){
					// console.log(res);
					// var toDate = new Date(item.date);
					// let year = toDate.getFullYear()+'年';
					// let month = toDate.getMonth()+1+'月';
					// let day = toDate.getDate()+'日';
					// item.date = [year, month, day].join('');
					totalDate.push(item.date);
				});
				//2.对汇总日期去重
				totalDate = Array.from(new Set(totalDate));
				//console.log('汇总日期',totalDate);
				//2.创建按天分组的对象
				let root = [];//root
				for(let i in totalDate){
					root[i] = {};
					root[i]['date'] = totalDate[i];//日期
					root[i]['totalcost'] = 0;//汇总每天支出收入
					root[i]['totalincome'] = 0;
					root[i]['child'] = []; //子对象再细分添加收入消费
					//3.遍历响应数据 按时间添加子对象数据
					let j = i;
					for(let k in res){
						if(root[j].date == res[k].date){
							root[j]['totalcost'] += res[k].cost;
							root[j]['totalincome'] += res[k].income;
							// totalCost += root[i]['totalcost'];
							// totalIncome += root[i]['totalincome'];
							root[j]['child'].push(
																			{
																			'id':res[k].id,
																			'icon':res[k].icon, 
																			'affair':res[k].affair, 
																			'cost':res[k].cost, 
																			'income':res[k].income,
																			'bgcolor':res[k].bgcolor
																			}
																		);
						}	//if
					}	//for
				}	//for
				//console.log('root:',root);
				let downData=[];
				let totalCost=0;
				let totalIncome=0;
				for(let k in root){
					//console.log(obj[k].child);
					downData.push(root[k].child);
				}
				//console.log(downData);
				// console.log('detailbody',$refs.detailbody.height);
				
				//2.1汇总收入传递给DetailHeader
				for(let i in root){
					totalCost += root[i]['totalcost'];
					totalIncome += root[i]['totalincome'];
				}
				
				return [root, downData, totalCost, totalIncome];
			}