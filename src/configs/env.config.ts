import Config from 'react-native-config'

const env: any = {
  ...Config,
  API_BASE: Config.API_URL
}

setTimeout(() => {
  console.log(env)
}, 1000)

export default env
