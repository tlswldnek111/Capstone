var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ '../backend/SQL/user.xml' ]);
oracledb.autoCommit = true;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  oracledb.getConnection({
    user : dbConfig.user,
    password : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    
    var param = {
      ID: req.body.ID,
      PASSWORD: req.body.PASSWORD
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'selectUserInfo', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        var column = []
        var row = {}
        var data = []
        for (var i of result.metaData) {
          column.push(i['name']);
        }
        for (var i = 0; i < result.rows.length; i++) {
          for (var j = 0; j < column.length; j++) {
            row[column[j]] = result.rows[i][j];
          }
          data.push(row);
        }
        res.json(data);
      }
      connection.close();
    });
  })
});

router.post('/register', function(req, res, next) {
  oracledb.getConnection({
    user : dbConfig.user,
    password : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    
    var param = {
      ID: req.body.ID,
      NAME: req.body.NAME,
      PASSWORD: req.body.PASSWORD
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'insertUserInfo', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
        res.json({ success: 0});
      } else {
        res.json({ success: 1});
      }
      connection.close();
    });
  })
})

module.exports = router;