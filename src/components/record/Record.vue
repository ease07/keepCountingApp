<template>
	<div id="record">
		<record-header></record-header>
		<record-line></record-line>
		<record-pie></record-pie>
	</div>
</template>

<script>
	import RecordHeader from './RecordHeader'
	import RecordLine from './RecordLine'
	import RecordPie from './RecordPie'
	
	export default{
		name:"Record",
		components:{
			RecordHeader,
			RecordLine,
			RecordPie
		}
	}
</script>

<style>
</style>
