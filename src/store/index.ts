import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions';
import { Pin } from '../models/Pin';
import { Period } from '../models/Period';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeoutId: 0,
    histories: [] as Pin[],
    interval: 60,
    count: 10,
    pattern: '',
    period: 'set' as Period
  },
  getters: {
    isDrawing: state => !!state.timeoutId,
    continuable: (state, getters) => getters.maxCount <= 0 || state.histories.length < getters.maxCount,

    currentInterval: state => {
      if (state.pattern) {
        const fields = state.pattern.split(',');

        if (state.histories.length < fields.length) {
          return parseInt(fields[state.histories.length]) * 1000;
        }
        return parseInt(fields[fields.length - 1]) * 1000;
      }

      return state.interval * 1000;
    },

    maxCount: state => {
      if (state.pattern) {
        return state.pattern.split(',').length;
      }
      return state.count;
    }
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
    },
    savePattern(state, pattern: string) {
      state.pattern = pattern;
    },
    savePeriod(state, period: Period) {
      state.period = period;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    VuexWebExtensions({
      persistentStates: ['timeoutId', 'histories', 'interval', 'count', 'pattern', 'period'],
      loggerLevel: 'verbose'
    }),
  ],
})
