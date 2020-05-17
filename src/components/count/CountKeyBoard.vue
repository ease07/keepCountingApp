<template>
	<div class="count-keyboard">
		<div v-if="isAdd" class="is-add">{{addText}}</div>
		<div class="display">
			<div class="display-left">
				<span>请选择日期: </span>
				<!-- <input type="text" placeholder="请输入备注"/> -->
				<input class="key-cell" data-num="" type="date" ref='date' v-model="date" value="" />
			</div>
			<span style="float:left">记录: </span>
			<span class="display-right">{{money}}</span>
		</div>
		
		<div class="keyboard" @click.stop = "handleKeyPress">
			<div class="key-row">
				<div class="key-cell" data-num="7">7</div>
				<div class="key-cell" data-num="8">8</div>
				<div class="key-cell" data-num="9">9</div>
				<div class="key-cell" data-num="+">+</div>
			</div>
			<div class="key-row">
				<div class="key-cell" data-num="4">4</div>
				<div class="key-cell" data-num="5">5</div>
				<div class="key-cell" data-num="6">6</div>
				<div class="key-cell" data-num="-">-</div>
			</div>
			<div class="key-row">
				<div class="key-cell" data-num="1">1</div>
				<div class="key-cell" data-num="2">2</div>
				<div class="key-cell" data-num="3">3</div>
				
				<div class="key-cell" data-num="delete">删除</div>
			</div>
			<div class="key-row">
				<div class="key-cell" data-num=".">.</div>
				<div class="key-cell" data-num="0">0</div>
				<div class="key-cell" data-num="clear">清除</div>
				<div class="key-cell" data-num="done" ref="done">完成</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	import {getDetailData} from '../../network/detail.js'
	import {request} from '../../network/request.js'
	
	export default{
		name:"CountKeyBoard",
		data(){
			return{
				money:'',
				idx:0,
				isAdd:false,
				addText:"添加成功",
				isCost:true,
				date:new Date(),
				item:{font:"icon-canyin", affair:"餐饮", bgColor:"green", income:0, cost:0}
				// item:{date:'', affair:'餐饮', icon:'icon-canyin', cost:0, income:0, bgcolor:'orange'}
			}
		},
		watch:{
			// money(newValue, oldValue){
			// 	if(!eval(newValue)){
			// 		alert("输入错误");
			// 	}
			// 	// console.log('dateChange,key', newValue, oldValue);
			// },
			date(newDate, oldDate){
				console.log('dateChange,key', newDate, oldDate);
				this.item.date = newDate;
			}
		},
		created(){
			//为发送数据初始化日期
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth()+1;
			let day = date.getDate();
			this.item.date = [year,month,day].join('-');
			
			this.$bus.$on('clickTitle', (idx)=>{
				if(idx == 0){
					this.isCost = true;
				}else{
					this.isCost = false;
					this.item = {font:"icon-fenxi", affair:"工资", bgColor:"red", income:0, cost:0};
				}
			})
			
			this.$bus.$on('iconClick', (isCost, sendItem)=>{
				// console.log('keyboard',isCost, sendItem);
				this.isCost = isCost;
				this.item = sendItem;
				// console.log('iconClick',this.isCost, this.item);
			})
			
			//this.handleDone();
			// console.log('count created');
			// Axios.get('http://127.0.0.1:3000/incredata',{
			// 	params:{
			// 		icon:'icon-xuexi',
			// 		cost:50,
			// 		date:'2020-02-01'
			// 	}
			// }).then((res)=>{
			// 	console.log('axios Get',res);
			// }).catch((err)=>{
			// 	console.log(err);
			// })
			
			// console.log(this.item);
		},
		mounted(){
			this.$refs.date.valueAsDate = new Date();
			let date = new Date();
			let day = date.getDate();
			let month = date.getMonth()+1;
			let year = date.getFullYear();
			// this.item.date = [year, month, day].join('-');
		},
		methods:{
			handleKeyPress(e){
				//1.获取自定义data-num
				let num = e.target.dataset.num;
				switch(num){
					case '.':
									this.handleDecimalPoint();break;
					case 'delete':
									this.handleDelete();break;
					case 'clear':
									this.handleClear();break;
					case 'done':
									this.handleDone(); break;
					case '=':
									this.handleEqual();break;
					case '+':
									this.handleIncrement();break;
					case '-':
									this.handleSubtract();break;
					case 'date':
									this.handleDate(e);break;
					default:
									this.handleNum(num);break;
					
				}
			},
			handleDecimalPoint(){
				// if(this.money.indexOf('.') !== -1){return false;}
				if(!this.money.length){this.money = '0.';}
				else{this.money += '.';}
			},
			handleClear(){
				this.money = '';
			},
			handleDelete(){
				if(this.money.indexOf('0') == 0){return false;}
				else{
					this.money = this.money.substring(0, this.money.length - 1);
				}
			},
			handleNum(num){
				this.money = this.money + num;
			},
			//处理加号
			handleIncrement(){
				// if(!this.money.length){return false;}
				let num = this.money;
				//如果+前的数字不是数字，返回false
				// typeof Number(num) !== 'number'
				if(num.length == 0){return false;}
				this.money += '+';
				this.$refs.done.innerHTML = '=';
				this.$refs.done.dataset.num = '=';
			},
			//处理减号
			handleSubtract(){
				// if(!this.money.length){return false;}
				// typeof Number(num) !== 'number'
				let num = this.money;
				if(num.length == 0){return false;}
				this.money += '-';
				this.$refs.done.innerHTML = '=';
				this.$refs.done.dataset.num = '=';
			},
			//处理完成
			handleDone(){
				// e.preventDefault();
				
				if(!this.money)return false;
				console.log('提交成功', this.money);
				if(!this.$refs.date.value){
					this.$refs.date.valueAsDate = new Date();
				}
				this.item.date = this.$refs.date.value;
				if(this.isCost){
					this.item.cost = parseFloat(this.money);
				}else{
					this.item.income = parseFloat(this.money);
				}
				console.log('done', this.item);
				//axios发送请求向数据库增加数据
			
				Axios.post('http://192.168.0.113:3000/incredata',{
					params:this.item
					// timeout:1000*60*5
				}).then(res=>{
					console.log('increData', res);
					// window.alert('添加成功');
					this.addText = "添加成功";
					this.isAdd = true;
					setTimeout(()=>{
						this.isAdd = false;
					},1000);
				}).catch(error=>{
					this.addText = "添加出错";
					this.isAdd = true;
					setTimeout(()=>{
						this.isAdd = false;
					},1000);
					console.log('increError',error);
				})
				
			},
			//处理等号
			handleEqual(){
				if(this.money.indexOf('+') == this.money.length-1){return false;}
				if(this.money.indexOf('-') == this.money.length-1){return false;}
				this.money = eval(this.money);
				this.$refs.done.innerHTML = '完成';
				this.$refs.done.dataset.num = 'done';
			},
			handleDate(e){
			}
		}
	}
</script>

<style scoped>
	.is-add{
		width:100px;
		height:50px;
		line-height:50px;
		text-align:center;
		font-size:20px;
		background:#333;
		color:#fff;
		border-radius:5px;
		opacity:0.9;
		position:fixed;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		transition:all 0.3s;
		z-index:5;
	}
	.count-keyboard{
		position:fixed;
		width:100%;
		bottom:50px;
	}
	.display{
		background:#333;
		height:50px;
		line-height:50px;
		font-size:16px;
		color:#fff;
	}
	.display input{
		inline:none;
		outline:none;
		border:none;
		width:100px;
		height:30px;
		background:#333;
		color:#fff;
	}
	.display-left{
		float:left;
		margin-left:20px;
	}
	.display-right{
		float:right;
		margin-right:20px;
	}
	.keyboard{
		background:#ddd;
	}
	.keyboard input{
		outline:none;
		inline:none;
		border:none;
		background:#fff;
	}
	.key-row{
		width:100%;
		float:left;
	}
	.key-row .key-cell{
		width:25%;
		height:50px;
		line-height:50px;
		text-align:center;
		border:1px solid #333;
		float:left;
		
	}
</style>
