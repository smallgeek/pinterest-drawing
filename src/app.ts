import Vue from "vue";
import App from "./App.vue";
import store from './store'
import PDButton from './components/PDButton.vue';
import vmodal from 'vue-js-modal'
console.log("pin");

Vue.component("pdbutton", PDButton);

Vue.use(vmodal)

let oldHref = document.location.href;

/**
 * ページに機能ビューを適用する
 */
async function applyFunctionView() {

    // ピン以外のページに移動した場合は遷移を停止
    if (oldHref !== document.location.href) {
        if (store.getters.isDrawing && !document.location.href.replace("https://www.pinterest.jp/", "").startsWith("pin/")) {
            clearTimeout(store.state.timeoutId);
            store.commit("endDrawing");

            console.log("end drawing");
        }
        oldHref = document.location.href;
    }

    const bar = document.querySelector("[data-test-id='visual-content-container']");
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