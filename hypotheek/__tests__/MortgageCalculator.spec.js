import { shallowMount } from "@vue/test-utils";
import MortgageCalculator from "@/pages/index.vue";

describe("MortgageCalculator.vue", () => {
  it("calculates mortgage payment correctly", () => {
    const wrapper = shallowMount(MortgageCalculator);
    
    // Set values for loanAmount, interestRate, and loanTerm
    wrapper.setData({
      loanAmount: 250000,
      interestRate: 3.5,
      loanTerm: 30,
    });

    wrapper.vm.calculateMortgage();

    expect(wrapper.vm.mortgageResult).toEqual("1122.61");
  });

  it("handles invalid input gracefully", () => {
    const wrapper = shallowMount(MortgageCalculator);
    
    wrapper.setData({
      loanAmount: "invalid",
      interestRate: "invalid",
      loanTerm: "invalid",
    });

    // Call the calculateMortgage method
    wrapper.vm.calculateMortgage();

    expect(wrapper.vm.mortgageResult).toBeNull();
  });
});
