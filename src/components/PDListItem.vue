<template>
  <a class="link" :href="pin.url" target="_blank">
    <img class="thumb" :src="pin.image" >
  </a>
</template>

<style scoped>
  .link {
    margin: 4px;
  }
  .thumb {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDListItem",
  props: [ "pin" ]
})
</script>