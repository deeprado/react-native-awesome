var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

const ACCESS_TOKENS = {};
const REFRESH_TOKENS = {};

const USERS = {
  admin: 'admin',
};

const PARAMS_ERROR = {
  status: 'failure',
  message: '请求参数不合法',
};

router.post('/register', function(req, res) {
  const {username, password} = req.body;
  console.log(`用户：${username}，申请注册，密码为：${password}`);
  if (!username || !password) {
    res.json(PARAMS_ERROR);
    console.log('请求参数不合法');
  } else if (USERS[username] != null) {
    res.json(responseError('该用户已注册'));
    console.log(`用户: ${username}，已注册`);
  } else {
    USERS[username] = password;
    res.json(responseSuccess('注册成功'));
    console.log(`用户: ${username}，注册成功`);
  }
});

router.post('/login', function(req, res) {
  const {username, password} = req.body;
  console.log(`用户：${username}，正在登录，登录密码为：${password}`);
  if (USERS[username] === password) {
    clearOldToken(username);

    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    ACCESS_TOKENS[accessToken] = username;
    REFRESH_TOKENS[refreshToken] = username;
    res.json(
      responseSuccess('登录成功', {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 7200, // access_token 过期时间为 2 小时
      }),
    );
    console.log(`用户: ${username} 登录成功`);
    console.log(
      `ACCESS_TOKENS:${JSON.stringify(
        ACCESS_TOKENS,
      )}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`,
    );
  } else {
    res.json(responseError('用户名或密码错误'));
    console.log(`用户: ${username}，登录失败`);
  }
});

router.get('/refresh_token', function(req, res) {
  const refreshToken = req.query && req.query.refresh_token;
  console.log('Refresh token with token: ' + refreshToken);
  if (refreshToken) {
    const username = REFRESH_TOKENS[refreshToken];
    if (username) {
      clearOldToken(username);

      const accessToken = uuidv4();
      const newRefreshToken = uuidv4();
      ACCESS_TOKENS[accessToken] = username;
      REFRESH_TOKENS[newRefreshToken] = username;
      res.json(
        responseSuccess('成功', {
          access_token: accessToken,
          refresh_token: newRefreshToken,
          expires_in: 7200, // access_token 过期时间为 2 小时
        }),
      );
      console.log(
        `ACCESS_TOKENS:${JSON.stringify(
          ACCESS_TOKENS,
        )}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`,
      );
      return;
    }
  }
  res.json(responseError('token 错误'));
});

router.get('/logout', function(req, res) {
  const token = req.headers && req.headers.authorization;
  console.log('Log out with token: ' + token);
  if (token && ACCESS_TOKENS[token]) {
    clearOldToken(ACCESS_TOKENS[token]);
    res.json(responseSuccess('登出成功'));
    console.log(
      `ACCESS_TOKENS:${JSON.stringify(
        ACCESS_TOKENS,
      )}\nREFRESH_TOKENS:${JSON.stringify(REFRESH_TOKENS)}`,
    );
  } else {
    res.json(responseError('token 错误'));
  }
});

router.get('/profile', function(req, res) {
  const token = req.headers && req.headers.authorization;
  console.log('Get profile with token: ' + token);
  if (token && ACCESS_TOKENS[token]) {
    res.json(
      responseSuccess('成功获取用户信息', {
        username: ACCESS_TOKENS[token],
      }),
    );
    console.log('成功获取用户信息');
  } else {
    res.json(responseError('token 错误'));
  }
});

router.post('/sms', function(req, res) {
  const {username, code} = req.body;
  const token = req.headers && req.headers.authorization;
  console.log('Get profile with token: ' + token);
  // 发送短信

  // 返回结果
  res.json(
    responseSuccess('成功发送用户信息', {
      code: 200,
    }),
  );
  console.log('成功发送用户信息');
});

function responseError(message, data) {
  return {
    status: 'failure',
    message,
    data,
  };
}

function responseSuccess(message, data) {
  return {
    status: 'success',
    message,
    data,
  };
}

function clearOldToken(username) {
  for (let token in ACCESS_TOKENS) {
    if (ACCESS_TOKENS[token] === username) {
      delete ACCESS_TOKENS[token];
      break;
    }
  }
  for (let token in REFRESH_TOKENS) {
    if (REFRESH_TOKENS[token] === username) {
      delete REFRESH_TOKENS[token];
      break;
    }
  }
}

module.exports = router;
