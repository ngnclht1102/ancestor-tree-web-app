import React from 'react'
import { SafeAreaView } from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { app_go_back } from '@/modules/app/navigation/navigation-service'

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />

type AppHeaderProps = {
  title: string
  accessoryLeft?: any
  accessoryRight?: any
}

const AppHeader = (props: AppHeaderProps) => {
  const navigateBack = () => {
    app_go_back()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  return (
    <>
      <TopNavigation
        title={props.title || 'title'}
        alignment="center"
        accessoryLeft={props.accessoryLeft || BackAction}
        accessoryRight={props.accessoryRight}
      />
      <Divider />
    </>
  )
}

export default AppHeader
