import testView from "./view.vue"
// class的名字要和***.feature.js中***的部分保持一致

import useFeatureInView from "../useFeatureInView/useFeatureInView.feature.js"

class Main {
  constructor() {
    this.selfViewData = {
      time: "0",
      apis: {
        selfAlert: this.selfAlert.bind(this),
      }
    }
  }
  onCreated(featureParams, carry) {
    // vue单文件的created钩子,carry里会携带通过feature-view组件传递进来的参数(如果有的话)
    const scope = this
    setInterval(() => {
      scope.selfViewData.time = (new Date()).toUTCString()
    }, 1000);
  }

  onDestroyed() {
    // vue单文件的beforeDestroy钩子
  }

  selfAlert() {
    alert('aaaaaaaaaaa')
  }

  onViewMounted(featureParams) {
    // vue单文件的mounted钩子
  }

  viewData() {
    // 用法和vue单文件的data一样
    return this.selfViewData
  }

  viewComponents() {
    // 用法和vue单文件的components一样
    return {
      testView
    }
  }

  viewTemplate() {
    // 就跟你写vue单文件一摸一样
    return `
      <testView :time="time" :apis="apis" />
    `
  }

}