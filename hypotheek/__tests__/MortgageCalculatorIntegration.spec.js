import { mount } from "@vue/test-utils";
import MortgageCalculator from "@/pages/index.vue"; // Adjust the import path

describe("MortgageCalculator Integration Test", () => {
  it("calculates mortgage payment when the user submits the form", async () => {
    const wrapper = mount(MortgageCalculator);

    // Find the input fields and set values
    const loanAmountInput = wrapper.find("#loanAmount");
    const interestRateInput = wrapper.find("#interestRate");
    const loanTermInput = wrapper.find("#loanTerm");

    await loanAmountInput.setValue("250000");
    await interestRateInput.setValue("3.5");
    await loanTermInput.setValue("30");

    // Trigger the form submission
    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    // the mortgage result is displayed
    const mortgageResult = wrapper.find(".text-gray-800").text();
    expect(mortgageResult).toContain("Your monthly payment:");
  });
});
