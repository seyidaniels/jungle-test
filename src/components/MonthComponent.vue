<template>
<v-col
        cols="12"
        sm="3"
        
      >
        <v-card
          class="pa-2 rounded-lg month"
          outlined
          tile
        >
            <p class="month__title"> {{month.name}} </p>
          <p>Energy Produced: <span class="month__sub__value"> {{month.energyProduced}} </span> MWh</p>
          <p>Energy Lost: <span class="month__sub__value"> {{month.energyLost}} </span> MWh</p>
          <p>Availability: <span :class="month.availability > 97 ? 'text-green': 'text-red'"> {{availabilityToTwoDP}} </span>%</p>
          <p>Worst Turbine: <span class="month__sub__value"> {{month.worstTurbine}} </span></p>
        </v-card>
      </v-col>
</template>
<script>
export default {
    props: {
        month: {
            required: true,
            type: Object
            //TODO Validate Object Keys
        }
    },
    computed: {
        availabilityToTwoDP() {
            return this.month.availability.toFixed(2)
        }
    }
}
</script>

<style lang="scss" scoped>
.month {
    background:#363D4D !important;
    &__title {
        text-align: center;
        color: #fff;
    }
    &__sub__value {
        color: white;
    }
}

.text-green {
    color: green;
}

.text-red {
    color: red;
}
</style>

