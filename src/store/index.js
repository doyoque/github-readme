import Vue from 'vue'
import Vuex from 'vuex'
import GITHUB_API from './../api/api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    error: {
      status: false,
      data: {}
    },
  },
  mutations: {
    GET_REPOS(state, items) {
      state.repos = items
    },
    ERROR(state, error) {
      state.error.status = true,
      state.error.data = error
    }
  },
  actions: {
    getAllRepos({commit}, username) {
      axios
        .get(`${GITHUB_API.user}${username}/repos`)
        .then(res => { commit('GET_REPOS', res.data) })
        .catch(err => { commit('ERROR', err.data) })
    }
  }
})
