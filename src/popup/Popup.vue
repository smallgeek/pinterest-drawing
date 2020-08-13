<template>
  <div class="popup-container">
    <div class="popup-title">
      <div class="popup-description">
        <h1>Pinterest Drawing (Beta)</h1>
        <div>カスタマイズして自分の目標に合った動作に変更できます。</div>
      </div>
      <div class="popup-button-container">
        <pdbutton caption="閉じる" v-on:click="close"></pdbutton>
      </div>
    </div>
    <h3>基本設定</h3>
    <div class="popup-config-category">切り替えの間隔</div>
    <div class="popup-flex">
      <!-- 30秒 -->
      <!-- TODO コンポーネントにする -->
      <div class="popup-radio">
        <input id="30" name="interval" type="radio" value="30000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="30">
          <div>30秒</div>
        </label>
      </div>
      <!-- 60秒 -->
      <div class="popup-radio">
        <input id="60" name="interval" type="radio" value="60000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="60">
          <div>60秒</div>
        </label>
      </div>
      <!-- 90秒 -->
      <div class="popup-radio">
        <input id="90" name="interval" type="radio" value="90000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="90">
          <div>90秒</div>
        </label>
      </div>
      <!-- 180秒 -->
      <div class="popup-radio">
        <input id="180" name="interval" type="radio" value="180000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="180">
          <div>180秒(3分)</div>
        </label>
      </div>
      <!-- 300秒 -->
      <div class="popup-radio">
        <input id="300" name="interval" type="radio" value="300000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="300">
          <div>300秒(5分)</div>
        </label>
      </div>
      <!-- 600秒 -->
      <div class="popup-radio">
        <input id="600" name="interval" type="radio" value="600000" v-model.number="interval" @change="onChanged">
      </div>
      <div class="popup-label">
        <label for="600">
          <div>600秒(10分)</div>
        </label>
      </div>
    </div>
  </div>
</template>

<style>
  .popup-container {
    font-family: 'SF Pro JP,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,"\30D2\30E9\30AE\30CE\89D2\30B4  Pro W3",Hiragino Kaku Gothic Pro,"\30E1\30A4\30EA\30AA",Meiryo,"\FF2D\FF33  \FF30\30B4\30B7\30C3\30AF",Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol';
    width: 700px;
    height: 400px;
    padding: 10px;
  }
  .popup-title {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }
  .popup-description {
    font-size: 14px;
  }
  .popup-description h1 {
    text-size-adjust: none;
    margin: 0;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 36px;
    color: #111;
    quotes: "\300C" "\300D";
    text-align: left;
    flex-grow: 0;
  }
  .popup-container h3 {
    font-size: 20px;
    quotes: '"\300C" "\300D"';
    color: '#111';
  }
  .popup-container label {
    font-size: 16px;
  }
  .popup-button-container {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .popup-config-category {
    margin-bottom: 8px;
  }
  .popup-flex {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-items: center;
  }
  .popup-radio input {
    text-size-adjust: none;
    color: #211922;
    font-size: 12px;
    vertical-align: middle;
    line-height: normal;
    cursor: pointer;
    height: 24px;
    width: 24px;
    border-color: #ddd;
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    background-color: #fff;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  .popup-radio input:checked {
    border-width: 8px;
    border-color: #111;
    padding: 0 4px;
  }
  .popup-label {
    padding: 0 4px;
    margin-right: 12px;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: "Popup",
  data() {
    return {};
  },
  computed: mapState(['interval']),
  methods: {
    onChanged: function(e: Event) {
      console.log("changed");
      const interval = (e.target as HTMLInputElement).value;
      this.$store.commit("saveInterval", interval);
    },
    close: () => {
      window.close();
    }
  }
});
</script>