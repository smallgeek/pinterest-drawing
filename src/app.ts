import Vue from "vue";
import App from "./App.vue";

const observer = new MutationObserver(applyFunctionView);
console.log("pin");

/**
 * ページに機能ビューを適用する
 */
async function applyFunctionView() {
    const bar = document.querySelector("[data-test-id='closeup-action-items']");
    if (!bar) {
        return;
    }

    // すでに挿入されている場合は処理しない
    const view = bar.querySelector("[id='drawing-app']");
    if (view) {
        return;
    }

    observer.disconnect();
    console.log("mount");

    // 機能ビューを追加
    bar.insertAdjacentHTML(
        "afterbegin",
        `<div id="drawing-app"></div>`
    );

    new Vue({
    render: h => h(App),
    }).$mount("#drawing-app");
}

observer.observe(document.body, {childList: true, subtree: true});