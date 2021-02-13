import { StyleSheet, Platform } from 'react-native'

const HOZ_SPACING = 20

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: HOZ_SPACING,
    alignItems: 'center',
    justifyContent: 'center'
  },
  f1: { flex: 1 },
  txtTitle: {
    fontWeight: '900',
    textAlign: 'center'
  },
  middle: {
    height: '45.0405%',
    justifyContent: 'center'
  },
  img: {
    width: '78.6667%',
    resizeMode: 'contain'
  },
  txt: {
    fontSize: 16,
    color: '#59817D',
    textAlign: 'center',
    marginTop: 42
  },
  bottomView: {
    alignItems: 'center',
    marginTop: 42
  },
  version: {
    color: '#928F8F',
    textAlign: 'center'
  }
})

export default styles
