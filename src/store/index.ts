import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeoutId: 0,
    histories: [] as string[]
  },
  getters: {
    isDrawing: state => !!state.timeoutId
  },
  mutations: {
    beginDrawing(state, id) {
      state.timeoutId = id;
    },
    endDrawing(state) {
      state.timeoutId = 0;
    },
    addHistory(state, pin: string) {
      state.histories.push(pin);
    },
    clearHistories(state) {
      state.histories = [];
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    VuexWebExtensions({
      persistentStates: ['timeoutId', 'histories']
    }),
  ],
})
