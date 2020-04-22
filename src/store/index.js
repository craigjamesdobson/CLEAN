import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import { SET_DATE } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeDate: "",
    chores: [
      {
        _id: uuidv4(),
        task: "Clean Living Room",
        room: "Living Room",
        month: 3,
        date: "21/4/2020",
        dateCreated: new Date(),
        isCompleted: false,
        isEditing: false
      },
      {
        _id: uuidv4(),
        task: "Clean Living Room 2",
        room: "Living Room",
        month: 3,
        date: "21/4/2020",
        dateCreated: new Date(),
        isCompleted: true,
        isEditing: false
      },
      {
        _id: uuidv4(),
        task: "Clean Living Room 3",
        room: "Living Room",
        month: 3,
        date: "21/4/2020",
        dateCreated: new Date(),
        isCompleted: false,
        isEditing: false
      },
      {
        _id: uuidv4(),
        task: "Clean Living Room 4",
        room: "Living Room",
        month: 3,
        date: "19/4/2020",
        dateCreated: new Date(),
        isCompleted: false,
        isEditing: false
      }
    ]
  },

  mutations: {
    [SET_DATE](state, date) {
      state.activeDate = date;
    }
  },

  actions: {
    updateDate({ commit }, date) {
      commit("SET_DATE", date);
    }
  },

  getters: {
    activeDayChores: state => {
      return state.chores.filter(c => c.date == state.activeDate);
    }
  },

  modules: {}
});
