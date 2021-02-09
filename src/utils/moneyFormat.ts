import { rSizeV } from '@/configs/metrics.config'

export function moneyFormat(price: string | number, sign: string = '$') {
  if (!price) return `${sign} 0.00`
  const pieces = parseFloat(`${price}`).toFixed(2).split('')
  let ii = pieces.length - 3
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, ',')
  }
  return `${sign} ${pieces.join('')}`
}

export const getMoneyFontSize = (amount: number) => {
  if (amount <= 999) return rSizeV(23)
  if (amount <= 9999) return rSizeV(20)
  if (amount <= 99999) return rSizeV(18)
  if (amount <= 999999) return rSizeV(15)
}
