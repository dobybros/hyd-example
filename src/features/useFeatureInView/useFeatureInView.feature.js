class useFeatureInView {
  constructor() {
    this.selfViewData = {

    }
  }
  onCreated(featureParams, carry) {
    this.selfViewData.carry = carry;
  }

  onDestroyed() {
    
  }

  onViewMounted(featureParams) {
    
  }

  viewData() {
    return this.selfViewData
  }

  viewComponents() {
    return {}
  }

  viewTemplate() {
    return `
      <div> 你带过来的参数是 {{carry}}</div>
    `
  }

}