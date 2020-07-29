import Vue from "vue";
import App from "./App.vue";
import store from './store'
import PDButton from './components/PDButton.vue';

console.log("pin");

Vue.component("pdbutton", PDButton);

/**
 * ページに機能ビューを適用する
 */
async function applyFunctionView() {
    const bar = document.querySelector("[data-test-id='closeup-action-items']");
    if (!bar) {
        return;
    }

    const view = bar.querySelector("[id='drawing-container']");
    if (view) {
        return;
    }

    console.log("mount");

    // 機能ビューを追加
    bar.insertAdjacentHTML(
        "afterbegin",
        `<div id="drawing-app"></div>`
    );

    new Vue({
        store,
        render: h => h(App),
    }).$mount("#drawing-app");
}

const observer = new MutationObserver(applyFunctionView);
observer.observe(document.body, {childList: true, subtree: true});