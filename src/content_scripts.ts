/**
 * ページに機能ビューを適用する
 */
function applyFunctionView() {
    const bar = document.querySelector("[data-test-id='closeupActionBar']");
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

    const button = document.createElement("input");
    button.type = "button";
    button.innerText = "開始"

    let timeoutId = 0;

    button.onclick = e => {

        if (!timeoutId) {
            timeoutId = window.setTimeout(() => {
                // 次のピンを取得
                //TODO: ボタンを押してから表示したピンは除く
                const wrapper = document.querySelector("[data-test-id='pinWrapper']");
                const nextPin = wrapper?.querySelector("a");

                if (nextPin) {
                    //TODO: ピンを履歴に保存する
                    document.location.href = nextPin.href;
                }

            }, 6000);

            console.log("start");
        } else {
            clearTimeout(timeoutId);
            timeoutId = 0;

            //TODO: ピンの一覧を表示する
        }
    };

    div.appendChild(button);
    bar.appendChild(div);
}

const observer = new MutationObserver(applyFunctionView);
observer.observe(document.body, {childList: true, subtree: true});