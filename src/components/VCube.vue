<template>
    <v-group ref="grp" :config="groupConfig">
      <v-rect v-if="frontFaceConfig" :config="frontFaceConfig"></v-rect>
      <v-line v-if="topFaceConfig" :config="topFaceConfig"></v-line>
      <v-line v-if="sideFaceConfig" :config="sideFaceConfig"></v-line>
    </v-group>
</template>

<script>
import cubeDrawer from "../utility/cubeDrawer"
export default {
  name: "VCube",
  data() {
    return {
      groupConfig: {
        draggable: true,
        scaleX: 1,
        scaleY: 1,
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
        id: (Math.random() + 1).toString(36).substring(7),
        x: this.config['click1'].x,
        y: this.config['click1'].y,
        width: this.config['click2'].x - this.config['click1'].x,
        height: this.config['click2'].y - this.config['click1'].y,
        fill: '#a00',
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
        fill: '#f00',
        closed: true,
      }
    },
    drawSideFace() {
      const points = cubeDrawer.getSideFaceVertices(this.config, this.frontFaceConfig.width, this.frontFaceConfig.height)
      this.sideFaceConfig = {
        points,
        fill: '#800',
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
