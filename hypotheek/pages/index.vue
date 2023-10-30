<template>
  <div>
    <h1>Maximale Hypotheek Tool</h1>
    <form @submit.prevent="calculateMortgage">
      <label for="income">Maandelijks inkomen:</label>
      <input v-model="income" type="number" id="income" required />

      <label for="partnerIncome">Inkomen Partner:</label>
      <input v-model="partnerIncome" type="number" id="partnerIncome" />

      <label for="studyDebt">Studie Schuld:</label>
      <input v-model="studyDebt" type="number" id="studyDebt" />

      <label for="postcode">Postcode:</label>
      <input v-model="postcode" type="text" id="postcode" />

      <label for="mortgageTerm">Hypotheek termijn "aantal jaar":</label>
      <select v-model="mortgageTerm" id="mortgageTerm">
        <option value="1">1 year</option>
        <option value="5">5 years</option>
        <option value="10">10 years</option>
        <option value="20">20 years</option>
        <option value="30">30 years</option>
      </select>

      <button type="submit">Bereken</button>
    </form>

    <div v-if="maxMortgageAmount !== null">
      <h2>Resultaten:</h2>
      <p>Maximale Hypotheek Bedrag: €{{ maxMortgageAmount }}</p>
      <p>Maandelijkse Betaling: €{{ monthlyPayment }}</p>
      <p>Totaal Betaling over {{ mortgageTerm }} Jaar: €{{ totalPayment }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      income: 0,
      partnerIncome: 0,
      studyDebt: 0,
      postcode: "",
      mortgageTerm: 1,
      maxMortgageAmount: null,
      monthlyPayment: null,
      totalPayment: null,
    };
  },
  methods: {
    calculateMortgage() {
      const income = parseFloat(this.income);
      const partnerIncome = parseFloat(this.partnerIncome);
      const studyDebt = parseFloat(this.studyDebt);
      const mortgageTerm = parseInt(this.mortgageTerm);
      const postcode = this.postcode.trim();
      
      const interestRates = {
        1: 0.02,
        5: 0.03,
        10: 0.035,
        20: 0.045,
        30: 0.05,
      };
      
      let maxMortgageAmount = (income + partnerIncome) * 4.25;

      if (studyDebt > 0) {
        maxMortgageAmount -= (studyDebt * 0.25);
      }

      const disallowedPostcodes = ["9679", "9681", "9682"];
      if (disallowedPostcodes.includes(postcode)) {
        this.maxMortgageAmount = "Mortgages in this area are not accepted.";
        return;
      }

      const monthlyInterestRate = interestRates[mortgageTerm] / 12;
      const totalMonths = mortgageTerm * 12;

      const monthlyPayment = (maxMortgageAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        
      const totalPayment = monthlyPayment * totalMonths;

      this.maxMortgageAmount = maxMortgageAmount.toFixed(2);
      this.monthlyPayment = monthlyPayment.toFixed(2);
      this.totalPayment = totalPayment.toFixed(2);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

form input, form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(255, 82, 82)56b3;
}

.results {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}
</style>

