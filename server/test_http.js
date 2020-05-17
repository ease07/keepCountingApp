//1.连接数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	port:3306,
	password:'887317',
	database:'account'
});
connection.connect();

//2.查询
let totalData, weekCost, weekIncome, weekCostAffair, weekIncomeAffair;
let monthCost, monthIncome, monthCostAffair, monthIncomeAffair;
let yearCost, yearIncome, yearCostAffair, yearIncomeAffair;
//查询数据 查询视图 查询路径
let queryData = [weekCost, weekIncome, weekCostAffair, weekIncomeAffair, monthCost, monthIncome, monthCostAffair, monthIncomeAffair, yearCost, yearIncome, yearCostAffair, yearIncomeAffair];
let queryView = ['`week-cost`', '`week-income`', '`week-cost-affair`', '`week-income-affair`', '`month-cost`', '`month-income`', '`month-cost-affair`', '`month-income-affair`', '`year-cost`', '`year-income`', '`year-cost-affair`', '`year-income-affair`'];
let queryPath = ['weekcost', 'weekincome', 'weekcostaffair', 'weekincomeaffair', 'monthcost', 'monthincome', 'monthcostaffair', 'monthincomeaffair', 'yearcost', 'yearincome', 'yearcostaffair', 'yearincomeaffair'];

//3.1 Detail页面数据 按月份查询数据
let month=['2020-01','2020-02','2020-03','2020-04','2020-05'];
let monthData = [];

//初始化接口 封装函数
function initData(){
	connection.query('SELECT * FROM `total-data` WHERE MONTH(date)=MONTH(NOW()) ORDER BY date;', function(error, result, fields){
		if(error) throw error;
		//console.log("本月所有数据",JSON.stringify(result), '\n');
		totalData = JSON.stringify(result);
		return totalData;
	});

	//2.2遍历查询视图
	for(let i in queryData){
		connection.query('SELECT  * FROM '+ queryView[i] +';', function(error, result, fields){
			if(error) throw error;
			//console.log(queryView[i], JSON.stringify(result), '\n');
			queryData[i] = JSON.stringify(result);
			return queryData[i];
		});
	}
	//detail界面
	for(let i in month){
		connection.query('SELECT * FROM `total-data` WHERE YEAR(date)=? AND MONTH(date)=? ORDER BY date',[month[i].slice(0,4),month[i].slice(5,7)] ,function(error, result, fields){
			if(error) throw error;
			monthData[i] = JSON.stringify(result);
			//console.log(month[i], monthData[i], '\n');
			return monthData[i];
		});
	}
}

initData();

//连接不能中断，保证前端可以随时查询
//3.连接结束
// connection.end();

//1.请求http模块
var http = require('http');
//2.创建服务器
http.createServer(function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');
	res.setHeader('Content-Type','application/json;charset=utf-8');
	res.writeHead(200, {'Content-Type':'application/json'});

	if(req.url == '/curmonth'){
		// req.on('data', function(data){
		// 	console.log('客户端发送的参数',data);
		// });
		//console.log(req.url);
		res.end(totalData);
	}
	else if(req.url == '/incredata'){
		var data;
		req.on('data', function(chunk){
			data += chunk;
			let item = JSON.parse(data.slice(9)).params;
			console.log('增加的数据', item);
			connection.query('INSERT INTO main(id, date, affair, cost, income, icon, bgcolor) VALUES(NULL, ?, ?, ?, ?, ?, ?)',[item.date, item.affair, item.cost, item.income, item.font, item.bgColor], function(error, result, fields){
				if(error) throw error;
				console.log("插入成功!");
			});
			//更新接口数据
			initData();
		});
		res.end("插入成功!");
	}
	else if(req.url == '/deleteitem'){
		let data;
		req.on('data', function(chunk){
			data += chunk;
			let item = JSON.parse(data.slice(9)).params;
			console.log("删除的数据", item);
			// connection.query('DElETE FROM main WHERE date=? AND affair=? AND cost=? AND income=?',[item.date, item.affair, item.cost, item.income], function(error, result, fields){
			// 	if(error) throw error;
			// 	console.log("删除成功!");
			// });
			connection.query('DElETE FROM main WHERE id=?', [item.id], function(error, result, fields){
				if(error) throw error;
				console.log("删除成功!");
			});
			//更新接口数据
			initData();
		});
		res.end("删除成功!");
	}
	else if((req.url).indexOf('/date')==0){
		for(let i in month){
			if(req.url == '/date'+month[i]){
				res.end(monthData[i]);
			}
		}
		// console.log('\n', req.url);
	}else{
		for(let i in queryPath){
			if(req.url == '/' + queryPath[i]){
				res.end(queryData[i]);
			}
		}
	}
	res.end('404 Not Found!');
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000');



// 	//3.连接结束
// 	connection.end();
// }

// var fs = require('fs');
// var writeStream = fs.createWriteStream('out.txt');
// writeStream.write(obj, 'UTF8');
// writeStream.end();
// writeStream.on('finish', function(){
// 	console.log('写入完成');
// });
// writeStream.on('error', function(err){
// 	console.log(err.stack);
// });
// console.log("程序执行完毕");

//2.1查询本月数据
// connection.query('SELECT * FROM `total-data` WHERE MONTH(date)=MONTH(NOW());', function(error, result, fields){
// 	if(error) throw error;
// 	//console.log("本月所有数据",JSON.stringify(result), '\n');
// 	totalData = JSON.stringify(result);
// 	return totalData;
// });

//2.2遍历查询视图
// for(let i in queryData){
// 	connection.query('SELECT  * FROM '+ queryView[i] +';', function(error, result, fields){
// 		if(error) throw error;
// 		//console.log(queryView[i], JSON.stringify(result), '\n');
// 		queryData[i] = JSON.stringify(result);
// 		return queryData[i];
// 	});
// }

// for(let i in month){
// 	connection.query('SELECT * FROM `total-data` WHERE MONTH(date)='+month[i]+';', function(error, result, fields){
// 		if(error) throw error;
// 		monthData[i] = JSON.stringify(result);
// 		// console.log(month[i], monthData[i], '\n');
// 		return monthData[i];
// 	});
// }