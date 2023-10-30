import { createLocalVue, mount } from '@vue/test-utils';
import MortgageCalculator from '@/pages/index.vue';

describe('MortgageCalculator Integration Test', () => {
  it('calculates the mortgage correctly', () => {
    const localVue = createLocalVue();
    const wrapper = mount(MortgageCalculator, { localVue });

    wrapper.setData({
      income: 5000,
      partnerIncome: 3000,
      studyDebt: 10000,
      postcode: '6822',
      mortgageTerm: 10,
    });

    wrapper.vm.calculateMortgage();

    // this should be the expected values
    const expectedMaxMortgageAmount = 31500;
    const expectedMonthlyPayment = 311.49;
    const expectedTotalPayment = 37378.86;

    // check if the results match the expected values
    expect(Math.round(wrapper.vm.maxMortgageAmount * 100) / 100).toBe(expectedMaxMortgageAmount);
    expect(Math.round(wrapper.vm.monthlyPayment * 100) / 100).toBe(expectedMonthlyPayment);
    expect(Math.round(wrapper.vm.totalPayment * 100) / 100).toBe(expectedTotalPayment);
  });
});
