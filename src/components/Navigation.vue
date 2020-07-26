<template>
  <div>
    <button v-text="buttonText" v-on:click="changeMode" />
    <span>{{ leftTime }}</span>
  </div>
</template>

<script lang="ts">
import { browser } from 'webextension-polyfill-ts';
import Vue from 'vue';

export default Vue.extend({
  name: "Navigation",
  data() {
    return {
      buttonText: "***", //TODO: drawingData.timeoutId の値で自動で切り替えるようにする
      limit: 0,
      beginTime: new Date(0),
      currentTime: new Date(0)
    }
  },
  computed: {
    leftTime() {
      const left = this.$data.limit - (this.$data.currentTime - this.$data.beginTime);
      return Math.max(0, left);
    }
  },
  methods: {
    async changeMode(event: Event) {
      const d = (await browser.storage.local.get("drawingData")).drawingData;
      
      // 実行中でなければ
      if (!d.timeoutId) {
          await this.startDrawingAsync(true);
          this.$data.buttonText = "停止";
      } else {
          await this.stopDrawingAsync();
          this.$data.buttonText = "開始";

          //TODO: ピンの一覧を表示する
      }
    },

    startTimer() {
        return setTimeout(async () => {
            const d = (await browser.storage.local.get("drawingData")).drawingData ?? {};

            // ピンを履歴に保存する
            d.histories.push(document.location.href.replace("https://pinterest.jp/", ""));

            // 次のピンを取得
            //TODO: ボタンを押してから表示したピンは除く
            const wrappers = document.querySelectorAll("[data-test-id='pinWrapper']");

            for (const wrapper of Array.from(wrappers)) {
                // 履歴に無いものを次のピンにする。
                const anchors = Array.from(wrapper.getElementsByTagName("a"));
                const nextPin = anchors.find(a => d.histories.findIndex((h: string) => h === a.href) < 0);
                
                if (nextPin) {
                    clearInterval(d.intervalId);
                    d.intervalId = 0;

                    await browser.storage.local.set({ drawingData: d });
                    document.location.href = nextPin.href;
                    return;
                }
            }

            //TODO: 一覧を表示して終了させる
            console.log("次のピンが見つからない");

        }, this.$data.limit);
    },

    async startDrawingAsync(isFirst: boolean) {
      const d = (await browser.storage.local.get("drawingData")).drawingData ?? {};

      if (isFirst) {
        d.histories = [];
      }

      clearTimeout(d.timeoutId);
      clearInterval(d.intervalId);

      this.$data.limit = 6000; //TODO: 設定から取得
      this.$data.beginTime = Date.now();

      d.timeoutId = this.startTimer();
      d.intervalId = setInterval(() => { this.$data.currentTime = Date.now(); }, 500);

      await browser.storage.local.set({ drawingData: d });
    },

    async stopDrawingAsync() {
      const d = (await browser.storage.local.get("drawingData")).drawingData ?? {};
      clearTimeout(d.timeoutId);
      clearInterval(d.intervalId);
      d.timeoutId = 0;
      d.intervalId = 0;

      await browser.storage.local.set({ drawingData: d });
    }
  },

  async created() {
    const d = (await browser.storage.local.get("drawingData")).drawingData ?? {};

    // 実行中（前のピンからの遷移）の場合
    if (d.timeoutId) {
        await this.startDrawingAsync(false);
        this.$data.buttonText= "停止";
    } else {
        this.$data.buttonText= "開始";
    }
  },

  destroyed() {
    clearInterval();
  }
})
</script>