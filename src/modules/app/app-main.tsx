import React, { useEffect } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import { Button, Icon, IconRegistry, Layout, Text } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useDispatch } from 'react-redux'
import '@/configs/env.config'
import * as eva from '@eva-design/eva'
import { createAction } from '@/modules/app/utils/create-action'
import Screens from './app-screens'
import { INIT_APP } from './actions'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createAction(INIT_APP))
  }, [])

  return (
    <>
      <Screens />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  },
  likeButton: {
    marginVertical: 16
  }
})
