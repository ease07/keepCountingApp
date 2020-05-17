<template>
	<div id="record-line">
		<div class="line" style="width:100%;height:40vh" ref="line"></div>
	</div>
</template>

<script>
	import {handleDate} from '../../assets/js/handleDate.js'
	import {getWeekCost, getWeekIncome, getMonthCost, getMonthIncome, getYearCost, getYearIncome} from '../../network/line.js'
	
	export default{
		name:"RecordLine",
		data(){
			return{
				//所有数据
				// this.$store.state.data
				data:[],
				weekCost:[],
				weekIncome:[],
				monthCost:[],
				monthIncome:[],
				yearCost:[],
				yearIncome:[],
				drawLineArr:[],
				isCost:true,
				whichDate:'周'
			}
		},
		created(){
			//1.激活vuex中的mutation
			this.$store.dispatch('getData');
			let drawLineArr = [];
		},
		mounted(){
			let drawLineArr = [];
			drawLineArr[0] = ()=>{
				getWeekCost().then((res)=>{
					this.data = this.weekCost;
					handleDate(res);
					this.drawLine(res);
				})
			}
			drawLineArr[1] = ()=>{
				getMonthCost().then((res)=>{
					this.data = this.monthCost;
					handleDate(res);
					this.drawLine(res);
				})
			}
			drawLineArr[2] = ()=>{
				getYearCost().then((res)=>{
					this.data = this.yearCost;
					//console.log('月支出',res);
					for(let i in res){
						res[i]['MONTH(date)']+='月';
					}
					handleDate(res);
					this.drawLine(res);
				})
			}
			drawLineArr[3] = ()=>{
				getWeekIncome().then((res)=>{
					this.data = this.weekIncome;
					handleDate(res);
					this.drawLine(res);
				})
			}
			drawLineArr[4] = ()=>{
				getMonthIncome().then((res)=>{
					this.data = this.monthIncome;
					handleDate(res);
					this.drawLine(res);
				})
			}
			drawLineArr[5] = ()=>{
				getYearIncome().then((res)=>{
					//console.log('月',res);
					this.data = this.yearIncome;
					handleDate(res);
					for(let i in res){
						res[i]['MONTH(date)']+='月';
					}
					this.drawLine(res);
				})
			}
			//初始化周支出
			//012周月年支出 345周月年收入
			drawLineArr[0]();
			this.$bus.$on('costActive', (isCostActive, curClick)=>{
				this.isCost = isCostActive;
				this.whichDate = curClick;
				//console.log('drawLine:', isCostActive, curClick);
				if(isCostActive === true && curClick==='周'){
					drawLineArr[0]();
				}else if(isCostActive && curClick==='月'){
					drawLineArr[1]();
				}else if(isCostActive && curClick==='年'){
					drawLineArr[2]();
				}else if(!isCostActive && curClick==='周'){
					drawLineArr[3]();
				}else if(!isCostActive && curClick==='月'){
					drawLineArr[4]();
				}else if(!isCostActive && curClick==='年'){
					drawLineArr[5]();
				}else{
					console.log('drawline出错');
				}
			})
		},
		methods:{
			drawLine(data){
				//console.log('ssssssssss',this.yearCost);
				let txt = this.isCost?'支出':'收入';
				let lineChart = this.$echarts.init(this.$refs.line);
				let option = {
					title:{
						text:'本'+this.whichDate+txt+'趋势',
						x:'left',
						textStyle:{
							color:'rosybrown',
							fontSize:15
						}
					},
					tooltip:{
						trigger:'axis'
					},
					dataset:{source:data},
					color:this.isCost?['gold']:['orangered'],
					xAxis:{
						type:'category',
						axisLabel:{
							show:false
						}
					},
					yAxis:{
						show:false
					},
					series:[
						{
							type:'line',
							name:this.isCost?'支出':'收入',
							areaStyle:{
								color:this.isCost?'#ddd':'orange',
								opacity:0.3
							}
						}
					]
				};
				lineChart.setOption(option);
			}
		}
	}
</script>

<style scoped>
	/* .line{
		width:100%;
		height:40vh;
	} */
</style>
