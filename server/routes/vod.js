var express = require('express');
var oracledb = require('oracledb');
var mybatisMapper = require('mybatis-mapper');
var dbConfig = require('../config/dbConfig');
mybatisMapper.createMapper([ './server/SQL/vod.xml' ]);
oracledb.autoCommit = true;
var common = require('../common');
var mkdirp = require('mkdirp');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'server/vod/' + file.originalname);
  },
  filename: (req, file, cb)=>{
    cb(null, 'thumbnail.jpg')
  }
})

var upload = multer({
  dest: 'upload/'
});

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
        makedir('server\\vod\\' + req.body.TITLE + '\\EPISODE');
      }
      connection.close();
    });
  })
});

router.post('/upload_image', upload.single('file'), function(req, res, next) {
  console.log(req.file.originalname);
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

router.post('/select_one', function(req, res, next) {
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
      TITLE: req.body.TITLE
    };

    let format = {language: 'sql', indent: ' '};
    let query = mybatisMapper.getStatement('vod', 'select_one_vod', param, format);
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
});

router.post('/title', function(req, res, next) {
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
    let query = mybatisMapper.getStatement('vod', 'select_title', param, format);
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

router.post('/select_episode', function(req, res, next) {
  fs.readdir('server/vod/' + req.body.TITLE + '/EPISODE', (error, filelist) => {
    if (error) {
      res.send(error);
    } else {
      res.send(filelist);
    }
  })
});

router.get('/thumbnail', function(req, res, next) {
  if (req.query.name != null) {
    res.sendFile('Thumbnail.jpg', {
      root: 'server\\vod\\' + req.query.name
    });
  }
  });
  
module.exports = router;