<template>
	<div id="count">
		<count-header></count-header>
		<count-body></count-body>
		<count-key-board></count-key-board>
	</div>
</template>

<script>
	import CountHeader from './CountHeader'
	import CountBody from './CountBody'
	import CountKeyBoard from './CountKeyBoard'
	
	export default{
		name:"Count",
		components:{
			CountHeader,
			CountBody,
			CountKeyBoard
		}
	}
</script>

<style scoped>
	
</style>
