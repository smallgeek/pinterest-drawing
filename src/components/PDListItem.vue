<template>
  <img :src="image" >
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDListItem",
  props: [ "image" ]
})
</script>