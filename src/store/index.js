import { createStore } from 'vuex'

export default createStore({
  state: {
    score:0,
    userName:''
  },
  getters: {
  },
  mutations: {
    setScore(state,value){
      state.score = value
    },
    setUserName(state,value){
      state.userName = value
    }
  },
  actions: {
  },
  modules: {
  }
})
