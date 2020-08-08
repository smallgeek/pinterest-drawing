import Vue from "vue";
import Popup from "./Popup.vue";
import store from '../store';

new Vue({
    store,
    render: h => h(Popup),
}).$mount("#app");