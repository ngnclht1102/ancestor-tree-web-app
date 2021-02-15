import * as React from 'react'

export const navigationRef = React.createRef()
export const isReadyRef = React.createRef()

export function app_navigate(name: string, params?: any) {
  // Perform navigation if the app has mounted
  if (isReadyRef.current && navigationRef.current) {
    // @ts-ignore
    navigationRef.current.navigate(name, params)
  } else {
  }
}
export function app_go_back(name: string, params?: any) {
  // Perform navigation if the app has mounted
  if (isReadyRef.current && navigationRef.current) {
    // @ts-ignore
    navigationRef.current.goBack(name, params)
  } else {
  }
}
