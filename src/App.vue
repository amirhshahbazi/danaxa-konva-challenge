<template>
  <div id="app">
    <v-stage ref="stage" :config="stageConfig" @click="handleStageClick">
      <v-layer>
        <v-cube v-for="cube in cubes" :key="cube.id" :config="cube"></v-cube>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>

import VCube from "./components/VCube";

export default {
  name: 'App',
  components: {VCube},
  data() {
    return {
      clickCount: 0,
      stageConfig: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      cubeConfig: {},
      cubes: [],
    }
  },
  methods: {
    handleStageClick() {
      const {x, y} = this.$refs.stage.getNode().getPointerPosition()

      // reset click count after every three clicks
      this.clickCount = ++this.clickCount <= 3 ? this.clickCount : 1
      this.cubeConfig[`click${this.clickCount}`] = {
        x,
        y
      }

      if (this.clickCount === 2) {
        this.drawCube(x, y)
      }

      if (this.clickCount === 3) {
        this.updateCube()
      }
    }
    ,
    drawCube(x, y) {
      const prevX = this.cubeConfig['click1'].x
      const prevY = this.cubeConfig['click1'].y
      this.cubes.push({
        front: {
          id: (Math.random() + 1).toString(36).substring(7),
          x: prevX,
          y: prevY,
          width: x - prevX,
          height: y - prevY,
          fill: '#f00',
        },
        cubeConfig: this.cubeConfig,
      })
    }
    ,
    updateCube() {
      const lastCube = this.cubes.pop()
      const topPoints = this.createTopFace(lastCube)
      const sidePoints = this.createSideFace(lastCube)
      this.cubes.push({
        ...lastCube,
        topFace: {
          points: topPoints,
          fill: '#a00',
          closed: true,
        },
        sideFace: {
          points: sidePoints,
          fill: '#800',
          closed: true,
        }
      })
    },
    createTopFace(cube) {
      // const topFace = {}
      // const sideFace = {}
      const points = []
      points.push(cube.cubeConfig['click3'].x)
      points.push(cube.cubeConfig['click3'].y)
      points.push(cube.cubeConfig['click3'].x - cube.front.width)
      points.push(cube.cubeConfig['click3'].y)
      points.push(cube.cubeConfig['click1'].x)
      points.push(cube.cubeConfig['click1'].y)
      points.push(cube.cubeConfig['click1'].x + cube.front.width)
      points.push(cube.cubeConfig['click1'].y)
      return points
    },
    createSideFace(cube) {
      const points = []
      points.push(cube.cubeConfig['click3'].x)
      points.push(cube.cubeConfig['click3'].y)
      points.push(cube.cubeConfig['click1'].x + cube.front.width)
      points.push(cube.cubeConfig['click1'].y)
      points.push(cube.cubeConfig['click2'].x)
      points.push(cube.cubeConfig['click2'].y)
      points.push(cube.cubeConfig['click3'].x)
      points.push(cube.front.height + cube.cubeConfig['click3'].y)
      return points
    },
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
