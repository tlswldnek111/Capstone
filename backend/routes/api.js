var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');

mybatisMapper.createMapper([ '../backend/SQL/user.xml' ]);
oracledb.autoCommit = true;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({username:'Ohdong'});
});

router.get('/test', function(req, res, next) {
  res.json({username:'test'});
});

router.post('/select', function(req, res, next) {
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
      USERNAME : req.body.USERNAME
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'selectUserInfo', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        res.json(result);
      }
      connection.close();
    });
  })
});

module.exports = router;