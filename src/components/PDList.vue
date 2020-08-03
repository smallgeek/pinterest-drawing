<template>
  <div class="pd-list">
    <list-item v-for="h in this.$store.state.histories" :key="h.url" :pin="h">
  </div>
</template>

<style scoped>
  .pd-list {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
  }
</style>

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