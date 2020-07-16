import { browser } from 'webextension-polyfill-ts';

/**
 * ページに機能ビューを適用する
 */
async function applyFunctionView() {
    const bar = document.querySelector("[data-test-id='closeup-action-items']");
    if (!bar) {
        return;
    }

    // すでに挿入されている場合は処理しない
    const view = bar.querySelector("[id='test-tag']");
    if (view) {
        return;
    }

    // 機能ビューを追加
    const div = document.createElement("div");
    div.id = "test-tag";

    const button = document.createElement("button");
    div.appendChild(button);
    bar.appendChild(div);

    // 現在の実行IDを取得
    let timeoutId = (await browser.storage.local.get("timeoutId")).timeoutId;

    // 実行中（前のピンからの遷移）の場合
    if (timeoutId) {
        timeoutId = startTimer();
        button.innerText = "停止";
        await browser.storage.local.set({ timeoutId: timeoutId });
    } else {
        button.innerText = "開始";
    }

    button.onclick = async e => {
        // 実行中でなければ
        if (!timeoutId) {
            timeoutId = startTimer();
            button.innerText = "停止";
        } else {
            clearTimeout(timeoutId);
            timeoutId = 0;
            button.innerText = "開始";

            //TODO: ピンの一覧を表示する
        }

        await browser.storage.local.set({ timeoutId: timeoutId });
    };
}

/**
 * タイマーを開始する
 */
function startTimer() {
    return setTimeout(() => {
        // 次のピンを取得
        //TODO: ボタンを押してから表示したピンは除く
        const wrapper = document.querySelector("[data-test-id='pinWrapper']");
        const nextPin = wrapper?.querySelector("a");

        if (nextPin) {
            //TODO: ピンを履歴に保存する
            document.location.href = nextPin.href;
        }

    }, 6000);
}

const observer = new MutationObserver(applyFunctionView);
observer.observe(document.body, {childList: true, subtree: true});