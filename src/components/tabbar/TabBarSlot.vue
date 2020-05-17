<template>
	<div id="tab-bar-slot" class="tab-bar-slot ignore">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:"TabBarSlot"
	}
</script>

<style scoped>
	#tab-bar-slot{
		background:darkolivegreen;
		background:#333;
		color:#fff;
		height:50px;
		width:100%;
		position:fixed;
		bottom:0;
		z-index:4;
		display:flex;
		justify-content:space-around;
		align-items:center;
	}
</style>
