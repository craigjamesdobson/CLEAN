import Vue from "vue";
import Vuex from "vuex";
import { SET_DATE, GET_CHORES, SET_CHORES } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeDate: "",
    chores: [],
    dates: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },

  mutations: {
    [SET_DATE](state, date) {
      state.activeDate = date;
    },

    [GET_CHORES](state, data) {
      state.chores = data;
    },

    [SET_CHORES](state, data) {
      state.chores = data;
    }
  },

  actions: {
    updateDate({ commit }, date) {
      commit("SET_DATE", date);
    },

    getChores({ commit }) {
      const choresData = JSON.parse(localStorage.getItem("chores"));
      if (choresData !== null) {
        commit("GET_CHORES", choresData);
      }
    },

    setChores({ commit }, data) {
      const chores = JSON.stringify(data);
      localStorage.setItem("chores", chores);
      commit("SET_CHORES", data);
    }
  },

  getters: {
    activeDayChores: state => {
      return state.chores.filter(c => c.date == state.activeDate);
    }
  },

  modules: {}
});
