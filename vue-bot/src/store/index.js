import Vue from 'vue';
import Vuex from 'vuex';
import robotModule from './modules/robot';
import userModule from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    robots: robotModule,
    users: userModule,
  },
});
