import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import schoolwithbatteryissues from '../src/components/SchoolWithBatteryIssues.vue'

describe('Battery Usage Reports', () => {
  // Now mount the component and you have the wrapper
  const wrapper = shallowMount(schoolwithbatteryissues)

  it('Check valid component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct markup', () => {
    expect(wrapper.find('h4').text()).toContain('No. of Devices with battery issues')
  })

  // it's also easy to check for the existence of elements
  it('has a select element', () => {
    expect(wrapper.find('select').exists()).toBe(true)
  })

  // it check to have a child component called bar chart
  it('has a child component called bar chart', () => {
    expect(wrapper.find('bar-chart')).toBeTruthy()
  })

  // bar chart is intialized
  it('has a select element', () => {
    expect(wrapper.find('canvas').exists()).toBe(false)
  })
  
})