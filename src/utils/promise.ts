export const delayPromise = (timeout: number) =>
  new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })

export default {
  delayPromise
}
