<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <h1>List of Dogs Breeds</h1>
        <ul class="nav">
          <li class="nav-item">
            <label>
              filter:
              <select id="breedsList" @change="onChange($event)">
                <option value="">Choose dog breed</option>
                <option
                  v-for="(value, key) in breeds"
                  :key="key + '-filter-' + value.name"
                  :value="value.name"
                >
                  {{ value.name | capitalize }}
                </option>
              </select>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <ul class="breeds-list">
          <li v-if="isFiltered" key="filteredBreed" class="breed">
            <h3 class="title">{{ filteredBreeds.name | capitalize }}</h3>
            <div class="img-wrapper">
              <img
                :src="filteredBreeds.imgSrc"
                :alt="filteredBreeds.name"
                class="img"
              />
            </div>
          </li>

          <li
            v-else
            v-for="(value, key) in breeds"
            :key="key + '-breed-' + value.name"
            class="breed"
          >
            <h3 class="title">{{ value.name | capitalize }}</h3>
            <div class="img-wrapper">
              <img :src="value.imgSrc" :alt="value.name" class="img" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },

  data: () => ({
    filteredBreeds: {},
  }),

  computed: {
    ...mapState({
      breeds: (state) => {
        return state.breeds.listOfBreeds
      },
    }),

    ...mapGetters({
      getBreedByName: 'breeds/getBreedByName',
    }),

    isFiltered() {
      return !!Object.keys(this.filteredBreeds).length
    },
  },

  created() {
    this.$store.dispatch('breeds/getBreeds')
  },

  methods: {
    onChange(event) {
      if (!event.target.value) {
        this.$set(this, 'filteredBreeds', {})
        return
      }

      this.$set(
        this,
        'filteredBreeds',
        ...this.getBreedByName(event.target.value)
      )
    },
  },
}
</script>
<style>
html,
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  max-width: 1140px;
  min-height: 100vh;
  text-align: center;
  padding: 8px;
}

.row {
  margin: 0 -8px;
}

.row:not(:last-of-type) {
  margin-bottom: 24px;
}

.column {
  padding: 0 8px;
}

.nav {
  text-align: right;
  padding: 0 8px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.breeds-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.breed {
  margin: 8px;
  padding: 8px;
  flex: 1 1 calc(33% - 16px);
  max-width: calc(33% - 16px);
  text-align: center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.breed:hover {
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
}

.img-wrapper {
  max-height: 242px;
  overflow: hidden;
  flex: 1;
}

.img {
  max-width: 100%;
  max-height: inherit;
  height: auto;
  transition: all linear 0.3s;
}

.breed:hover .img-wrapper .img {
  max-height: 250px;
}

.breed .title {
  margin: 0 0 16px 0;
  font-weight: normal;
}

@media (max-width: 767px) {
  .breed {
    flex: 1 1 calc(50% - 16px);
    max-width: calc(50% - 16px);
  }
}
</style>
