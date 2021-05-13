<template>
  <div class="view">
    This is view 
    {{time}}
    <br>
    <button @click="aler">
      alert
    </button>

    <br>
    <h2>view使用feature需要通过feature-view组件</h2>
    <img :src="hydFeaturePng" alt="">
    <h4>其中name是***.feature.js中***的那一部分,featureObject是你传给目标feature的参数,这个参数不会响应式变化</h4>
    <feature-view name="useFeatureInView" :featureObject="{
      time: this.time,
    }" />
  </div>
</template>

<script>
import hydFeaturePng from "../../../static/imgs/hyd-feature.png"
export default {
  props: {
    time: String,
    apis: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  data() {
    return {
      hydFeaturePng
    }
  },
  methods: {
    aler() {
      this.apis.selfAlert()
    }
  },
}
</script>

<style scoped>
.view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>