<template>
  <div class="button-background"
      v-on:click="$emit('click')">
    <div class="Jea gjz zI7 iyn Hsu" style="min-height: 40px; padding: 10px 14px;">
      <div class="tBJ dyH iFc MF7 erh DrD IZT mWe">
        <span class="button-label">{{ caption }}</span>
      </div>
    </div>
  </div>
</template>

<style>
  .button-background {
    border-radius: 22px;
    max-height: inherit;
    cursor: pointer;
    background-color: #e60023;
  }
  .button-background:hover {
    background-color: #ad081b;
  }
  .button-label {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDButton",
  props: [ "caption" ]
})
</script>