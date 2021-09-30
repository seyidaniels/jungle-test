<template>
  <v-app>
    <v-main class='main'>
      <v-row justify='center'>
        <v-col md="7">
            <date-display-component @update:dateChanged="fetchDataFromApi"></date-display-component>
        </v-col>
      </v-row>
      <v-row class='mt-100'>
        <month-component v-for="i in 12" :key=i></month-component>
      </v-row>
      <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
//TODO make v-overlay a loader component that takes in props
import MonthComponent from './components/MonthComponent';
import DateDisplayComponent from './components/DateDisplayComponent'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    DateDisplayComponent,
    MonthComponent
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    baseURL () {
      return 'https://interview-availability-api.herokuapp.com/availability-data?'
    }
  },
  methods: {
    async fetchDataFromApi(startDate, endDate) {
        this.loading = true
        const url = this.getActualUrl(startDate, endDate)
        try {
          const response = await axios.get(url) 
          console.log(response)
        }catch (error) {
          alert(error.message)
        }
        this.loading = false
    },
    getActualUrl(from, to) {
      return `${this.baseURL}from=${from}&to=${to}`
    }

  }
};
</script>
<style scoped>
.main {
  background-color: #24292E;
  padding: 40px 200px !important;
}

.mt-100 {
  margin-top: 100px;
}
</style>
