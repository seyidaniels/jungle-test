<template>
    <div class="dates">
        <p>Show data between</p>
        <v-row class='mt-6'>
            <v-select
          :items="months"
          label="Start Month"
          v-model="startMonth"
        ></v-select>
        <p>to</p>
         <v-select
          :items="months"
          label="End Month"
            v-model="endMonth"
        ></v-select>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            months: ["January","February","March","April","May","June","July",
            "August","September","October","November","December"],
            startMonth: '',
            endMonth: '',
        }
    }, 
    watch: {
        endMonth(value) {
            if (value && this.startMonth) {
                //Todo make this 0(1) time complexity
                this.$emit('update:dateChanged', this.months.indexOf(this.startMonth), this.months.indexOf(this.endMonth))
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
.dates {
    border: 1px solid grey;
    border-radius: 25px;
    padding: 10px 20px;
    p {
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: white;
    }
}
</style>
