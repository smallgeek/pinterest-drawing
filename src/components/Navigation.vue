<template>
  <div class="navigation-container">
    <pdbutton v-on:click="changeMode" :caption="buttonText" :isActive="true" />
    <pdtime :ms="leftTime" />
  </div>
</template>

<style>
  .navigation-container {
    display: flex;
    flex-direction: row;
    padding-top:20px;
    padding-bottom:16px;
    padding-left:20px;
    padding-right:20px;
    border-radius:0px 32px 32px 0;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import PDTime from './PDTime.vue';
import PDList from './PDList.vue';
import store from '../store';
import { Pin } from '../models/Pin';

export default Vue.extend({
  name: "Navigation",
  components: {
    "pdtime": PDTime,
    "pdlist": PDList
  },
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

      return left;
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
          this.saveHistory();
          this.showHistories();
      }
    },

    startTimer() {
        return setTimeout(() => {
            this.saveHistory();

            if (this.$store.getters.continuable) {
              // 次のピンを取得
              const wrappers = document.querySelectorAll("[data-test-id='pinWrapper']");

              for (const wrapper of Array.from(wrappers)) {
                  // 履歴に無いものを次のピンにする。
                  const anchors = Array.from(wrapper.children[0].getElementsByTagName("a"));
                  const nextPin = anchors.find(a => {
                      // 動画は除外
                      const video = a.querySelector("[data-test-id='pinrep-video']");
                      if (video)
                        return false;

                      return this.$store.state.histories.findIndex((h: Pin) => h.url === a.href) < 0;
                  });
                  
                  if (nextPin) {
                      clearInterval(this.$data.intervalId);
                      this.$data.intervalId = 0;

                      nextPin.click();

                      // Pinterest 側のキャッシュ仕様が変わったらしく created / mounted では開始できないためここでやる
                      new Promise(resolve => this.startDrawing(false));

                      return;
                  }
              }
              console.log("次のピンが見つからない");
            }

            this.stopDrawing();
            this.showHistories();

        }, this.$data.limit + 2000);
    },

    startDrawing(isFirst: boolean) {

      if (isFirst) {
        this.$store.commit("clearHistories");
      }

      clearTimeout(this.$store.getters.timeoutId);
      clearInterval(this.$data.intervalId);

      this.$data.limit = this.$store.getters.currentInterval;
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
    },

    saveHistory() {
      // 画像ファイル名を取得
      const container = document.querySelector("[data-test-id='closeup-body-image-container']");
      if (!container)
        return;

      const img = container.getElementsByTagName("img")[0];
      const pin = new Pin(document.location.href, img.src);

      // ピンを履歴に保存する
      this.$store.commit("addHistory", pin);
    },

    showHistories() {
      if (this.$store.state.histories.length !== 0)
        this.$modal.show(PDList, {
            text: ''
          },{
            width: '80%',
            height: '80%',
            styles: 'border-radius: 32px;'
        });
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