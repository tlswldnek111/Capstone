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
        res.json(Update_data(result));
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
          res.json({ check: 0});
        }
        else {
          res.json({ check: 1});
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
      NAME: req.body.ID,
      PHONE: req.body.PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'findId', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        if (result['rows'][0][0] === 0) {
          res.json({ check: 0});
        }
        else {
          res.json({ check: 1});
        }
      }
      connection.close();
    });
  })
})

function Update_data(result) {
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
  return data;
}

router.post('/update', function(req, res, next) {
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
    
    const PASSWORD = req.body.PASSWORD ? req.body.PASSWORD : null;
    const NAME = req.body.NAME ? req.body.NAME : null;
    const PHONE = req.body.PHONE ? req.body.PHONE : null;

    var param = {
      ID: req.body.ID,
      PASSWORD: PASSWORD,
      NAME: NAME,
      PHONE: PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('oracleMapper', 'updateUser', param, format);
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