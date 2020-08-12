<template>
  <a class="link" :href="pin.url" target="_blank">
    <img class="thumb" :src="pin.image" >
  </a>
</template>

<style scoped>
  .link {
    margin: 4px;
    cursor: zoom-in;
  }
  .thumb {
    width: 160px;
    height: 160px;
    object-fit: cover;
    object-position: left top;
    border-radius: 16px;
  }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDListItem",
  props: [ "pin" ]
})
</script>