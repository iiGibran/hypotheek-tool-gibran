import { mount } from '@vue/test-utils'
import HypotheekTool from '@/pages/index.vue'

describe('HypotheekTool', () => {
  it('renders the component', () => {
    const wrapper = mount(HypotheekTool)
    expect(wrapper.exists()).toBe(true)
  })

  it('calculates mortgage correctly', async () => {
    const wrapper = mount(HypotheekTool)

    // Simulate user input with allowed postcode
    await wrapper.setData({
      income: 5000,
      partnerIncome: 3000,
      studyDebt: 10000,
      postcode: "12345",
      mortgageTerm: 10,
    })

    // submit
    await wrapper.find('form').trigger('submit')

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Maximale Hypotheek Bedrag: €')
    expect(wrapper.text()).toContain('Maandelijkse Betaling: €')
    expect(wrapper.text()).toContain('Totaal Betaling over 10 Jaar: €')
  })

  it('disallows mortgages in specific postcodes', async () => {
    const wrapper = mount(HypotheekTool)

    // simulate user input with a banned postcode
    await wrapper.setData({
      income: 5000,
      partnerIncome: 3000,
      studyDebt: 10000,
      postcode: "9679",
      mortgageTerm: 10,
    })

    // submit
    await wrapper.find('form').trigger('submit')

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("Mortgages in this area are not accepted.")
  })
})
