<template>
	<div>
		<div id="detail-header">
			<h4>明 细</h4>
			<header-slot bgColor="rosybrown" textColor="#fff">
				<div slot="left" class="left">
					<input type="month" ref="date" v-model="value" value=""/>
					<!-- <el-date-picker v-model="value" type="month" class="date"></el-date-picker> -->
				</div>
			</header-slot>
			<div  class="center">
				<div v-for="item in headerData" class="center-item">
					<span class="title">{{item.title}}</span>
					<span class="money">{{item.money}}</span>
				</div>
			</div>
		</div>
		<div v-if="isShow" class="month">
			<span>2020</span>
			<scroll-box class="wrapper">
				<ul>
					<li v-for="item in month">{{item}}</li>
					<span>取消</span>
					<span>确定</span>
				</ul>
			</scroll-box>
		</div>
	</div>
</template>

<script>
	import HeaderSlot from '../header/HeaderSlot'
	import ScrollBox from '../scroll/Scroll'
	
	import Axios from 'axios'
	
	import {getDetailData} from '../../network/detail.js'
	
	export default{
		name:"DetailHeader",
		data(){
			return {
				value:'',
				date:'',
				isShow:false,
				month:['2020-01','2020-02','2020-03','2020-04','2020-05'],
				headerData:[
					{title:"支出", money:0},
					{title:"收入", money:0},
					{title:"结余", money:0}
				]
			}
		},
		watch:{
			value(newDate, oldDate){
				console.log('datechange:', newDate, oldDate);
				// let d = newDate.slice(6,7);
				getDetailData('date'+newDate).then(res=>{
					console.log(res);
					this.$bus.$emit('sendDetailData', res);
				})
				this.$bus.$emit('checkDate', newDate, oldDate);
				// Axios.post('http://192.168.1.11:3000/date',{
				// 	params:{
				// 		date:newDate
				// 	}
				// }).then((res)=>{
				// 	console.log('senddate',res);
				// })
				// console.log('moment',this.$moment.tz(newDate).format('yyyy-mm'));
			}
		},
		created(){
			// for(let i=1; i<13;i++){
			// 	this.month.push(String(i));
			// }
			console.log(this.month);
			// var toDate = new Date();
			// let year = toDate.getFullYear();
			// let month = toDate.getMonth()+1;
			// month = String(month).length==1?('0'+month):month;
			// let date = [year, month].join('-');
			// this.value = date;

			this.$bus.$on('handleDetailHeader',(totalCost, totalIncome)=>{
				//console.log(totalCost, totalIncome);
				this.headerData[0].money = totalCost;
				this.headerData[1].money = totalIncome;
				this.headerData[2].money = totalIncome-totalCost;
			})
		},
		mounted(){
			// this.value = this.$moment(this.value).format("yyyy-mm");
			// console.log('1111111111111',this.$moment(new Date()).format("yyyy-mm"));
			
			// this.date = this.$refs.date.value;
			// this.value = this.$moment(this.value).format("yyyy-mm");
			//console.log('今天', this.$refs.date.valueAsDate);
			
			//2.1传递当前选中月份
			// this.$bus.$emit('getMonth',this.date);
		},
		components:{
			HeaderSlot,
			ScrollBox
		}
	}
</script>

<style scoped>
	.wrapper{
		overflow:hidden;
	}
	.month{
		width:200px;
		height:150px;
		line-height:50px;
		
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%, -50%);
		z-index:7;
		background:#333;
		color:#fff;
	}
	/* .month .date{
		display:flex;
		justify-content:space-around;
		font-weight:bold;
		font-size:40px;
	} */
	/* .month span{
		line-height:150px;
	} */
	/* .month:last-child{
		float:right;
	} */
	#detail-header{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		z-index:3;
		/* float:left; */
	}
	.date{
		font-size:12px;
		padding:0;
		margin:0;
		width:95px;
	}
	/* .el-input--suffix .el-input__inner{
		padding-right:0;
	} */
	h4{
		font-size:16px;
		text-align:center;
		background:#63A35C;
		background:rosybrown;
		color:#fff;
		height:40px;
		/* margin-top:30px; */
		line-height:50px;
	}
	.left{
		padding:0 20px;
		border-right:4px solid #fff;
	}
	.left input{
		border:none;
		height:30px;
		width:100px;
		background:gold;
		border-radius:10px;
	}
	.center{
		position:relative;
		right:0;
		top:-45px;
		left:-20px;
		width:200px;
		float:right;
		display:flex;
		justify-content:space-around;
		align-items:center;
	}
	.center-item{
		display:flex;
		flex-direction:column;
		align-items:center;
	}
	.center-item .money{
		font-weight:bold;
	}
</style>
