import Config from 'react-native-config'

const env: any = {
  ...Config,
  API_BASE: Config.API_URL
}

export default env
