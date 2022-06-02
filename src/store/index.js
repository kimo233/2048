import { createStore } from 'vuex'

export default createStore({
  state: {
    score:0,
    userName:'',
    avatar:''
  },
  getters: {
  },
  mutations: {
    setScore(state,value){
      state.score = value
    },
    setUserName(state,value){
      state.userName = value
    },
    setAvatar(state, value){
      state.avatar = value
    }
  },
  actions: {
  },
  modules: {
  }
})
