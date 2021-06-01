var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ './server/SQL/board.xml' ]);
oracledb.autoCommit = true;
var common = require('../common');

var router = express.Router();

router.post('/write', function(req, res, next) {
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
        TITLE: req.body.TITLE,
        CONTENT: req.body.CONTENT,
        LOCK: req.body.LOCK,
        V_IDX: req.body.V_IDX
      };
  
      let format = {language: 'sql', indent: ' '};
      let query = mybatisMapper.getStatement('board', 'insert_board', param, format);
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
  });

  router.post('/update_reply', function(req, res, next) {
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
      IDX: req.body.IDX,
      CONTENT: req.body.CONTENT,
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'update_reply', param, format);
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
});

router.post('/update_views', function(req, res, next) {
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
      IDX: req.body.IDX
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'update_views', param, format);
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
});

router.post('/write_reply', function(req, res, next) {
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
      B_IDX: req.body.B_IDX,
      ID: req.body.ID,
      CONTENT: req.body.CONTENT,
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'insert_reply', param, format);
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
});

router.post('/update_reply', function(req, res, next) {
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
      IDX: req.body.IDX,
      CONTENT: req.body.CONTENT,
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'update_reply', param, format);
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
});

router.post('/delete_reply', function(req, res, next) {
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
      IDX: req.body.IDX,
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'delete_reply', param, format);
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
    
    if (req.body.IDX != null) {
      param = {
        IDX: req.body.IDX,
      };
    }

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'select_board', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
        res.json({success: 0});
      } else {
        res.json(common.Update_data(result));
      }
      connection.close();
    });
  })
});

router.post('/select_reply', function(req, res, next) {
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
      B_IDX: req.body.B_IDX
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('board', 'select_reply', param, format);
    console.log(query);

    connection.execute(query, [], function(err, result) {
      if (err) {
        console.error(err.message);
        res.json({success: 0});
      } else {
        res.json(common.Update_data(result));
      }
      connection.close();
    });
  })
});

  module.exports = router;