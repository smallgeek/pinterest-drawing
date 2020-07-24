<template>
  <button v-text="buttonText" v-on:click="changeMode" />
</template>

<script lang="ts">
import { browser } from 'webextension-polyfill-ts';
import Vue from 'vue';

export default Vue.extend({
  name: "Navigation",
  data() {
    return {
      buttonText: "***"
    }
  },
  methods: {
    async changeMode(event: Event) {
      const d = (await browser.storage.local.get("drawingData")).drawingData;
      
        // 実行中でなければ
        if (!d.timeoutId) {
            // 自動遷移を初期化する
            d.histories = [];
            d.timeoutId = this.startTimer(d);
            this.$data.buttonText = "停止";
        } else {
            clearTimeout(d.timeoutId);
            d.timeoutId = 0;
            this.$data.buttonText = "開始";

            //TODO: ピンの一覧を表示する
        }

        await browser.storage.local.set({ drawingData: d });
    },

    startTimer(data: any) {
        return setTimeout(async () => {
            // ピンを履歴に保存する
            data.histories.push(document.location.href.replace("https://pinterest.jp/", ""));

            // 次のピンを取得
            //TODO: ボタンを押してから表示したピンは除く
            const wrappers = document.querySelectorAll("[data-test-id='pinWrapper']");

            for (const wrapper of Array.from(wrappers)) {
                // 履歴に無いものを次のピンにする。
                const anchors = Array.from(wrapper.getElementsByTagName("a"));
                const nextPin = anchors.find(a => data.histories.findIndex((h: string) => h === a.href) < 0);
                
                if (nextPin) {
                    await browser.storage.local.set({ drawingData: data });
                    document.location.href = nextPin.href;
                    return;
                }
            }

            //TODO: 一覧を表示して終了させる
            console.log("次のピンが見つからない");

        }, 6000);
    }
  },

  async created() {
    const d = (await browser.storage.local.get("drawingData")).drawingData ?? {};

    // 実行中（前のピンからの遷移）の場合
    if (d.timeoutId) {
        d.timeoutId = this.startTimer(d);
        this.$data.buttonText= "停止";
    } else {
        this.$data.buttonText= "開始";
    }

    await browser.storage.local.set({ drawingData: d });
  }
})
</script>