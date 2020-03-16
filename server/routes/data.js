var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

// 读取数据模块
// data/read?type=it
// data/read?type=it.json
router.get('/read', function(req, res, next) {
  var type = req.param('type') || 'it';
  fs.readFile(PATH + type + '.json', function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取文件出现异常',
      });
    }
    var COUNT = 50;
    var obj = JSON.parse(data.toString());
    if (obj.length > COUNT) {
      obj = obj.slice(0, COUNT);
    }
    return res.send({
      status: 1,
      data: obj,
    });
  });
});

module.exports = router;
