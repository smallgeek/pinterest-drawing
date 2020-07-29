<template>
  <div class="navigation-container">
    <pdbutton v-on:click="changeMode" :caption="buttonText" />
    <div>
      <span>{{ leftTime }}</span>
    </div>
  </div>
</template>

<style>
  .navigation-container {
    display: flex;
    flex-direction: row;
  }
</style>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: "Navigation",
  data() {
    return {
      limit: 0,
      beginTime: 0,
      currentTime: 0,
      intervalId: 0
    }
  },
  computed: {
    leftTime() {
      let left = 0;

      // おかしな時刻表示にならないようにデータが揃ってから計算
      if (this.$data.currentTime && this.$data.beginTime) {
        const diff = this.$data.limit - (this.$data.currentTime - this.$data.beginTime);
        left = Math.max(0, diff);
      }

      return moment(left).format("mm:ss");
    },
    buttonText() {
      return this.$store.getters.isDrawing ? "停止" : "開始";
    }
  },
  methods: {
    changeMode(event: Event) {
      // 実行中でなければ
      if (!this.$store.getters.isDrawing) {
          this.startDrawing(true);
      } else {
          this.stopDrawing();
          //TODO: ピンの一覧を表示する
      }
    },

    startTimer() {
        return setTimeout(() => {

            // ピンを履歴に保存する
            this.$store.commit("addHistory", document.location.href.replace("https://pinterest.jp/", ""));

            // 次のピンを取得
            //TODO: ボタンを押してから表示したピンは除く
            const wrappers = document.querySelectorAll("[data-test-id='pinWrapper']");

            for (const wrapper of Array.from(wrappers)) {
                // 履歴に無いものを次のピンにする。
                const anchors = Array.from(wrapper.getElementsByTagName("a"));
                const nextPin = anchors.find(a => this.$store.state.histories.findIndex((h: string) => h === a.href) < 0);
                
                if (nextPin) {
                    clearInterval(this.$data.intervalId);
                    this.$data.intervalId = 0;

                    nextPin.click();
                    return;
                }
            }

            //TODO: 一覧を表示して終了させる
            console.log("次のピンが見つからない");

        }, this.$data.limit);
    },

    startDrawing(isFirst: boolean) {

      if (isFirst) {
        this.$store.commit("clearHistories");
      }

      clearTimeout(this.$store.getters.timeoutId);
      clearInterval(this.$data.intervalId);

      this.$data.limit = 6000; //TODO: 設定から取得
      this.$data.beginTime = Date.now();

      this.$store.commit("beginDrawing", this.startTimer());
      this.$data.intervalId = setInterval(() => { this.$data.currentTime = Date.now(); }, 500);
    },

    stopDrawing() {
      clearTimeout(this.$store.state.timeoutId);
      this.$store.commit("endDrawing");

      clearInterval(this.intervalId);
      this.$data.intervalId = 0;

      this.$data.beginTime = 0;
      this.$data.currentTime = 0;
    }
  },

  created() {
    // 実行中（前のピンからの遷移）の場合
    if (this.$store.getters.isDrawing) {
        this.startDrawing(false);
    }
  },

  destroyed() {
    clearInterval();
  }
})
</script>