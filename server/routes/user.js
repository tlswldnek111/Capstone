var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ './server/SQL/user.xml' ]);
oracledb.autoCommit = true;
var common = require('../common');
const bcrypt = require('bcrypt');

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
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('user', 'selectUserInfo', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        const Result = common.Update_data(result)[0]
        if (Result === undefined) {
          res.json({success: 0});
        } else if(bcrypt.compareSync(req.body.PASSWORD, Result.PASSWORD)) {
          Result.success = 1;
          res.json(Result);
        } else {
          res.json({success: 0});
        }
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

    const PASSWORD = bcrypt.hashSync(req.body.PASSWORD, 10);
    
    var param = {
      ID: req.body.ID,
      NAME: req.body.NAME,
      PASSWORD: PASSWORD,
      PHONE: req.body.PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('user', 'insertUserInfo', param, format);
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
    let query = mybatisMapper.getStatement('user', 'checkId', param, format);
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
      NAME: req.body.NAME,
      PHONE: req.body.PHONE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('user', 'findId', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        res.json(common.Update_data(result)[0]);
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
    let query = mybatisMapper.getStatement('user', 'findPW', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
      } else {
        if (common.Update_data(result).length !== 0) {
          res.json({success: 1});
        } else {
          res.json({success: 0});
        }
      }
      connection.close();
    });
  })
})

router.post('/update_pw', function(req, res, next) {
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
    
    const PASSWORD = bcrypt.hashSync(req.body.PASSWORD, 10);

    var param = {
      ID: req.body.ID,
      PASSWORD: PASSWORD
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('user', 'updatePW', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
        res.json({success: 0});
      } else {
        res.json({success: 1});
      }
      connection.close();
    });
  })
})

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
    let query = mybatisMapper.getStatement('user', 'updateUser', param, format);
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