<template>
  <div>
    <list-item v-for="h in this.$store.state.histories" :key="h" :image="h">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PDListItem from './PDListItem.vue';

export default Vue.extend({
  name: "PDList",
  components: {
    "list-item": PDListItem
  }
})
</script>