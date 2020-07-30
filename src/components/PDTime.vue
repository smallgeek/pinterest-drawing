<template>
  <div>
    <span>{{ time }}</span>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue'

export default Vue.extend({
  name: "PDTime",
  props: { "ms" : Number },
  computed: {
    time() {
      return moment(this.ms).format("mm:ss");
    }
  }
})
</script>