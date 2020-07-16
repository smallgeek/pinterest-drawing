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

    const data = (await browser.storage.local.get("drawingData")).drawingData;

    // 実行中（前のピンからの遷移）の場合
    if (data.timeoutId) {
        data.timeoutId = startTimer(data);
        button.innerText = "停止";
        await browser.storage.local.set({ drawingData: data });
    } else {
        button.innerText = "開始";
    }

    button.onclick = async e => {
        // 実行中でなければ
        if (!data.timeoutId) {
            // 自動遷移を初期化する
            data.histories = [];
            data.timeoutId = startTimer(data);
            button.innerText = "停止";
        } else {
            clearTimeout(data.timeoutId);
            data.timeoutId = 0;
            button.innerText = "開始";

            //TODO: ピンの一覧を表示する
        }

        await browser.storage.local.set({ drawingData: data });
    };
}

/**
 * タイマーを開始する
 */
function startTimer(data: any) {
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

const observer = new MutationObserver(applyFunctionView);
observer.observe(document.body, {childList: true, subtree: true});