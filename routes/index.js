var express = require('express');
var messages = require('./messages');

var router = express.Router();

router.use('/messages', messages);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
})

module.exports = router;
