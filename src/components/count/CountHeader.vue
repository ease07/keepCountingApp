<template>
	<div id="count-header">
		<header-slot bgColor='rosybrown'>
			<div slot="center" class="center">
				<div class="center-item" v-for="(item, index) in title" :class="{active:currentIndex==index}" @click="titleClick(index)">{{item}}</div>
			</div>
		</header-slot>
	</div>
</template>

<script>
	import HeaderSlot from '../header/HeaderSlot'
	
	export default{
		name:"CountHeader",
		data(){
			return{
				title:["支出", "收入"],
				currentIndex:0,
				isCost:true
			}
		},
		components:{
			HeaderSlot
		},
		methods:{
			titleClick(idx){
				this.currentIndex = idx;
				this.$bus.$emit('clickTitle', idx);//是否点击了cost 0是 1否
			}
		}
	}
</script>

<style scoped>
	.center{
		display:flex;
		justify-content:center;
		font-size:16px;
		font-weight:bold;
	}
	.center-item{
		margin:0 5px;
		padding:4px 0;
	}
	.active{
		border-bottom:4px solid #fff;
	}
</style>
