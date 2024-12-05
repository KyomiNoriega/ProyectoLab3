<template>
    <div class="purchase-form">
        <h1>Registrar Compra</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="crypto">Criptomoneda</label>
                <select v-model="form.crypto_code" id="crypto" required>
                    <option disabled value="">Seleccione una opción</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="usdc">USDC</option>
                </select>
            </div>

            <div class="form-group">
                <label for="crypto_amount">Cantidad</label>
                <input type="number" step="0.00001" v-model.number="form.crypto_amount" id="crypto_amount" required
                    placeholder="Ej: 0.001" />
            </div>

            <div class="form-group">
                <label for="money">Monto Pagado (ARS)</label>
                <input type="number" step="0.01" v-model.number="form.money" id="money" required
                    placeholder="Ej: 165.23" />
            </div>

            <div class="form-group">
                <label for="datetime">Fecha y Hora</label>
                <input type="datetime-local" v-model="form.datetime" id="datetime" required />
            </div>

            <button type="submit" class="submit-button">Registrar Compra</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                crypto_code: '',
                crypto_amount: null,
                money: null,
                datetime: '',
            },
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        async handleSubmit() {
            // Validar datos ingresados
            if (
                !this.form.crypto_code ||
                this.form.crypto_amount <= 0 ||
                this.form.money <= 0 ||
                !this.form.datetime
            ) {
                this.errorMessage = 'Por favor, ingrese datos válidos.';
                this.successMessage = '';
                return;
            }

            try {
                // Construir el objeto de la transacción
                const transaction = {
                    user_id: localStorage.getItem('userId'), // Obtener el ID del usuario
                    action: 'purchase',
                    crypto_code: this.form.crypto_code,
                    crypto_amount: this.form.crypto_amount.toString(),
                    money: this.form.money.toString(),
                    datetime: this.formatDateTime(this.form.datetime),
                };

                // Enviar datos a la API
                await axios.post(
                    'https://laboratorio3-f36a.restdb.io/rest/transactions',
                    transaction,
                    {
                        headers: {
                            'x-apikey': '60eb09146661365596af552f',
                        },
                    }
                );

                // Limpiar el formulario y mostrar éxito
                this.successMessage = 'Compra registrada con éxito.';
                this.errorMessage = '';
                this.resetForm();
            } catch (error) {
                console.error('Error al registrar la compra:', error);
                this.errorMessage =
                    'Ocurrió un error al registrar la compra. Por favor, inténtelo nuevamente.';
                this.successMessage = '';
            }
        },
        resetForm() {
            this.form.crypto_code = '';
            this.form.crypto_amount = null;
            this.form.money = null;
            this.form.datetime = '';
        },
        formatDateTime(datetime) {
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
.purchase-form {
    max-width: 400px;
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

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}

.submit-button:hover {
    background: #45a049;
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