<template>
  <div id="drawing-container">
    <Navigation />
  </div>
</template>

<script lang="ts">
import Navigation from "./components/Navigation.vue";
export default {
  name: "app",
  components: {
    Navigation
  }
};
</script>