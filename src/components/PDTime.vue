<template>
  <div class="seven-segment-container">
    <seven-segment :value="Math.floor(minute / 10)" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   on-color="#e60023" 
                   off-color="transparent" 
                   class="seven-segment" />
    <seven-segment :value="minute % 10" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   on-color="#e60023" 
                   off-color="transparent" 
                   class="seven-segment" />
    <div>
      <span class="segment-separator">:</span>
    </div>
    <seven-segment :value="Math.floor(second / 10)" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2" 
                   on-color="#e60023" 
                   off-color="transparent" 
                   class="seven-segment" />
    <seven-segment :value="second % 10" 
                   :rounded="false" 
                   :segment-width="8" 
                   :segment-height="2"
                   on-color="#e60023" 
                   off-color="transparent" 
                   class="seven-segment" />
  </div>
</template>

<style>
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
    color: #e60023;
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
    }
  }
})
</script>