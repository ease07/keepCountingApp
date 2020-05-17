<template>
	<div>
		<scroll-box class="wrapper">
			<div class="detail-item" v-if="isShow" v-for="(item,index) in obj">
				<div class="item-up" >
					<span class="float up-date">{{item.date}}</span>
					<span class='right up-income'>收入: {{item.totalincome.toFixed(2)}}元</span>
					<span class="right up-pay">支出: {{item.totalcost.toFixed(2)}}元</span>
				</div>
				
				<div class="item-down"
							v-for="(child, idx) in downData[index]" 
							:data-type="0" 
							@touchstart.capture="touchStart"
							@touchend.capture="touchEnd">
					<i class="left down-icon iconfont" :class="child.icon" :style="{background:child.bgcolor}"></i>
					<span class="left down-affair">{{child.affair}}</span>
					<span class="right down-money" v-if="child.cost != 0">-{{child.cost.toFixed(2)}}</span>
					<span class="right down-money" v-else>+{{child.income.toFixed(2)}}</span>
					<span class='right delete' ref='del' @click.stop="deleteItem(item.date, child)">删除</span>
				</div>
			</div>
			<div v-else>暂无记录</div>
		</scroll-box>
		<div v-if="isDelete" class="delete-success">删除成功</div>
		
	</div>
	
</template>

<script>
	import Axios from 'axios'
	
	import BScroll from 'better-scroll'
	import ScrollBox from '../scroll/Scroll'
	
	import {getDetailData, insertDetailData, deleteDetailData} from "../../network/detail.js"
	import {handleDate} from "../../assets/js/handleDate.js"
	import {handleDetailData} from "../../assets/js/handleDetailData.js"
	
	export default{
		name:"DetailBody",
		data(){
			return {
				scroll:{},
				isShow:true,
				isDelete:false,
				curDate:{newDate:'', oldDate:''}, //用于记录用户切换的日期
				obj:[],//获取处理成树后的的数据 
				upData:[],//事件上方数据
				downData:[],//事件下方数据
				totalCost:0,//汇总支出
				totalIncome:0,//汇总收入
				startX:0,//滑动位置
				endX:0
			}
		},
		components:{
			ScrollBox
		},
		methods:{
			clickItem(e){
				console.log('clickItem',e.target);
			},
			deleteItem(date, child){
				// console.log('deleteItem',event.target.parentNode);
				console.log('child', date, child);
				let data = child;
				data.date = date.replace('年','-').replace('月','-').replace('日','');
				Axios.post('http://192.168.0.113:3000/deleteitem',{
					params:data
				}).then(res=>{
					console.log('删除数据',res);
					//window.alert('删除成功');
					this.isDelete = true;
					setTimeout(()=>{
						this.isDelete = false;
					},1000);
					window.location.reload();
					if(res.data==='删除成功!'){
						if(this.curDate.newDate){
							getDetailData('date'+this.curDate.newDate).then(res=>{
								console.log('删除数据后重新获取数据newDate', res);
								handleDate(res);
								[this.obj, this.downData, this.totalCost, this.totalIncome] = handleDetailData(res);
							})
						}else{
							getDetailData('curmonth').then(res=>{
								console.log('删除数据后重新获取数据oldDate', res);
								handleDate(res);
								[this.obj, this.downData, this.totalCost, this.totalIncome] = handleDetailData(res);
							})
						}
					}
				})
				.catch(err=>{
					console.log('deleteError', err);
					window.alert(err);
				})
				// deleteDetailData(data).then(res=>{
				// 	console.log('删除数据',res);
				// 	window.alert('删除成功');
				// 	window.location.reload();
				// }).catch(err=>{
				// 	console.log('deleteError', err);
				// })
			},
			touchStart(e){
				this.startX = e.touches[0].clientX;
			},
			touchEnd(e){
				this.endX = e.changedTouches[0].clientX;
				// console.log('touchItem', e.currentTarget.dataset.type);
				// console.log('diff',this.startX-this.endX);
				if(this.startX - this.endX > 100){
					e.currentTarget.dataset.type = 1;
				}else if(this.startX - this.endX < 100){
					e.currentTarget.dataset.type = 0;
				}
			},
			handleDate(res){
				for(let i in res){
					var toDate = new Date(res[i].date);
					let year = toDate.getFullYear()+'年';
					let month = toDate.getMonth()+1+'月';
					let day = toDate.getDate()+'日';
					res[i].date = [year, month, day].join('');
				}
			}
			
		},
		created(){
			// this.$store.dispatch('getData');
			// //获取vuex全局管理数据 初始化detail页面数据
			// let res = this.$store.state.data;
		},
		mounted(){
			//监听header日期变化
			this.$bus.$on('checkDate', (newDate, oldDate)=>{
				this.curDate = {newDate: newDate, oldDate: oldDate};
				console.log('监听到的日期', this.curDate);
			});
			//1.1 初始化数据
			getDetailData('curmonth').then((res)=>{
				handleDate(res);
				[this.obj, this.downData, this.totalCost, this.totalIncome] = handleDetailData(res);
				//2.2事件总线监听
				this.$bus.$emit('handleDetailHeader', this.totalCost, this.totalIncome);
			}).then(()=>{
					// console.log('wrapper',this.$refs.wrapper.offsetHeight);
					// console.log('content',this.$refs.detailbody.offsetHeight);
					// let scroll = new BScroll(this.$refs.wrapper,{
					// 	click:true
					// });
					// console.log('detailScroll', scroll);
			}).catch((e)=>{
					console.log('scroll Error', e);
				})
			
			//1.2 header切换日期切换数据
			this.$bus.$on('sendDetailData',(res)=>{
				console.log('收到首页数据',res);
				// if(typeof res != 'object' ){
				// 	[this.obj, this.downData, this.totalCost, this.totalIncome]=[[],[],0,0];
				// 	this.isShow = false;
				// 	// return;
				// 	}
				handleDate(res);
				[this.obj, this.downData, this.totalCost, this.totalIncome] = handleDetailData(res);
				this.$bus.$emit('handleDetailHeader', this.totalCost, this.totalIncome);
			})
		}
	}
</script>

<style scoped>
	.delete-success{
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
	[data-type="1"]{
		transition:all 0.3s;
		transform:translateX(-50px);
	}
	[data-type="0"]{
		transition:all 0.3s;
		transform:translateX(0);
	}
	.wrapper{
		width:100%;
		height:calc(100vh - 140px);
		position:absolute;
		top:90px;
		left:0;
		bottom:60px;
		overflow:hidden;
		z-index:5;
		background:#fff;
	}
	.detail-item .item-up{
		width:100%;
		height:20px;
		line-height:20px;
		background:#ddd;
	}
	.detail-item .item-up .up-date{
		margin-left:10px;
	}
	.detail-item .item-up .right{
		float:right;
		margin-right:10px;
	}
	.detail-item .item-down{
		height:40px;
		line-height:40px;
		margin:5px 0;
		position:relative;
		/* transform:translateX(-45px); */
	}
	.detail-item .item-down .iconfont{
		width:40px;
		height:40px;
		padding:7px;
		line-height:40px;
		border-radius:50%;
		margin-left:10px;
	}
	.detail-item .item-down .down-money{
		float:right;
		margin-right:20px;
	}
	.detail-item .item-down .down-affair{
		margin-left:10px;
	}
	.detail-item .item-down .delete{
		position:absolute;
		right:0;
		width:40px;
		height:30px;
		text-align:center;
		line-height:30px;
		margin:5px 5px 0 0;
		color:#fff;
		background:orangered;
		transform:translateX(50px);
	}
	
</style>
