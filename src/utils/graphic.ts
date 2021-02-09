import ImageResizer from 'react-native-image-resizer'
import { bugsnag } from '@/utils'

export const resizeImage = (
  image: any,
  width?: number,
  height?: number,
  quality?: number
) => {
  return new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(image, 1350, 1350, 'JPEG', 80, 0)
      .then((response: any) => {
        resolve(response)
      })
      .catch((err: any) => {
        bugsnag().notify(err)
        reject(err)
      })
  })
}

// width: real width of images (1x) in pixel
// height: real height of images (1x) in pixel
// maxWidth, maxHeight: max space for showing the images
export const getImageSizeWithCorrectRatio = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
) => {
  if (width >= height) {
    var ratio = maxWidth / width
    var h = Math.ceil(ratio * height)

    if (h > maxHeight) {
      // Too tall, resize
      var ratio = maxHeight / height
      var w = Math.ceil(ratio * width)
      var ret = {
        width: w,
        height: maxHeight
      }
    } else {
      var ret = {
        width: maxWidth,
        height: h
      }
    }
  } else {
    var ratio = maxHeight / height
    var w = Math.ceil(ratio * width)

    if (w > maxWidth) {
      var ratio = maxWidth / width
      var h = Math.ceil(ratio * height)
      var ret = {
        width: maxWidth,
        height: h
      }
    } else {
      var ret = {
        width: w,
        height: maxHeight
      }
    }
  }

  return ret
}
