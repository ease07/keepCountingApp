<template>
	<tab-bar-slot class="tab-bar ignore">
		<tab-bar-item path="/detail">
			<i slot="item-icon" class="iconfont icon-mingxi"></i>
			<p slot="item-text">明细</p>
		</tab-bar-item>
		<tab-bar-item path="/count" class="item-count" >
			<i slot="item-icon" class="iconfont icon-tianjia"></i>
			<p slot="item-text">记账</p>
		</tab-bar-item>
		<tab-bar-item path="/record">
			<i slot="item-icon" class="iconfont icon-tongji"></i>
			<p slot="item-text">统计</p>
		</tab-bar-item>
	</tab-bar-slot>
</template>

<script>
	import TabBarSlot from './TabBarSlot'
	import TabBarItem from './TabBarItem'
	
	export default{
		name:"TabBar",
		components:{
			TabBarSlot,
			TabBarItem
		}
	}
</script>

<style scoped>
	.item-count{
		/* background:#fff; */
		border-radius:50%;
		box-shadow:0 0 0 15px #fff;
	}
	
</style>
