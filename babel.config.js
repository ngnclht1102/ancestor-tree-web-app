module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web'
        }
      }
    ]
  ],
  presets: ['module:metro-react-native-babel-preset']
}
