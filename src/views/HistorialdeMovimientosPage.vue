<template>
    <div class="transactions-page">
        <h1>Historial de Movimientos</h1>

        <table class="transactions-table" v-if="transactions.length">
            <thead>
                <tr>
                    <th>Criptomoneda</th>
                    <th>Cantidad</th>
                    <th>Monto (ARS)</th>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction._id">
                    <td>{{ transaction.crypto_code }}</td>
                    <td>{{ transaction.crypto_amount }}</td>
                    <td>{{ transaction.money }}</td>
                    <td>{{ formatDate(transaction.datetime) }}</td>
                    <td>{{ transaction.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
                    <td>
                        <button @click="readTransaction(transaction._id)">Leer</button>
                        <button @click="editTransaction(transaction._id)">Editar</button>
                        <button @click="deleteTransaction(transaction._id)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="!transactions.length">No se encontraron movimientos.</p>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            transactions: [], // Lista de movimientos
            errorMessage: '',
            successMessage: '',
        };
    },
    mounted() {
        this.fetchTransactions();
    },
    methods: {
        async fetchTransactions() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(
                    `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${userId}"}`,
                    {
                        headers: {
                            'x-apikey': '60eb09146661365596af552f',
                        },
                    }
                );
                this.transactions = response.data;
            } catch (error) {
                console.error('Error al obtener movimientos:', error);
                this.errorMessage = 'No se pudieron cargar los movimientos.';
            }
        },
        formatDate(datetime) {
            const date = new Date(datetime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${day}-${month}-${year} ${hours}:${minutes}`;
        },
        readTransaction(id) {
            alert(`Detalles del movimiento con ID: ${id}`);
        },
        editTransaction(id) {
            alert(`Editar movimiento con ID: ${id}`);
            // Aquí puedes redirigir a una pantalla específica para editar el movimiento
        },
        async deleteTransaction(id) {
            if (confirm('¿Estás seguro de que deseas borrar este movimiento?')) {
                try {
                    await axios.delete(
                        `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`,
                        {
                            headers: {
                                'x-apikey': '60eb09146661365596af552f',
                            },
                        }
                    );
                    this.transactions = this.transactions.filter(
                        (transaction) => transaction._id !== id
                    );
                    this.successMessage = 'Movimiento borrado con éxito.';
                } catch (error) {
                    console.error('Error al borrar el movimiento:', error);
                    this.errorMessage =
                        'No se pudo borrar el movimiento. Inténtelo nuevamente.';
                }
            }
        },
    },
};
</script>

<style scoped>
.transactions-page {
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

.transactions-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.transactions-table th,
.transactions-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

.transactions-table th {
    background-color: #4caf50;
    color: white;
}

.transactions-table td button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.transactions-table td button:nth-child(1) {
    background-color: #2196f3;
    color: white;
}

.transactions-table td button:nth-child(2) {
    background-color: #ffc107;
    color: white;
}

.transactions-table td button:nth-child(3) {
    background-color: #f44336;
    color: white;
}

.transactions-table td button:hover {
    opacity: 0.8;
}

.error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
}

.success-message {
    color: green;
    font-size: 0.9rem;
    text-align: center;
}
</style>