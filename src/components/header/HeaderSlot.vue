<template>
	<div id="header-slot" :style="bgStyle">
		<!-- <slot name="left"></slot>
		<slot name="center"></slot>
		<slot name="right"></slot> -->
		<div class="header-item"><slot name="left"></slot></div>
		<div class="header-item"><slot name="center"></slot></div>
		<div class="header-item"><slot name="right"></slot></div>
	</div>
</template>

<script>
	export default{
		name:"HeaderSlot",
		props:{
			bgColor:{
				type:String,
				default:'#63A35C'
			},
			textColor:{
				type:String,
				default:'#fff'
			}
		},
		data(){
			return{
				bgStyle:{
					'backgroundColor':this.bgColor,
					'color':this.textColor
				}
			}
		}
	}
</script>

<style scoped>
	#header-slot{
		height:50px;
		/* 背景色动态绑定 */
		/* background:#63A35C; */
		display:flex;
	  justify-content:space-around;
		align-items:center;
	}
	#header-slot .header-item{
		flex:1;
		text-align:center;
		/* background:#ddd; */
	}
</style>
