<template>
  <div class="app">
    <div class="app__color">
      <input type="color" v-model="color">
    </div>
    <div class="app__title">A tiny app to draw front-faced cubes out of 2D shapes.</div>
    <div class="app__warning" v-if="toastState">Only front-faced cubes are allowed!</div>
    <v-stage ref="stage" :config="stageConfig" @click.left.exact="handleStageClick" @keyup.space="resetClickState"
             @tap="handleStageClick">
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
      toastState: false,
      color: '#e8d721',
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
        this.cubes.push({...this.events, color: this.color})
      }

      if (this.clickCount === 3) {
        // check if the cube is front-faced
        // if not, reset click count
        if (!this.validateCoordinates(Object.entries(this.events).map(entry => entry[1]))) {
          this.resetClickState()
        }

        let lastCube = {...this.cubes.pop()}
        lastCube = {...this.events, color: this.color}
        this.cubes.push(lastCube)
        this.events = {}
      }
    },
    resetClickState() {
      this.events = {}
      if (this.clickCount === 2 || this.clickCount === 3) {
        this.cubes.pop()
      }
      this.clickCount = 0
    },
    validateCoordinates(coordinates) {
      if (coordinates[2].y > coordinates[0].y) {
        this.showToast()
        return false
      }
      return true
    },
    showToast() {
      this.toastState = true
      setTimeout(() => {
        this.toastState = false
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.app {
  .app__title, .app__warning {
    position: absolute;
    width: 100%;
    text-align: center;
    font-family: Arial;
    margin-top: 10px;
  }

  .app__warning {
    margin-top: 50px;
    color: darkorange;
  }

  .app__color {
    text-align: center;
    input {
      border: none;
      background: transparent;
      width: 35px;
      height: 35px;
    }
  }
}
</style>
