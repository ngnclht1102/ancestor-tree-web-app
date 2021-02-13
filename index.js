/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/modules/app/codepush-wrapper'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
