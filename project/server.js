const express = require('express');
const fallback = require('express-history-api-fallback');
const app = express();

const root = `./build`;
app.use(express.static(root))
app.use(fallback('index.html', { root }))


app.get('/', function(req,res) {
	return res.send('hello');
})

const port = 3000;

app.listen(port, function(){
	console.log(`Listen on port: ${port}...`);
})
