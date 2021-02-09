import moment from 'moment'

export function toLocal(time: any) {
  return moment.utc(time).local()
}

export const getNextBillingDate = (user: any) => {
  if (
    !user ||
    !user.activeSubscription ||
    !user.activeSubscription.next_payment_date
  )
    return ''
  return moment(user.activeSubscription.next_payment_date).format('DD MMM YYYY')
}

export const getNextEffectiveDate = (user: any) => {
  if (
    !user ||
    !user.activeSubscription ||
    !user.activeSubscription.next_payment_date
  )
    return ''
  return moment(user.activeSubscription.next_payment_date)
    .add(1, 'days')
    .format('Do MMM YYYY')
}
