module.exports = {
	plugins:{
		autoprefixer:{},
		"postcss-px-to-viewport":{
			viewportWidth:375,
			viewportHeight:667,
			unitPrecision:5,//转换小数位数
			viewportUnit:'vw',
			selectBlackList:['ignore','tab-bar','tab-bar-slot','tab-bar-item'],
			minPixelValue:1,
			mediaQuery:false,
			exclude:[/TabBar/]
		}
	}
}