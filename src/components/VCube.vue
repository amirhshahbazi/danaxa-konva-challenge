<template>
    <v-group>
      <v-rect :config="config.front"></v-rect>
      <v-line :config="config.topFace"></v-line>
      <v-line :config="config.sideFace"></v-line>
    </v-group>
</template>

<script>
export default {
  name: "VCube",
  props: {
    config: {
      type: Object,
      required: true,
    }
  },
  watch: {
    config: {
      handler(newConfig) {
        console.log(newConfig)
      },
      deep: true
    }
  },
}
</script>

<style scoped>

</style>
