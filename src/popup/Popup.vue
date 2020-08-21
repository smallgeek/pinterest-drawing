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
    <div style="margin-bottom: 28px;">
      <div class="popup-config-category">切り替えの間隔</div>
      <div class="popup-flex">
        <!-- 30秒 -->
        <!-- TODO コンポーネントにする -->
        <div class="popup-radio">
          <input id="30" name="interval" type="radio" value="30" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="30">
            <div>30秒</div>
          </label>
        </div>
        <!-- 60秒 -->
        <div class="popup-radio">
          <input id="60" name="interval" type="radio" value="60" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="60">
            <div>60秒</div>
          </label>
        </div>
        <!-- 90秒 -->
        <div class="popup-radio">
          <input id="90" name="interval" type="radio" value="90" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="90">
            <div>90秒</div>
          </label>
        </div>
        <!-- 180秒 -->
        <div class="popup-radio">
          <input id="180" name="interval" type="radio" value="180" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="180">
            <div>180秒(3分)</div>
          </label>
        </div>
        <!-- 300秒 -->
        <div class="popup-radio">
          <input id="300" name="interval" type="radio" value="300" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="300">
            <div>300秒(5分)</div>
          </label>
        </div>
        <!-- 600秒 -->
        <div class="popup-radio">
          <input id="600" name="interval" type="radio" value="600" v-model.number="interval" @change="onIntervalChanged">
        </div>
        <div class="popup-label">
          <label for="600">
            <div>600秒(10分)</div>
          </label>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 28px;">
      <div class="popup-config-category">回数</div>
      <input class="popup-input" type="number" v-model.number="count" @change="onCountChanged">
    </div>
    <div style="margin-bottom: 28px;">
      <div class="popup-config-category">切り替えパターン (カンマ区切り秒単位。パターンが優先されます) </div>
      <input class="popup-input" type="text" v-model="pattern" @change="onPatternChanged" placeholder="例：120,120,180,180,300,600">
    </div>
    <!-- 履歴を保持する期間 -->
    <div style="margin-bottom: 28px;">
      <div class="popup-config-category">履歴を保持する期間</div>
      <div class="popup-flex">
        <div class="popup-select-container">
          <select class="popup-select" name="period" v-model="period" @change="onPeriodChanged">
            <option value="set">1セットのみ</option>
            <option value="hour">1時間</option>
            <option value="day">1日</option>
            <option value="week">1週間</option>
          </select>
          <div class="popup-select-arrow" style="padding-right:14px;padding-top:2px">
            <svg height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
              <path d="M12 19.5L.66 8.29c-.88-.86-.88-2.27 0-3.14.88-.87 2.3-.87 3.18 0L12 13.21l8.16-8.06c.88-.87 2.3-.87 3.18 0 .88.87.88 2.28 0 3.14L12 19.5z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <h3>拡張設定</h3>
    <div style="margin-bottom: 28px;">
      <div class="popup-config-category">音</div>
      <div class="popup-flex">
        <div class="popup-radio">
          <input id="none" name="sound" type="radio" value="0">
        </div>
        <div class="popup-label">
          <label for="none">
            <div>なし</div>
          </label>
        </div>
        <div class="popup-radio">
          <input id="system" name="sound" type="radio" value="1">
        </div>
        <div class="popup-label">
          <label for="system">
            <div>システム</div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .popup-container {
    font-family: 'SF Pro JP,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,"\30D2\30E9\30AE\30CE\89D2\30B4  Pro W3",Hiragino Kaku Gothic Pro,"\30E1\30A4\30EA\30AA",Meiryo,"\FF2D\FF33  \FF30\30B4\30B7\30C3\30AF",Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol';
    quotes: "\300C" "\300D";
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
  .popup-input {
    margin: 0;
    vertical-align: middle;
    line-height: normal;
    appearance: none;
    border-radius: 16px;
    border-style: solid;
    border-width: 2px;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    width: 100%;
    padding: 8px 16px;
    border-color: #ddd;
    background-color: #fff;
    color: #111;
    min-height: 48px;
    box-sizing: border-box;
  }
  .popup-select-container {
    color: #211922;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    box-sizing: border-box;
    width: 100%;
  }
  .popup-select {
    text-size-adjust: none;
    margin: 0;
    vertical-align: middle;
    appearance: none;
    border-radius: 16px;
    border-style: solid;
    border-width: 2px;
    padding: 0 35px 0 16px;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    width: 100%;
    border-color: #ddd;
    cursor: pointer;
    color: #111;
    background-color: transparent;
    position: relative;
    min-height: 48px;
  }
  .popup-select-arrow {
    text-size-adjust: none;
    color: #211922;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    align-items: center;
    padding-right: 14px;
    padding-top: 2px;
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
  computed: mapState(['interval', 'count', 'pattern', 'period']),
  methods: {
    onIntervalChanged: function(e: Event) {
      const interval = (e.target as HTMLInputElement).value;
      this.$store.commit("saveInterval", interval);
    },
    onCountChanged: function(e: Event) {
      const count = (e.target as HTMLInputElement).value;
      this.$store.commit("saveCount", count);
    },
    onPatternChanged: function(e: Event) {
      const pattern = (e.target as HTMLInputElement).value;
      this.$store.commit("savePattern", pattern);
    },
    onPeriodChanged: function(e: Event) {
      const period = (e.target as HTMLSelectElement).value;
      this.$store.commit("savePeriod", period);
    },
    close: () => {
      window.close();
    }
  }
});
</script>