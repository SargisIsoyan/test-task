import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    userData: null,
    projects: []
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
    getProjects(state) {
      return state.projects
    }
  },
  actions: {
    authLogin({ commit }, authData) {
      return new Promise((resolve, reject) => {
        this.$axios.$post('https://api.quwi.com/v2/auth/login', authData).then(resp => {
          localStorage.setItem('userInfo', JSON.stringify(resp))
          commit('SET_USER_DATA', resp)
          resolve('ok')
        }).catch(err => {
          reject(err.response)
        })
      })
    },
    getProjects({ commit }) {
      this.$axios.$get('https://api.quwi.com/v2/projects', {headers: {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`}}).then(resp => {
        commit('SET_PROJECTS', resp.projects)
      }).catch(err => {
        console.error(err.response)
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('userInfo')
        commit('SET_USER_DATA', null)
        resolve('ok')
      })
    }
  },
  mutations: {
    SET_USER_DATA (state, payload) {
      state.userData = payload
    },
    SET_PROJECTS (state, payload) {
      state.projects = payload
    }
  }
})

export default store
