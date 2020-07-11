<template>
  <div class="small text-center">
    <h4>No. of Devices with battery issues</h4>
    <div class="form-group">
      <label>Select Battery Usage(%)</label>
      <select class="form-control usage-dropdown" v-model="selectedBatteryUsage" @change="SchoolsWithMoreIssues()">
        <option value="hign" selected="selected">e-ink devices battery usage(> 30%) per day</option>
        <option value="medium">Average battery usage(20 to 30%) per day</option>
        <option value="both">Affected devices battery usage(> 20%) per day</option>
      </select>
    </div>
    <bar-chart :chart-data="datacollection" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
  import BarChart from '../assets/BarChart.js'
  import batteryData from '../../data/battery-data.json'
  import _ from 'lodash'

  export default {
    name: 'schoolwithbatteryissues',
    components: {
      'bar-chart': BarChart
    },
    data () {
      return {
        datacollection: null,
        batteryUsage: batteryData,
        selectedBatteryUsage: 'hign',
        chartOptions: {
          legend: {
            position: 'top'
          },
          scales: {
            xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Schools'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'No of affected Devices'
                },
                  ticks: {
                      suggestedMax: 9,
                      min: 0,
                      stepSize: 0.5
                  }
              }]
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return 'No. of battery issue devices: '+tooltipItem.yLabel;
                }
            }
          }
        }
      }
    },
    mounted () {
      this.SchoolsWithMoreIssues();
      this.initData();
    },
    methods: {
      initData () {
        /* To get the localdata for offline usage if it is stored already*/
        if (localStorage.getItem('batteryUsage')) {
          try {
            this.batteryUsage = localStorage.getItem('batteryUsage');
          } catch(e) {
            localStorage.removeItem('batteryUsage');
          }
        }
      },
      SchoolsWithMoreIssues(){
        /* Modify the data which will be used by Bar chart */
        let that = this;
        let heavyBatteryUsageSchools = [];
        let groupedSchools = [];
        let mostAffectedSchoolsLabel = [];
        let mostAffectedSchoolsDataset = [];
        let dynamicLabel = 'Schools with No. of devices which are having battery usage ';

        switch(this.selectedBatteryUsage) {
          case 'medium':
            heavyBatteryUsageSchools = _.filter(this.batteryUsage, function(usage) {
              return ((usage.avgDailyDischarge * 100 < 31) && (usage.avgDailyDischarge * 100 > 19));
            });
            dynamicLabel  = dynamicLabel + '(20 to 30% per Day)';
            break;
          case 'both':
            heavyBatteryUsageSchools = _.filter(this.batteryUsage, function(usage) {
              return (usage.avgDailyDischarge * 100 > 19);
            });
            dynamicLabel  = dynamicLabel + '(>=20% per Day)';
            break;
          default:
            heavyBatteryUsageSchools = _.filter(this.batteryUsage, function(usage) {
              return (usage.avgDailyDischarge * 100 > 30);
            });
            dynamicLabel  = dynamicLabel + '(>30% per Day)';

        }
        groupedSchools = _.groupBy(heavyBatteryUsageSchools, 'academyId');
        _.each(groupedSchools, function(value, key){
          mostAffectedSchoolsLabel.push(key);
          mostAffectedSchoolsDataset.push(_.size(value));
        });
        that.datacollection = {
          labels: mostAffectedSchoolsLabel,
          datasets: [{
            label: dynamicLabel,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            minBarLength: 2,
            data: mostAffectedSchoolsDataset
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
  .mr-bt-40 {
    margin-bottom: 40px;
  }
  .usage-dropdown {
    display: inline;
    width: 60%;
  }
</style>