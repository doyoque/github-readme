import Vue from 'vue'
import Vuex from 'vuex'
import GITHUB_API from './../api/api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repos: [],
    repo: {
      username: '',
      readme: ''
    },
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
      state.repo = []
      state.isLoading = true
    },
    DETAIL_REPOS(state, repo) {
      state.repo.username = repo.username
      state.repo.readme = repo.readme
      state.isLoading = false
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
    getRepo({commit}, repo) {
      let full_name = repo.username+'/'+repo.readme
      axios
        .get(`${GITHUB_API.userReadme}${full_name}/readme`)
        .then(res => {
          let getRepo = { username: repo.username, readme: res.data.content }
          commit('DETAIL_REPOS', getRepo)
        })
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
