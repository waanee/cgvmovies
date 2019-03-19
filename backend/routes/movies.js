var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConfig = require('../dbconfig.js');
var connection = mysql.createConnection(mysqlConfig);

// GET /
router.get('/', function(req, res, next) {
  var responseData = {};

    var query = connection.query('select * from movies', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = 1;
            responseData.data = rows;
        }else{
            responseData.result = 0;
            responseData.data = "";
        }
        res.json(responseData);
    });

});

// GET /:id
router.get('/:id', function(req, res, next){
   var id = parseInt(req.params.id, 10);

   var responseData = {};
   var query = connection.query('select * from movies where id =?', [id], function(err, rows){
      if(err) throw err;
      if(rows[0]) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      res.json(responseData)
   });

});


// POST
router.post('/', function(req,res){
  var name = req.body.title;
  var year = req.body.year;
  var director = req.body.director;
  var poster = req.body.imgsrc;

  var sql = "insert into movies (name,year,director,poster) values(?,?,?,?)";
  var params = [name,year,director,poster]; 
  var query = connection.query(sql, params, function(err, rows){
      if(err) throw err;
      res.json({'result':1});
      
  });

});


// PUT
router.put('/:id', function(req,res){
  var id = req.params.id;
  var name = req.body.title;
  var year = req.body.year;
  var director = req.body.director;
  var poster = req.body.imgsrc;
  
  var sql = "update movies set name=?, year=?, director=?, poster=? where id=?";
  var params = [name,year,director,poster,id]; 

  var query = connection.query(sql, params, function(err, rows){
     if(err) throw err;
     return res.json({'result':1});
  });
});



// DELETE
router.delete('/:id', function(req,res) {
	var id = req.params.id;
  var responseData = {};
  var sql = "delete from movies where id ='"+id+"'";
  
	var query = connection.query(sql, function(err, rows) {
		if(err) throw err;

		if(rows.affectedRows > 0) {
			responseData.result = 1;
			responseData.data = id;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
});




module.exports = router;
