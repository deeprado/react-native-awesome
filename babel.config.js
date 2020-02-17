module.exports = {
  // plugins: ['syntax-decorators', 'transform-decorators-legacy'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
