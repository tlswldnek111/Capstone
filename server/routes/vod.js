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

const image_storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    console.log("파일이름: " + file.originalname);
    cb(null, 'server/vod/' + file.originalname.split('.')[0]);
  },
  filename: (req, file, cb)=>{
    cb(null, 'Thumbnail.' + file.originalname.split('.')[1]);
  }
});

const video_storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    console.log(file.originalname);
    cb(null, 'server/vod/' + file.originalname.split('/')[0] + '/EPISODE');
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname);
  }
});

const upload_image = multer({storage: image_storage});
const upload_video = multer({storage: video_storage});

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

router.post('/upload_image', upload_image.single('file'), function(req, res, next) {
  res.json({success: 1});
});

router.post('/upload_video', upload_video.single('file'), function(req, res, next) {
  res.json({success: 1});
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
  var filename = '';

  const promise = ()=>{
    return new Promise((resolve, reject)=>{
      fs.readdir('server/vod/' + req.query.name, (error, filelist) => {
        if (error) {
          console.log(error);
        } else {
          for (let i = 0; i < filelist.length; i++) {
            if (filelist[i].includes('Thumbnail')) {
              filename = filelist[i];
            }
          }
          resolve('');
        }
      })
    });
  }
  promise()
  .then(()=>{
    if (req.query.name != null) {
      res.sendFile(filename, {
        root: 'server\\vod\\' + req.query.name
      });
    }
  })
});
  
module.exports = router;