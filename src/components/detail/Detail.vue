<template>
	<div id="detail">
		<detail-header></detail-header>
		<detail-body></detail-body>
	</div>
</template>

<script>
	import DetailHeader from './DetailHeader'
	import DetailBody from './DetailBody'
	
	// import ScrollBox from '../scroll/Scroll'
	
	export default{
		name:"Detail",
		components:{
			DetailHeader,
			DetailBody
		}
	}
</script>

<style scoped>
	/* .content{
		height:calc(100vh - 150px);
	} */
</style>
