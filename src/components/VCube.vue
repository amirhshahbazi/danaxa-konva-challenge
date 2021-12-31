<template>
  <v-group ref="group" :config="groupConfig">
    <v-rect ref="front" v-if="frontFaceConfig" :config="frontFaceConfig"></v-rect>
    <v-line ref="top" v-if="topFaceConfig" :config="topFaceConfig"></v-line>
    <v-line ref="side" v-if="sideFaceConfig" :config="sideFaceConfig"></v-line>
  </v-group>
</template>

<script>
import cubeDrawer from "../utility/cubeDrawer"
import darkenColor from "../utility/color"

export default {
  name: "VCube",
  data() {
    return {
      groupConfig: {
        draggable: true,
      },
      frontFaceConfig: {},
      topFaceConfig: {},
      sideFaceConfig: {},
    }
  },
  props: {
    config: {
      type: Object,
    },
  },
  methods: {
    drawFrontFace() {
      this.frontFaceConfig = {
        x: this.config['click1'].x,
        y: this.config['click1'].y,
        width: this.config['click2'].x - this.config['click1'].x,
        height: this.config['click2'].y - this.config['click1'].y,
        fill: darkenColor(this.config.color, -30),
      }
    },
    drawOtherFaces() {
      this.drawSideFace()
      this.drawTopFace()
    },
    drawTopFace() {
      const points = cubeDrawer.getTopFaceVertices(this.config, this.frontFaceConfig.width, this.frontFaceConfig.height)
      this.topFaceConfig = {
        points,
        fill: darkenColor(this.config.color, 1),
        closed: true,
      }
    },
    drawSideFace() {
      const points = cubeDrawer.getSideFaceVertices(this.config, this.frontFaceConfig.width, this.frontFaceConfig.height)
      this.sideFaceConfig = {
        points,
        fill: darkenColor(this.config.color, -60),
        closed: true,
      }
    },
  },
  watch: {
    config: {
      handler(config) {
        if (config['click2'] && !config['click3']) this.drawFrontFace()
        if (config['click3']) this.drawOtherFaces()
      },
      deep: true,
      immediate: true,
    }
  },
}
</script>

<style scoped>

</style>
