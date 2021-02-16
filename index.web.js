import { AppRegistry } from 'react-native'
import Appp from './app.json'
import App from './src/modules/app/app-3-redux-wrapper'
// import App from './src/modules/home/test'

AppRegistry.registerComponent(Appp.name, () => App)

AppRegistry.runApplication(Appp.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root')
})
