<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
<style lang="scss">
@import "./assets/style/custom.scss";
#app {
  height: 100%;
}
</style>