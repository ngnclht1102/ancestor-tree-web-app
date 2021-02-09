import { Platform, Alert } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

export const onDownloadFile = async (attachment: string, name: string) => {
  try {
    const pathDir =
      Platform.OS === 'android'
        ? RNFetchBlob.fs.dirs.DownloadDir
        : RNFetchBlob.fs.dirs.DocumentDir
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      path: `${pathDir}/${name}`,
      IOSBackgroundTask: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: name,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`,
        description: 'Downloading',
        mediaScannable: true
      }
    })
      .fetch('GET', attachment, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data)
        } else {
          Alert.alert('File downloaded')
        }
      })

    // console.log(83, res)
  } catch (e) {
    console.log('error', e)
  }
}
