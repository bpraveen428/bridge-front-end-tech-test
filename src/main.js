import Vue from 'vue'
import schoolwithbatteryissues from './components/SchoolWithBatteryIssues.vue'
import batteryissuedevices from './components/BatteryIssuedevices.vue'

new Vue({
  el: '#app',
  components: {
  	'school-with-battery-issues': schoolwithbatteryissues,
  	'battery-issue-devices': batteryissuedevices 
  }
})
