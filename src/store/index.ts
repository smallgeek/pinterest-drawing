import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions';
import { Pin } from '../models/Pin';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeoutId: 0,
    histories: [] as Pin[],
    interval: 60000,
    count: 10
  },
  getters: {
    isDrawing: state => !!state.timeoutId,
    continuable: state => state.count <= 0 || state.histories.length < state.count
  },
  mutations: {
    beginDrawing(state, id) {
      state.timeoutId = id;
    },
    endDrawing(state) {
      state.timeoutId = 0;
    },
    addHistory(state, pin: Pin) {
      state.histories.push(pin);
    },
    clearHistories(state) {
      state.histories = [];
    },
    saveInterval(state, interval: number) {
      state.interval = interval;
    },
    saveCount(state, count: number) {
      state.count = count;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    VuexWebExtensions({
      persistentStates: ['timeoutId', 'histories', 'interval', 'count'],
      loggerLevel: 'verbose'
    }),
  ],
})
