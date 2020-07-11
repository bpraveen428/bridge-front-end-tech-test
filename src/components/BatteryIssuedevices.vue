<template>
  <div class="small text-center">
    <h4>School device's battery usage report</h4>
    <div class="form-group">
      <label>Select School</label>
      <select class="form-control schools-dropdown" v-model="selectedSchool" @change="onChange($event)">
        <option value="" disabled selected>Select your option</option>
        <option v-for="(item, index) in schoolsList" :value="index">School - {{index}}</option>
      </select>
    </div>
    <bar-chart :chart-data="datacollection" :options="chartOptions" v-if="selectedSchool"></bar-chart>
    <div v-else>Please select school to view the Device's battery usage report</div>
    <div></div>
  </div>
</template>

<script>
  import BarChart from '../assets/BarChart.js'
  import batteryData from '../../data/battery-data.json'
  import _ from 'lodash'

  export default {
    name: 'batteryissuedevices',
    components: {
      'bar-chart': BarChart
    },
    data () {
      return {
        datacollection: null,
        selectedSchool: '',
        schoolData: null,
        schoolsList: null,
        batteryUsage: batteryData,
        mostAffectedSchoolsDataset: [],
        mostAffectedSchoolsLabel: [],
        chartOptions: {
          legend: {
            position: 'top'
          },
          scales: {
            xAxes: [{
                scaleLabel: {
                  display: false,
                  labelString: 'Devices'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Battery usage(%) per day'
                },
                  ticks: {
                      suggestedMax: 100,
                      min: 0,
                      stepSize: 2
                  }
              }]
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return 'Battery usage per day: '+tooltipItem.yLabel+ ' (%)';
                }
            }
          }
        }
      }
    },
    mounted () {
      this.initData();
    },
    methods: {
      initData() {
        /* To get the localdata for offline usage if it is stored already*/
        this.schoolsList = _.groupBy(this.batteryUsage, 'academyId');
        if (localStorage.getItem('batteryUsage')) {
          try {
            this.batteryUsage = localStorage.getItem('batteryUsage');
          } catch(e) {
            localStorage.removeItem('batteryUsage');
          }
        }
      },
      onChange(event) {
        /* Modify the data which will be used by Bar chart */
        this.schoolData = _.filter(this.batteryUsage, function(o) { return o.academyId == event.target.value; });
        let labels = [];
        let dataSet = [];
        _.each(this.schoolData, function(o) { 
          labels.push(o.serialNumber);
          dataSet.push(o.avgDailyDischarge*100);
          });
        this.datacollection = {
          labels: labels,
          datasets: [{
            label: 'Devices',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            minBarLength: 2,
            data: dataSet
          }]
        }
      }
    }
  }
</script>

<style>
  .small {
    padding: 20px;
  }
  .schools-dropdown {
    display: inline;
    width: 50%;
  }
</style>