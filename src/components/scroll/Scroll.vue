<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		name:"ScrollBox",
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				scroll:null
			}
		},
		mounted(){
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			console.log('scroll',this.scroll);
			
			if(this.probeType===2 || this.probeType ===3){
				this.scroll.on('scroll', (pos)=>{
					console.log(pos);
				})
			}
			
			if(this.pullUpLoad){
				this.scroll.on('pullingUp', ()=>{
					console.log('上拉加载');
				})
			}
		}
	}
</script>

<style>
</style>
