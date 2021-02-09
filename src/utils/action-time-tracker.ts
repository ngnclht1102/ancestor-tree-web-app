import _ from 'lodash'
import { AsyncStorage } from 'react-native'
import moment from 'moment'
import { bugsnag } from '@/utils'
import global from '@/global'
import { reportTimeSheet } from '@/api/provider.api'
import { reportUserTimeSheet } from '@/api/user.api'
type TimeStamp = {
  time: number
  value: any
}

type TimeSheet = {
  timestamp_array: TimeStamp[]
  message_id?: number
  client_id?: string
  type: ActionType
}

type ActiveTimeSheet = {
  data: TimeSheet[]
}

type ActionType = 'typing' | 'microphone' | 'file'

const TIME_SHEET_KEY = 'TIME_SHEET_KEY_T2'
const restoreFromLastSession = async () => {
  try {
    const raw = await AsyncStorage.getItem(TIME_SHEET_KEY)
    if (raw) {
      const backupData = JSON.parse(raw)
      if (backupData && backupData.length)
        activeTimeSheet.data = [...activeTimeSheet.data, ...backupData]

      console.log('old data', activeTimeSheet.data)
    }
  } catch (error) {
    bugsnag().notify(error)
  }
}
restoreFromLastSession()

const activeTimeSheet: ActiveTimeSheet = {
  data: []
}

export const onEvent = (
  type: ActionType,
  params?: any,
  isStartEvent?: boolean
) => {
  // if this is a start event, so we need to clear all un-complete event for this type, since user aborted the last event
  if (isStartEvent) {
    const removeUnCompletedEventForType = (type: ActionType) =>
      _.remove(activeTimeSheet.data, function (t) {
        return !t.client_id && t.type === type
      })
    removeUnCompletedEventForType(type)
  }
  onAction(type, params)
}

// user cancel picking files
export const onDiscard = () => {
  // because user can pause typing to click picking file buttons
  const removeAllUnCompletedMessageButNotTypingEvent = () =>
    _.remove(activeTimeSheet.data, function (t) {
      return !t.client_id && t.type !== 'typing'
    })
  removeAllUnCompletedMessageButNotTypingEvent()
  console.log('onDiscard  ', activeTimeSheet.data)
}

// called on start sending message via API
export const onEnd = (type: ActionType, client_id: string) => {
  const needToAddEndEvent = type !== 'typing' // other actions like picking image, picking file will have only 1 start event but no end event, we need to add end event for these
  if (needToAddEndEvent) onAction(type, null, true)
  const unCompleteMessageIndex = getUnCompleteMessageIndex(type)
  if (
    unCompleteMessageIndex >= 0 &&
    activeTimeSheet.data[unCompleteMessageIndex]
  )
    activeTimeSheet.data[unCompleteMessageIndex].client_id = client_id
  backup()
}

// called when we got message id (returned from API)
export const onFinish = (client_id: string, message_id: number) => {
  const markMessageReadyToBeReported = () => {
    const index = _.findIndex(activeTimeSheet.data, { client_id })
    if (index >= 0) activeTimeSheet.data[index].message_id = message_id
  }
  markMessageReadyToBeReported()
  backup()
  reportToServer()
}

const getUnCompleteMessage = (type: ActionType) => {
  return activeTimeSheet.data.length
    ? activeTimeSheet.data.find((d: TimeSheet) => {
        return !d.client_id && d.type === type
      })
    : null
}

const getUnCompleteMessageIndex = (type: ActionType) => {
  return activeTimeSheet.data.length
    ? activeTimeSheet.data.findIndex((d: TimeSheet) => {
        return !d.client_id && d.type === type
      })
    : -1
}

const reportToServer = async () => {
  const ready = activeTimeSheet.data.filter((t: TimeSheet) => {
    return !!t.message_id
  })
  console.log({ current: activeTimeSheet.data, ready })
  const params: { activities: number[]; chat_message_id?: number }[] = []
  ready.forEach((timesheet: TimeSheet) => {
    params.push({
      activities: timesheet.timestamp_array.map((tp: TimeStamp) => tp.time),
      chat_message_id: timesheet.message_id
    })
  })

  console.log('params ', params)
  try {
    let result
    if (global.isUserApp()) {
      result = await reportUserTimeSheet(params)
    } else {
      result = await reportTimeSheet(params)
    }
    console.log('result', result)
    const removeSuccessReportedMessageFromQueue = () => {
      if (!result.data) return
      const successList = result.data.ok
      _.remove(activeTimeSheet.data, (d: TimeSheet) => {
        const foundInSuccessList =
          successList.findIndex((id: number) => {
            return id === d.message_id
          }) !== -1
        return foundInSuccessList
      })
    }
    removeSuccessReportedMessageFromQueue()
    backup()
  } catch (error) {
    bugsnag().notify(error)
  }
}

const backup = async () => {
  await AsyncStorage.setItem(
    TIME_SHEET_KEY,
    JSON.stringify(activeTimeSheet.data)
  )
}

const onAction = (type: ActionType, value?: any, isEndEvent?: boolean) => {
  const atm = moment().unix()
  const unCompleteMessage = getUnCompleteMessage(type)
  const isStartedNewMessage = !unCompleteMessage ? true : false
  if (isStartedNewMessage) {
    activeTimeSheet.data.push({
      timestamp_array: [
        {
          time: atm,
          value: value
        }
      ],
      message_id: undefined,
      client_id: undefined,
      type: type
    })
  } else {
    const unCompleteMessageIndex = getUnCompleteMessageIndex(type)
    if (
      unCompleteMessageIndex >= 0 &&
      activeTimeSheet.data[unCompleteMessageIndex]
    )
      activeTimeSheet.data[unCompleteMessageIndex].timestamp_array.push({
        time: atm,
        value: value
      })
  }
  console.log('onEvent  ', activeTimeSheet.data)
}
