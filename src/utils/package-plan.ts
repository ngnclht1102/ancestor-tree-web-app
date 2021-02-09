import moment from 'moment'

const isBillLineItemAboutUnusedTimeLeft = (item: APISHAPE.LineItem) => {
  const isUnusedTimeLeft =
    item.amount < 0 && item.description.toLowerCase().includes('unused time')
  return isUnusedTimeLeft
}

export const getBillLineItemAboutUnusedTimeLeft = (
  data: APISHAPE.PackagePreview | null
): {
  amount: string
  amountInNumber: number
  periodLeft: string
  dayRemaining: number
} | null => {
  console.log('inside getBillLineItemAboutUnusedTimeLeft data', data)
  if (!data || !data.line_items || !data.line_items.length) return null
  const billLineItem = data.line_items.find((item) =>
    isBillLineItemAboutUnusedTimeLeft(item)
  )
  console.log(
    'inside getBillLineItemAboutUnusedTimeLeft billLineItem',
    billLineItem
  )

  if (!billLineItem) return null
  return {
    amountInNumber: Math.abs(billLineItem.amount),
    amount: `-${billLineItem.currency}${Math.abs(billLineItem.amount)}`,
    periodLeft: `${moment().add(1, 'day').format('MMMM Do YYYY')} - ${moment(
      billLineItem.period_end
    ).format('MMMM Do YYYY')}`,
    dayRemaining:
      Math.abs(moment(billLineItem.period_end).diff(moment(), 'days')) - 1
  }
}
