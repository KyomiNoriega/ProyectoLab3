<template>
  <div class="finance-analysis">
    <h1>Análisis del Estado Actual</h1>

    <table class="analysis-table" v-if="analysisData.length">
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero (ARS)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto in analysisData" :key="crypto.crypto_code">
          <td>{{ crypto.crypto_code }}</td>
          <td>{{ crypto.amount }}</td>
          <td>{{ formatCurrency(crypto.value) }}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>Total</strong></td>
          <td>{{ formatCurrency(totalValue) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>No se encontraron criptomonedas en su balance actual.</div>
  </div>
</template>

<script>
import lab3api from '@/api/lab3api';
import axios from 'axios';

export default {
  data() {
    return {
      analysisData: [], // Datos consolidados de criptomonedas
      totalValue: 0, // Valor total en ARS
    };
  },
  async mounted() {
    await this.analyzeFinances();
  },
  methods: {
    async analyzeFinances() {
      try {
        const transactionsResponse = await lab3api.getTransaction(localStorage.getItem('userId'));

        // Consolidar cantidades netas de cada criptomoneda
        const cryptoTotals = transactionsResponse.data.reduce((totals, transaction) => {
          const { crypto_code, crypto_amount, action } = transaction;
          if (!totals[crypto_code]) totals[crypto_code] = 0;
          totals[crypto_code] += action === 'purchase' ? parseFloat(crypto_amount) : -parseFloat(crypto_amount);
          return totals;
        }, {});

        // Filtrar criptomonedas con saldo positivo y obtener sus valores actuales
        const activeCryptos = Object.entries(cryptoTotals).filter(([, amount]) => amount > 0);

        const cryptoPrices = await Promise.all(
          activeCryptos.map(async ([crypto_code, amount]) => {
            const priceResponse = await axios.get(`https://criptoya.com/api/satoshitango/${crypto_code}/ars/${amount}`);
            console.log(priceResponse);
            return {
              crypto_code,
              amount,
              value: priceResponse.data.totalBid,
            };
          })
        );

        // Calcular el valor total
        const totalValue = cryptoPrices.reduce((total, crypto) => total + crypto.value, 0);

        console.log(cryptoPrices);

        this.analysisData = cryptoPrices;
        this.totalValue = totalValue;
      } catch (error) {
        console.error('Error al analizar las finanzas:', error);
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
      }).format(value);
    },
  },
};
</script>

<style scoped>
.finance-analysis {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.analysis-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.analysis-table th,
.analysis-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.analysis-table th {
  background-color: #4caf50;
  color: white;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 1rem;
}
</style>