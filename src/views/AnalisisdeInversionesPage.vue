<template>
    <div class="investment-analysis">
        <h1>Análisis de Inversiones</h1>

        <table class="analysis-table" v-if="investmentData.length">
            <thead>
                <tr>
                    <th>Criptomoneda</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="crypto in investmentData" :key="crypto.crypto_code">
                    <td>{{ crypto.crypto_code }}</td>
                    <td :class="{ positive: crypto.result >= 0, negative: crypto.result < 0 }">
                        {{ formatCurrency(crypto.result) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            Cargando datos
        </div>
    </div>
</template>

<script>
import lab3api from '@/api/lab3api';
import axios from 'axios';

export default {
    data() {
        return {
            investmentData: [], // Lista de resultados de las inversiones
        };
    },
    async mounted() {
        await this.analyzeInvestments();
    },
    methods: {
        async analyzeInvestments() {
            try {
                const transactionsResponse = await lab3api.getTransaction(localStorage.getItem('userId'));

                // Consolidar datos de compras y ventas por criptomoneda
                const cryptoData = transactionsResponse.data.reduce((totals, transaction) => {
                    const { crypto_code, crypto_amount, money, action } = transaction;

                    if (!totals[crypto_code]) totals[crypto_code] = { amount: 0, cost: 0, revenue: 0 };

                    if (action === 'purchase') {
                        totals[crypto_code].amount += parseFloat(crypto_amount);
                        totals[crypto_code].cost += parseFloat(money);
                    } else if (action === 'sale') {
                        totals[crypto_code].amount -= parseFloat(crypto_amount);
                        totals[crypto_code].revenue += parseFloat(money);
                    }

                    return totals;
                }, {});

                // Consultar valores actuales de criptomonedas con saldo positivo
                const cryptoPrices = await Promise.all(
                    Object.entries(cryptoData)
                        .map(async ([crypto_code, data]) => {
                            const priceResponse = await axios.get(`https://criptoya.com/api/satoshitango/${crypto_code}/ars/1`);
                            return {
                                crypto_code,
                                amount: data.amount,
                                cost: data.cost,
                                revenue: data.revenue,
                                currentValue: priceResponse.data.totalBid,
                            };
                        })
                );

                // Calcular resultados de inversiones
                const investmentData = cryptoPrices.map((crypto) => {
                    const result = crypto.revenue + (crypto.currentValue * crypto.amount) - crypto.cost; // Ganancia/Pérdida
                    return {
                        crypto_code: crypto.crypto_code,
                        result,
                    };
                });

                console.log(investmentData);

                this.investmentData = investmentData;
            } catch (error) {
                console.error('Error al analizar inversiones:', error);
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
.investment-analysis {
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

.positive {
    color: green;
    font-weight: bold;
}

.negative {
    color: red;
    font-weight: bold;
}

.error-message {
    color: red;
    text-align: center;
    font-size: 1rem;
}
</style>