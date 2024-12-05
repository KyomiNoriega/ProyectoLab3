<template>
    <div class="transaction-detail">
      <h1>Detalles de la Transacción</h1>
  
      <div v-if="loading" class="loading-message">Cargando...</div>
      <div v-else>
        <div v-if="transaction">
          <p><strong>ID:</strong> {{ transaction._id }}</p>
          <p><strong>Criptomoneda:</strong> {{ transaction.crypto_code }}</p>
          <p><strong>Cantidad:</strong> {{ transaction.crypto_amount }}</p>
          <p><strong>Monto (ARS):</strong> {{ transaction.money }}</p>
          <p><strong>Tipo:</strong> {{ transaction.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
          <p><strong>Fecha:</strong> {{ formatDate(transaction.datetime) }}</p>
  
          <h2>Editar Transacción</h2>
          <form @submit.prevent="updateTransaction">
            <div class="form-group">
              <label for="money">Monto (ARS):</label>
              <input
                type="number"
                step="0.01"
                v-model="form.money"
                id="money"
                required
                placeholder="Ej: 170.55"
              />
            </div>
            <button type="submit" class="submit-button">Guardar Cambios</button>
          </form>
  
          <button class="delete-button" @click="deleteTransaction">
            Eliminar Transacción
          </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      transactionId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        transaction: null, // Detalles de la transacción
        form: {
          money: '', // Campo para edición
        },
        loading: true,
        errorMessage: '',
        successMessage: '',
      };
    },
    async mounted() {
      await this.fetchTransaction(); // Cargar los datos iniciales
    },
    methods: {
      async fetchTransaction() {
        try {
          this.loading = true;
          const response = await axios.get(
            `https://laboratorio3-f36a.restdb.io/rest/transactions/${this.transactionId}`,
            {
              headers: {
                'x-apikey': '60eb09146661365596af552f',
              },
            }
          );
          this.transaction = response.data;
          this.form.money = response.data.money; // Inicializar el formulario con el valor actual
          this.loading = false;
        } catch (error) {
          console.error('Error al obtener la transacción:', error);
          this.errorMessage = 'No se pudo cargar la transacción.';
          this.loading = false;
        }
      },
      async updateTransaction() {
        try {
          await axios.patch(
            `https://laboratorio3-f36a.restdb.io/rest/transactions/${this.transactionId}`,
            { money: this.form.money },
            {
              headers: {
                'x-apikey': '60eb09146661365596af552f',
              },
            }
          );
          this.successMessage = 'Transacción actualizada con éxito.';
          this.errorMessage = '';
          await this.fetchTransaction(); // Recargar la transacción actualizada
        } catch (error) {
          console.error('Error al actualizar la transacción:', error);
          this.errorMessage =
            'No se pudo actualizar la transacción. Inténtelo nuevamente.';
          this.successMessage = '';
        }
      },
      async deleteTransaction() {
        if (confirm('¿Estás seguro de que deseas borrar esta transacción?')) {
          try {
            await axios.delete(
              `https://laboratorio3-f36a.restdb.io/rest/transactions/${this.transactionId}`,
              {
                headers: {
                  'x-apikey': '60eb09146661365596af552f',
                },
              }
            );
            this.successMessage = 'Transacción eliminada con éxito.';
            this.errorMessage = '';
            this.$emit('transactionDeleted', this.transactionId); // Notifica al componente padre
          } catch (error) {
            console.error('Error al borrar la transacción:', error);
            this.errorMessage =
              'No se pudo borrar la transacción. Inténtelo nuevamente.';
            this.successMessage = '';
          }
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
    },
  };
  </script>
  
  <style scoped>
  .transaction-detail {
    max-width: 500px;
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
  
  p {
    margin: 10px 0;
    font-size: 1rem;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .submit-button {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #d32f2f;
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
  