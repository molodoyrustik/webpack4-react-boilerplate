var express = require('express');
var fallback = require('express-history-api-fallback');
var app = express();

const root = `./build`;
app.use(express.static(root))
app.use(fallback('index.html', { root }))


app.get('/', function(req,res) {
	return res.send('hello');
})

var port = 3000;

app.listen(port, function(){
	console.log(`Listen on port: ${port}...`);
})
