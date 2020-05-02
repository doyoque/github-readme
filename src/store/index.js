import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    repoReadme: '',
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
    GET_README(state, readme) {
      state.repoReadme = readme
      state.isLoading = false
    },
    INIT_STATE(state) {
      state.repos = []
      state.repoReadme = ''
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
    getAllRepos({commit}, repos) {
      commit('GET_REPOS', repos)
    },
    detailRepo({commit}, readme) {
      commit('GET_README', readme)
    },
    initState({commit}) {
      commit('INIT_STATE')
    },
    isLoaded({commit}, status) {
      commit('ISLOADED', status)
    },
  },
})
