var express = require('express');
var router = express.Router();
var fs = require('fs');
var xss = require('xss');
var util = require('../utils/common');
var PATH = './public/data/';

// 存储数据模块
// data/read?type=it
// data/read?type=it.json
router.get('/write', function(req, res, next) {
  // 指定文件名
  var type = req.param('type') || 'it';
  //  关键字段：
  var url = req.param('url') || '';
  var title = req.param('title') || '';
  var img = req.param('img') || '';

  if (!type || !url || !title || !img) {
    return res.send({
      status: 0,
      info: '参数错误',
    });
  }

  var targetFile = PATH + type + '.json';
  // 需要拿到文件信息，解析
  var obj = [];
  fs.readFile(targetFile, function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取文件出现异常',
      });
    }
    // 历史数据
    var arr = JSON.parse(data.toString());
    // 新记录
    var obj = {
      img: img,
      url: url,
      title: title,
      id: util.guidGenerate(),
      time: new Date(),
    };
    arr.splice(0, 0, obj);
    // 写入修改后数据
    var newData = JSON.stringify(arr);
    fs.writeFile(targetFile, newData, function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '写入文件出现异常',
        });
      }
      return res.send({
        status: 1,
        info: '写入成功',
        data: obj,
      });
    });
  });
});

// 阅读模块
router.get('/write_config', function(req, res, next) {
  // TODO 后期对提交数据进行验证
  var body = xss(req.body);
  var data = body.data;

  var obj = {};
  try {
    obj = JSON.parse(data);
  } catch (err) {
    return res.send({
      status: 0,
      info: '解析',
    });
  }
  var newData = JSON.stringify(obj);

  // 指定文件名
  var type = req.param('type') || 'it';
  //  关键字段：
  var url = req.param('url') || '';
  var title = req.param('title') || '';
  var img = req.param('img') || '';

  if (!type || !url || !title || !img) {
    return res.send({
      status: 0,
      info: '参数错误',
    });
  }

  var targetFile = PATH + 'config.json';

  fs.writeFile(targetFile, newData, function(err) {
    if (err) {
      return res.send({
        status: 0,
        info: '写入文件出现异常',
      });
    }
    return res.send({
      status: 1,
      info: '写入成功',
      data: obj,
    });
  });
});

module.exports = router;
