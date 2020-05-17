<template>
	<div id="record-pie">
		<div class="record-pie" style="width:100%;height:40vh" ref="pie"></div>
	</div>
</template>

<script>
	import {handleDate} from '../../assets/js/handleDate.js'
	import {getWeekCostAffair, getWeekIncomeAffair, getMonthCostAffair, getMonthIncomeAffair, getYearCostAffair, getYearIncomeAffair} from '../../network/pie.js'
	
	export default{
		name:"RecordPie",
		data(){
			return{
				data:this.$store.state.data,
				weekCostAffair:[],
				monthCostAffair:[],
				yearCostAffair:[],
				weekIncomeAffair:[],
				monthIncomeAffair:[],
				yearIncomeAffair:[],
				isCost:true,
				whichDate:'周'
			}
		},
		created(){
			//1.激活vuex中的mutation
			this.$store.dispatch('getData');
			let drawPieArr = [];
			drawPieArr[0] = ()=>{
				getWeekCostAffair().then((res)=>{
					//console.log('ddddddddd', res);
					this.weekCostAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			drawPieArr[1] = ()=>{
				getMonthCostAffair().then((res)=>{
					this.monthCostAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			drawPieArr[2] = ()=>{
				getYearCostAffair().then((res)=>{
					this.yearCostAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			drawPieArr[3] = ()=>{
				getWeekIncomeAffair().then((res)=>{
					this.weekIncomeAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			drawPieArr[4] = ()=>{
				getMonthIncomeAffair().then((res)=>{
					this.monthIncomeAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			drawPieArr[5] = ()=>{
				getYearIncomeAffair().then((res)=>{
					this.yearIncomeAffair = res;
					handleDate(res);
					this.drawPie(res);
				})
			}
			
			drawPieArr[0]();
			//012周月年支出 345周月年收入
			//console.log('typeof', typeof drawPieArr[1]());
			
			this.$bus.$on('costActive', (isCostActive, curClick)=>{
				this.isCost = isCostActive;
				this.whichDate = curClick;
				//console.log('drawPie:', isCostActive, curClick);
				if(isCostActive === true && curClick==='周'){
					drawPieArr[0]();
				}else if(isCostActive && curClick==='月'){
					drawPieArr[1]();
				}else if(isCostActive && curClick==='年'){
					drawPieArr[2]();
				}else if(!isCostActive && curClick==='周'){
					drawPieArr[3]();
				}else if(!isCostActive && curClick==='月'){
					drawPieArr[4]();
				}else if(!isCostActive && curClick==='年'){
					drawPieArr[5]();
				}else{
					console.log('drawPie出错');
				}
			})
		},
		methods:{
			drawPie(data){
				let pieChart = this.$echarts.init(this.$refs.pie);
				let txt = this.isCost?'支出':'收入';
				let option = {
					title:{
						text:'本'+this.whichDate+txt+'占比',
						x:'left',
						textStyle:{
							color:'rosybrown',
							fontSize:15
						}
					},
					tooltip:{},
					color:this.isCost?['lightblue','orange','gold','seagreen','purple','pink']:['orange','lightblue','gold','seagreen','purple','pink'],
					dataset:{
						source:data
					},
					series:[
						{
							name:this.isCost?'支出':'收入',
							type:'pie',
							radius:['0', '65%']
						}
					]
				}
				pieChart.setOption(option);
			}
		}
	}
</script>

<style scoped>
	/* .record-pie{
		width:100%;
		height:40vh;
	} */
</style>
