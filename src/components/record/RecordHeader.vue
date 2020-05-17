<template>
	<div class="record-header">
		<header-slot bgColor='rosybrown'>
			<div slot="center" class="title" @click="titleToggle">
				<p v-if="active">支出</p>
				<p v-else>收入</p>
			</div>
		</header-slot>
		<div class="header-bottom">
			<span 
				v-for="(item, index) in date" 
				@click="dateClick(index)"
				:class="{'active':currentIndex==index}">{{item}}</span>
		</div>
	</div>
</template>

<script>
	import HeaderSlot from '../header/HeaderSlot'
	
	export default{
		name:"RecordHeader",
		data(){
			return{
				active:true,
				date:["周", "月", "年"],
				currentIndex:0
			}
		},
		components:{
			HeaderSlot
		},
		created(){

		},
		methods:{
			titleToggle(){
				this.active = !this.active;
				this.$bus.$emit('costActive', this.active, this.date[this.currentIndex]);
			},
			dateClick(idx){
				this.currentIndex = idx;
				this.$bus.$emit('costActive', this.active, this.date[this.currentIndex]);
			}
		}
	}
</script>

<style scoped>
	.active{
		background:#fff;
		color:#333;
		/* background:royalblue; */
	}
	.record-header{
		backgrund:rosybrown;
	}
	.title{
		width:60px;
		margin:0 auto;
		position:relative;
		font-size:16px;
		font-weight:bold;
	}
	.title:after{
		content:'';
		display:block;
		position:absolute;
		right:-5px;
		top:40%;
		border-width:6px;
		line-height:2px;
		border-style:solid;
		border-color:#fff transparent transparent transparent;
	}
	.header-bottom{
		background:rosybrown;
		width:100%;
		height:40px;
		text-align:center;
		color:#fff;
	}
	.header-bottom span{
		display:inline-block;
		width:30%;
		height:30px;
		line-height:30px;
		margin:0 5px;
		border:1px solid #fff;
		box-shadow:0 0 0.1px 0.5px #fff;
		border-radius:10px;
	}
</style>
