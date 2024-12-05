<template>
    <div class="transaction-management">
      <h1>Gestión de Transacciones</h1>
  
      <!-- Tabla de movimientos -->
      <div v-if="!selectedTransactionId">
        <h2>Historial de Movimientos</h2>
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
                <button @click="selectTransaction(transaction._id)">Ver Detalles</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!transactions.length">No se encontraron movimientos.</p>
      </div>
  
      <!-- Detalle de transacción seleccionada -->
      <div v-else>
        <TransactionDetail
          :transaction-id="selectedTransactionId"
          @transactionDeleted="handleTransactionDeleted"
        />
        <button @click="deselectTransaction" class="back-button">Volver</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TransactionDetail from '@/components/DetalleTransaccion.vue'; // Ruta donde guardaste el componente
  
  export default {
    components: { TransactionDetail },
    data() {
      return {
        transactions: [], // Lista de transacciones
        selectedTransactionId: null, // ID de la transacción seleccionada
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
      selectTransaction(transactionId) {
        this.selectedTransactionId = transactionId; // Selecciona una transacción
      },
      deselectTransaction() {
        this.selectedTransactionId = null; // Deselecciona la transacción
      },
      handleTransactionDeleted(transactionId) {
        this.transactions = this.transactions.filter(
          (transaction) => transaction._id !== transactionId
        );
        this.selectedTransactionId = null; // Vuelve al listado después de borrar
      },
    },
  };
  </script>
  
  <style scoped>
  .transaction-management {
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
  
  .transactions-table td button {
    background-color: #2196f3;
    color: white;
  }
  
  .transactions-table td button:hover {
    opacity: 0.8;
  }
  
  .back-button {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #d32f2f;
  }
  </style>
  