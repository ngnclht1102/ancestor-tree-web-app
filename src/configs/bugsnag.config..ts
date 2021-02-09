import { Client, Configuration } from 'bugsnag-react-native'
import DeviceInfo from 'react-native-device-info'
import Config from '../configs/env.config'
import store from '../configs/store.config'

var bugsnag_client: Client

export const bugsnag = () => {
  if (bugsnag_client) return bugsnag_client
  const configuration = new Configuration()

  configuration.apiKey = Config.BUGSNAG_KEY
  configuration.appVersion = DeviceInfo.getVersion()

  configuration.registerBeforeSendCallback((report: any) => {
    report.metadata = {
      ...(report.metaData || {}),
      reduxState: store.getState()
    }
  })

  bugsnag_client = new Client(configuration)
  bugsnag_client.enableConsoleBreadcrumbs()
  return bugsnag_client
}
