import Vue from 'vue'
import Vuex from 'vuex'
import GithubService from '@/services/GithubService.js'

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
      GithubService.getRepos(username)
        .then(res => { commit('GET_REPOS', res.data) })
        .catch(err => { commit('ERROR', err.data) })
    },
    getRepo({commit}, repo) {
      let full_name = repo.username+'/'+repo.readme
      GithubService.getReadme(full_name)
        .then(res => {
          if (res.data.content == '') {
            res.data.content = 'README is empty'
          }

          let getRepo = {
            username: repo.username, 
            readme: res.data.content
          }

          commit('DETAIL_REPOS', getRepo)
        })
        .catch(err => { commit('ERROR', err.response.data.message) })
    },
    initState({commit}) {
      commit('INIT_STATE')
    },
    isLoaded({commit}, status) {
      commit('ISLOADED', status)
    },
  },
  getters: {
    getTheRepo(state) {
      return state.repo
    },
  }
})
