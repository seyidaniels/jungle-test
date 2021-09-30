<template>
  <v-app>
    <v-main class='main'>
      <v-row justify='center'>
        <v-col md="7">
            <date-display-component @update:dateChanged="fetchDataFromApi"></date-display-component>
        </v-col>
      </v-row>

      <v-row class='mt-100'> 
          <month-component v-for="(month, index) in monthsData" :month='month' :key='index'></month-component>
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
import {getMonthlyData} from '/utils/energyAggregator'
export default {
  name: 'App',
  components: {
    DateDisplayComponent,
    MonthComponent
  },
  data: () => ({
    loading: false,
    monthsData: []
  }),
  computed: {
    baseURL () {
      return 'https://interview-availability-api.herokuapp.com/availability-data?'
    },
    monthsHasData() {
      return Object.values(this.monthsData) > 0 
    }
  },
  methods: {
    async fetchDataFromApi(startDate, endDate) {
        this.loading = true
        const url = this.getActualUrl(startDate, endDate)
        try {
          const response = await axios.get(url) 
          const monthlyData = getMonthlyData(response.data)
            this.monthsData = {...monthlyData}
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

h1 {
  text-align: center;
  color: white;
}
</style>
