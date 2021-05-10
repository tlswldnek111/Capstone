var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ './server/SQL/user.xml' ]);
oracledb.autoCommit = true;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('테스트');
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
        var column = [];
        var row = {};
        var data = [];
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
      PASSWORD: req.body.PASSWORD,
      PHONE: req.body.PHONE
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

router.post('/check_id', function(req, res, next) {
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
      ID: req.body.ID
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'checkId', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        if (result['rows'][0][0] === 0) {
          res.json({ check: 0});//없을때
        }
        else {
          res.json({ check: 1});//있을때
        }
      }
      connection.close();
    });
  })
})

router.post('/find_id', function(req, res, next) {
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
      NAME: req.body.NAME,
      PHONE: req.body.PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'findId', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        if (result['rows']) {//존재하면 열전체가가는데 검색값없으면 배열수는0 있으면 1
           res.json({ ID:result['rows']});
          console.log(result['rows']);
        }
      }
      connection.close();
    });
  })
})

router.post('/find_pw', function(req, res, next) {
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
      PHONE: req.body.PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'findPW', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        if (result['rows']) {//존재하면 열전체가가는데 검색값없으면 배열수는0 있으면 1
           res.json({ PASSWORD:result['rows']});
          console.log(result['rows']);
        }
      }
      connection.close();
    });
  })
})

module.exports = router;