<template>
	<div class="count-pay">
		<div
				class="icon-item" 
				:style="bgStyle(index)" 
				:class="{active:currentIndex==index}" 
				v-for="(item, index) in icon" 
				@click="itemClick(item,index)">
			<i class="iconfont" :class="item.font"></i>
			<span >{{item.affair}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"CountBody",
		data(){
			return{
				isCost:true,//记录当前是支出页面还是收入页面
				currentIndex:0,
				// 字体icon
				icon:[
					{font:"icon-canyin", affair:"餐饮", bgColor:"green"},
					{font:"icon-riyongpin", affair:"日用", bgColor:"purple"},
					{font:"icon-xuexi", affair:"学习", bgColor:"gold"},
					{font:"icon-gouwuche", affair:"购物", bgColor:"#9A6E3A"},
					{font:"icon-lvhang", affair:"运动", bgColor:"orange"},
					{font:"icon-lvxing", affair:"旅行", bgColor:"lightblue"},
					{font:"icon-jiaotong", affair:"交通", bgColor:"brown"},
					{font:"icon-fenxi", affair:"其他", bgColor:"red"}
					// {font:"icon-zhuanqian", affair:"自定义"}
				],
				sendItem:{font:"icon-canyin", affair:"餐饮", bgColor:"green", income:0, cost:0}
			}
		},
		created(){
			//为发送数据初始化日期
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth()+1;
			let day = date.getDate();
			this.sendItem.date = [year,month,day].join('-');
			
			// console.log(this.sendItem);
			this.$bus.$on('clickTitle', (idx)=>{
				console.log('点击了:', idx);
				//this.costIdx = idx;
				//0-支出 1-收入
				if(idx == 1){
					this.isCost = false;
					this.currentIndex=0;//切换支出页面后，初始化选中第一个
					this.icon = [
						{font:"icon-fenxi", affair:"工资", bgColor:"red"},
						{font:"icon-zhuanqian", affair:"其他", bgColor:"#ddd"}
					];
				}else{
					this.isCost = true;
					this.icon = [
						{font:"icon-canyin", affair:"餐饮", bgColor:"green"},
						{font:"icon-riyongpin", affair:"日用", bgColor:"purple"},
						{font:"icon-xuexi", affair:"学习", bgColor:"gold"},
						{font:"icon-gouwuche", affair:"购物", bgColor:"#9A6E3A"},
						{font:"icon-lvhang", affair:"运动", bgColor:"orange"},
						{font:"icon-lvxing", affair:"旅行", bgColor:"lightblue"},
						{font:"icon-jiaotong", affair:"交通", bgColor:"brown"},
						{font:"icon-fenxi", affair:"其他", bgColor:"red"}
						// {font:"icon-zhuanqian", affair:"自定义", bgColor:"#ddd"}
					]
				}
			})
			
		},
		methods:{
			bgStyle(idx){
				return {
					color:'#fff',
					background:this.icon[idx].bgColor,
					};
			},
			itemClick(item,idx){
				this.currentIndex = idx;
				this.sendItem.affair = this.icon[idx].affair;
				this.sendItem.font = this.icon[idx].font;
				this.sendItem.bgColor = this.icon[idx].bgColor;
				console.log(this.sendItem);
				this.$bus.$emit('iconClick', this.isCost, this.sendItem);
				// console.log(item.affair,item.font);
			}
		}
	}
</script>

<style scoped>
	.count-pay{
		width:100%;
		display:flex;
		padding:0 20px;
		flex-wrap:wrap;
		/* background:#333; */
	}
	
	.count-pay .icon-item{
		width:18%;
		height:60px;
		margin:20px 10px;
		border-radius:50%;
		background:#ddd;
		text-align:center;
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		position:relative;
	}
	.count-pay .icon-item.active::after{
		content:'';
		display:block;
		position:absolute;
		top:15%;
		right:0;
		left:12%;
		bottom:0;
		/* opacity:0.8; */
		width:40px;
		height:20px;
		border-top-width:3px;
		border-right-width:3px;
		transform:rotate(140deg);
		border-style:solid;
		border-color:#fff #fff transparent transparent;
	}
</style>
