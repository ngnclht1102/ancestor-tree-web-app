class Alert {
  alert: any = null

  setAlert(alert: any) {
    this.alert = alert
  }

  showError(error: string) {
    this.alert &&
      this.alert.alertWithType('error', 'An error has occured', error)
  }

  showMessage(
    title: string,
    message: string,
    onPress?: (payload?: any) => void,
    onPressParams?: any,
    renderImageContext?: () => void,
    render2ndImageContext?: () => void
  ) {
    this.alert &&
      this.alert.alertWithType(
        null,
        title,
        message,
        onPressParams,
        1,
        onPress,
        renderImageContext,
        render2ndImageContext
      )
  }

  dismiss() {
    this.alert && this.alert.close('tap')
  }
}

// make sure it is singleton
const alert_instance = new Alert()
export default alert_instance
