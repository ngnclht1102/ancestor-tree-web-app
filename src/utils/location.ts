import RNGeolocation from '@react-native-community/geolocation'
import { PermissionsAndroid } from 'react-native'
import { bugsnag } from './errors'

export function calculateDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const p = 0.017453292519943295
  let c = Math.cos
  let a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

  return (7917.5 * Math.asin(Math.sqrt(a)) * 1.609344).toFixed(2)
}

const TIME_OUT = 3000

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This App needs access to your location ' +
          'so we can know where you are.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use locations ')
    } else {
      console.log('Location permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    let location_timeout = setTimeout(() => {
      console.log('getCurrentLocation timeout')
      resolve()
    }, TIME_OUT)

    RNGeolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(location_timeout)
        console.log('getCurrentLocation success. Detail' + pos.coords)
        resolve(pos.coords)
      },
      (err) => {
        console.log('getCurrentLocation failed. Detail: ' + err.message)
        bugsnag().notify(err)
        clearTimeout(location_timeout)
        resolve()
      },
      {
        timeout: TIME_OUT,
        enableHighAccuracy: true
      }
    )
  })
}

export async function getNearbyAddressByCoordinate(lat: number, long: number) {
  const url = `https://maps.google.com/maps/api/geocode/json?key=AIzaSyCMOHim2L1wAFq2xuI7tRFYBois-_m85Vc&latlng=${lat},${long}`
  return await fetch(url).then((res: any) => res.json())
}

export default null
