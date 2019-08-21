import Vue from 'vue';
import Vuex from 'vuex';

const files = require.context('./modules', false, /\.ts$/);

const modules  = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
})


Vue.use(Vuex);

export default new Vuex.Store({
  modules,
})