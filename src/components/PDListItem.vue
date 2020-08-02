<template>
  <div>{{image}}</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDListItem",
  props: [ "image" ]
})
</script>