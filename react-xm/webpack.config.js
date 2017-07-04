module.exports = {

	entry :'./js/entry.js',
	output:{
		path:__dirname,
		filename:"./js/bundle.js"
	},
	module:{
		loaders:[
		{test:/\.css$/, loader :'style-loader!css-loader'},
		{test:/\.js$/,exclude:/node_modules/,loader:'react-hot-loader!babel-loader'}
		]
	}
}
