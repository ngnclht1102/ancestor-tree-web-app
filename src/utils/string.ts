// import XRegExp from 'xregexp'

import moment from 'moment'

export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validateName = (name: string) => {
  // const pattern = XRegExp("^[\\pL\\pM\\pZ\\.\\(\\)\\-']+$")
  // return name && name.length >= 3 && pattern.test(name)
}

export const capitalize = (s: string) => {
  return s && s[0].toUpperCase() + s.slice(1)
}

export const convertSecondsToTimeString = (s: number) => {
  return moment().startOf('day').seconds(s).format('m:ss')
}
export const toClientString = (s: string) => {
  return capitalize(s.replace('_', ' '))
}
