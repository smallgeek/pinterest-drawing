import Vue from "vue";
import Popup from "./Popup.vue";
import store from '../store';
import PDButton from '../components/PDButton.vue';

Vue.component("pdbutton", PDButton);

new Vue({
    store,
    render: h => h(Popup),
}).$mount("#app");