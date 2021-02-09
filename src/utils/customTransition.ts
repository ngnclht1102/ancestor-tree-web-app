const slideFromBottom = (position: any, index: any) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1]

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1, 0]
  })

  const translateX = 0
  const translateY = position.interpolate({
    inputRange,
    outputRange: [50, 0, 0, 0]
  })

  return { opacity, transform: [{ translateX }, { translateY }] }
}

const slideFromRight = (position: any, index: any, layout: any) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [layout.initWidth, 0, 0]
  })

  const opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.3, 0]
  })

  return { opacity, transform: [{ translateX }] }
}

export const slideFromRightForScreens = (fromRightScenes: any) => () => ({
  screenInterpolator: (sceneProps: any) => {
    const { layout, position, scene } = sceneProps
    const { index } = scene
    if (fromRightScenes.indexOf(scene.route.routeName) > -1) {
      return slideFromRight(position, index, layout)
    }
    return slideFromBottom(position, index)
  }
})
