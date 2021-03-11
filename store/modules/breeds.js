import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({
    api: 'https://dog.ceo/api',
    listOfBreeds: [],
  }),

  mutations: {
    setBreeds(state, breed) {
      state.listOfBreeds.push(breed)
    },
  },

  actions: {
    getBreeds({ state, commit }) {
      return axios.get(`${state.api}/breeds/list/all`).then((res) => {
        for (const breed in res.data.message) {
          axios
            .get(`${state.api}/breed/${breed}/images/random/1`)
            .then((res) => {
              const resObj = { name: breed, imgSrc: res.data.message[0] }
              commit('setBreeds', resObj)
            })
        }
      })
    },
  },

  getters: {
    getBreedByName: (state) => (name) => {
      return state.listOfBreeds.filter((breed) => {
        return breed.name === name
      })
    },
  },
}
