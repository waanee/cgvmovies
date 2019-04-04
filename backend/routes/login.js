const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var mysql = require('mysql');
var mysqlConfig = require('../dbconfig.js');
var connection = mysql.createConnection(mysqlConfig);

router.get('/', function(req,res) {
	var msg;
	var errMsg = req.flash('error')
	if(errMsg) msg = errMsg;
	res.send('sd'+msg);
})

module.exports = router;
