<template>
  <div :class="['button-background', { 'button-background-active' : isActive }]"
      v-on:click="$emit('click')">
    <div class="Jea gjz zI7 iyn Hsu" style="min-height: 40px; padding: 10px 14px;">
      <div class="tBJ dyH iFc MF7 erh DrD IZT mWe">
        <span :class="['button-label', { 'button-label-active' : isActive } ]">{{ caption }}</span>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../assets/_colors.css";

  .button-background {
    border-radius: 22px;
    max-height: inherit;
    cursor: pointer;
    background-color: var(--button-normal);
  }

  .button-background:hover {
    background-color: var(--button-hover);
  }

  .button-label {
    color: var(--button-text);
    font-size: 14px;
    font-weight: 700;
  }

  .button-background-active {
    background-color: var(--active-normal);
  }

  .button-background-active:hover {
    background-color: var(--active-hover);
  }

  .button-label-active {
    color: var(--active-text);
  }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "PDButton",
  props: [ "caption", "isActive" ]
})
</script>