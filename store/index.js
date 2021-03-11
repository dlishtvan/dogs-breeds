import Vuex from 'vuex'
import breeds from './modules/breeds'

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      breeds,
    },
  })
}

export default createStore
