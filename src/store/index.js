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
    isLoading: true,
  },
  mutations: {
    GET_REPOS(state, items) {
      state.repos = items
      state.isLoading = false
    },
    INIT_STATE(state) {
      state.repos = []
      state.isLoading = true
    },
    ISLOADED(state, status) {
      state.isLoading = status
    },
    ERROR(state, error) {
      state.error.status = true,
      state.error.data = error
    },
  },
  actions: {
    getAllRepos({commit}, username) {
      axios
        .get(`${GITHUB_API.user}${username}/repos`)
        .then(res => { commit('GET_REPOS', res.data) })
        .catch(err => { commit('ERROR', err.data) })
    },
    initState({commit}) {
      commit('INIT_STATE')
    },
    isLoaded({commit}, status) {
      commit('ISLOADED', status)
    },
  }
})
