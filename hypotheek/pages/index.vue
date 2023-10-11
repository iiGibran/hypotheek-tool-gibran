<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4 text-blue-950 bg-red-700 p-5">Mortgage Calculator</h1>
    <form @submit.prevent="calculateMortgage">
      <div class="mb-4">
        <label for="loanAmount" class="block text-sm font-medium text-gray-700">Loan Amount</label>
        <input v-model="loanAmount" type="number" id="loanAmount" name="loanAmount" class="mt-1 p-2 border rounded-md">
      </div>
      <div class="mb-4">
        <label for="interestRate" class="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
        <input v-model="interestRate" type="number" id="interestRate" name="interestRate" class="mt-1 p-2 border rounded-md">
      </div>
      <div class="mb-4">
        <label for="loanTerm" class="block text-sm font-medium text-gray-700">Loan Term (years)</label>
        <input v-model="loanTerm" type="number" id="loanTerm" name="loanTerm" class="mt-1 p-2 border rounded-md">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Calculate</button>
    </form>
    <div v-if="mortgageResult" class="mt-4">
      <h2 class="text-xl font-semibold">Mortgage Result</h2>
      <p class="text-gray-800">Your monthly payment: €{{ mortgageResult }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      loanAmount: null,
      interestRate: null,
      loanTerm: null,
      mortgageResult: null
    };
  },
  methods: {
    calculateMortgage() {
      const principal = parseFloat(this.loanAmount);
      const annualInterestRate = parseFloat(this.interestRate);
      const loanTermInYears = parseFloat(this.loanTerm);
      
      if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(loanTermInYears)) {
        // Handle invalid input
        this.mortgageResult = null;
        return;
      }
      
      const monthlyInterestRate = (annualInterestRate / 12) / 100;
      const numberOfPayments = loanTermInYears * 12;
      
      const mortgagePayment = principal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)));
      
      this.mortgageResult = mortgagePayment.toFixed(2); // Rounded to 2 decimal places
    }
  }
}
</script>
