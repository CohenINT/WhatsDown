const express = require('express');
const bodyParser = require('body-parser');
const pushToDb = require('../utils/messages/push')

const router = express.Router();

router.use(bodyParser.json());

router.post('/add', (req, res, next) => {
	pushToDb(req.body);
	res.json({ done: 'OK' })
});

/* GET messages */
router.get('/', function(req, res, next) {
	res.json({ done: 'OK' });
});

module.exports = router;
