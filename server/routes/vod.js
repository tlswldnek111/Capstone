var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ './server/SQL/vod.xml' ]);
oracledb.autoCommit = true;
var common = require('../common');
var mkdirp = require('mkdirp');
var fs = require('fs');

const makedir = (dir) => {
    mkdirp(dir, (err) => {
        if(err) {
            console.error(err);
        }
    })
}

var router = express.Router();

router.post('/upload', function(req, res, next) {
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
        TITLE: req.body.TITLE,
        CATEGORY: req.body.CATEGORY,
        CONTENT: req.body.CONTENT,
        IMAGEPATH: req.body.IMAGEPATH,
      };
  
      let format = {language: 'sql', indent: ' '};
      let query = mybatisMapper.getStatement('vod', 'insert_vod', param, format);
      console.log(query);
  
      connection.execute(query, [], function(err, result) {
        if (err) {
          console.error(err.message);
          res.json({success: 0});
        } else {
          res.json({success: 1});
          makedir('c:\\vod\\' + req.body.TITLE + '\\EPISODE');
        }
        connection.close();
      });
    })
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
      };
  
      let format = {language: 'sql', indent: ' '};
      let query = mybatisMapper.getStatement('vod', 'select_vod', param, format);
      console.log(query);
  
      connection.execute(query, [], function(err, result) {
        if (err) {
          console.error(err.message);
        } else {
          res.json(common.Update_data(result));
        }
        connection.close();
      });
    })
  });

router.get('/thumbnail', function(req, res, next) {
  if (req.query.name != null) {
    res.sendFile('c:\\vod\\' + req.query.name + "\\Thumbnail.jpg");
  }
  });
  
module.exports = router;