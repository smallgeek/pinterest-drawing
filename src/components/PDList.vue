<template>
  <div class="pd-list-container">
    <div class="pd-list-title">
      <h1>履歴一覧</h1>
    </div>
    <div class="pd-list">
      <list-item v-for="h in this.$store.state.histories" :key="h.url" :pin="h">
    </div>
  </div>
</template>

<style scoped>
  .pd-list-container h1 {
    margin: 0;
    font-size: 28px;
    -webkit-font-smoothing: antialiased;
    color: #111;
    font-family: "SF Pro JP,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,"\30D2\30E9\30AE\30CE\89D2\30B4  Pro W3",Hiragino Kaku Gothic Pro,"\30E1\30A4\30EA\30AA",Meiryo,"\FF2D\FF33  \FF30\30B4\30B7\30C3\30AF",Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol";
    quotes: "\300C" "\300D";
    text-align: left;
  }

  .pd-list-title {
    color: #211922;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    padding: 32px;
    box-sizing: border-box;
    justify-content: center;
  }

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