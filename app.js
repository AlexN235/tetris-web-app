const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express()
const path = require('path');
const port = 4000

router.use(express.static(__dirname + '/'));

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/tetris', (req, res) => {
	res.sendFile(path.join(__dirname+'/tetris.html'));
});

/*
router.get('/test/:productId', (req, res) => {
	res.sendFile(path.join(__dirname+"/test.html"));
	var pid = parseInt(req.params.productId, 10);
	console.log(pid);
});
*/

app.use('/', router);
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});