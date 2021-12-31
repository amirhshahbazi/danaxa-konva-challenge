<template>
  <div id="app">
    <v-stage ref="stage" :config="stageConfig" @click="handleStageClick">
      <v-layer>
        <v-cube v-for="(cube, index) in cubes" :key="index" :config="cube"></v-cube>
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
      events: {},
      cubes: [],
    }
  },
  methods: {
    handleStageClick() {
      const {x, y} = this.$refs.stage.getNode().getPointerPosition()

      // reset click count after every three clicks
      this.clickCount = ++this.clickCount <= 3 ? this.clickCount : 1
      this.events[`click${this.clickCount}`] = {
        x,
        y
      }

      if (this.clickCount === 2) {
        this.cubes.push(this.events)
      }

      if (this.clickCount === 3) {
          // this.validateCoordinates(Object.entries(this.events).map(entry => entry[1]))
        let lastCube = {...this.cubes.pop()}
        lastCube = {...this.events}
        this.cubes.push(lastCube)
        this.events = {}
      }
    },
    // validateCoordinates(coordinates) {
    //   return true
    // }
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
