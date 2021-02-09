import { Linking } from 'react-native'
import { buildGetQuery } from '@/api/helper.api'

export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  options: any = {}
) {
  const { cc, bcc } = options

  let url = `mailto:${to}`

  // Create email link query
  const query = buildGetQuery({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc
  })

  if (query.length) {
    url += `?${query}`
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url)

  if (!canOpen) {
    throw new Error('Provided URL can not be handled')
  }

  return Linking.openURL(url)
}
