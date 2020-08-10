<template>
  <div class="seven-segment-container">
    <seven-segment :value="Math.floor(minute / 10)" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   :on-color="onColor"
                   :off-color="offColor" 
                   class="seven-segment" />
    <seven-segment :value="minute % 10" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   :on-color="onColor"
                   :off-color="offColor" 
                   class="seven-segment" />
    <div>
      <span class="segment-separator">:</span>
    </div>
    <seven-segment :value="Math.floor(second / 10)" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   :on-color="onColor"
                   :off-color="offColor" 
                   class="seven-segment" />
    <seven-segment :value="second % 10" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2"
                   :on-color="onColor"
                   :off-color="offColor" 
                   class="seven-segment" />
  </div>
</template>

<style>
  @import "../assets/_colors.css";

  .seven-segment-container {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .seven-segment {
    margin: 0 1px;
  }
  .segment-separator {
    font-size: 22px;
    color: var(--active-normal);
  }
</style>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import SevenSegmentDisplay from 'vue-seven-segment-display';

export default Vue.extend({
  name: "PDTime",
  components: {
    "seven-segment": SevenSegmentDisplay
  },
  props: { "ms" : Number },
  computed: {
    minute() {
      const m = moment(this.ms);
      return m.minute();
    },
    second() {
      const m = moment(this.ms);
      return m.second();
    },
    onColor() {
      return "var(--active-normal)";
    },
    offColor() {
      return "transparent";
    }
  }
})
</script>