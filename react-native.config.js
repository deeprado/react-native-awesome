// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-update': {
      platforms: {
        ios: null, // 阻止ios模块自动链接
      },
    },
  },
  assets: ['src/assets/fonts'],
};
