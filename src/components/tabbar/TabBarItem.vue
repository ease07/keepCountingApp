<template>
	<div class="tab-bar-item ignore" :style="activeStyle" @click="itemClick">
		<div class="item-icon" :class="isActive"><slot name="item-icon"></slot></div>
		<div class="item-text"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default{
		name:"TabBarItem",
		props:{
			path:String,
			activeColor:{
				type:String,
				default:'mistyrose'
				// default:'#fff'
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1;
			},
			activeStyle(){
				return this.isActive?{color:this.activeColor}:{};
			}
		},
		methods:{
			itemClick(){
				this.$router.replace(this.path);
				console.log(this.$route);
			}
		}
	}
</script>

<style scoped>
	.tab-bar-item{
		width:50px;
		height:50px;
		display:flex;
		flex-direction:column;
		justify-content:space-around;
		align-items:center;
		/* color:mistyrose */
		/* color:#fff */
	}
	.tab-bar-item .item-icon{
		transform:scale(1.5);
		margin-bottom:-10px;
	}
</style>
