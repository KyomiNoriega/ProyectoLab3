<template>
    <div class="purchase-form">
        <h1>Compra y Venta de Criptomonedas</h1>
        <form @submit.prevent="realizarOperacion">
            <div class="form-group">
                <label for="crypto">Criptomoneda</label>
                <select v-model="coin">
                    <option value="btc">Bitcoin</option>
                    <option value="eth">Ethereum</option>
                    <option value="usdc">USDC</option>
                </select>
            </div>

            <div class="form-group">
                <label>
                    Tipo de Operación:
                    <select v-model="action">
                        <option value="purchase">Compra</option>
                        <option value="sale">Venta</option>
                    </select>
                </label>
            </div>
            <div class="form-group">
                <label v-if="coin === 'btc'">
                    Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.btc.totalAsk }} </span>
                    <span v-else-if="action === 'sale'"> ${{ this.criptos.btc.totalBid }} </span>
                </label>
            </div>
            <div class="form-group">
                <label v-if="coin === 'usdc'">
                    Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.usdc.totalAsk }} </span>
                    <span v-else-if="action === 'sale'"> ${{ this.criptos.usdc.totalBid }} </span>
                </label>
            </div>
            <div class="form-group">
                <label v-if="coin === 'eth'">
                    Precio: <span v-if="action === 'purchase'"> ${{ this.criptos.eth.totalAsk }} </span>
                    <span v-else-if="action === 'sale'"> ${{ this.criptos.eth.totalBid }} </span>
                </label>
            </div>
            <div class="form-group">
                <label>
                    Cantidad:
                    <input type="number" v-model="crypto_amount" min="0" step="0.0000000001"
                        aria-label="Amount (to the nearest dollar)" placeholder="Ej: 0.00001">
                </label>
            </div>

            <button type="submit" class="submit-button">Registrar Compra</button>
        </form>
    </div>
</template>

<script>
import criptoyaApi from '@/api/criptoya';
import lab3api from '@/api/lab3api';
import moment from 'moment';

export default {
    data() {
        return {
            action: 'purchase',
            coin: 'btc',
            crypto_amount: 0,
            money: '0',
            datetime: '',
            criptos: {
                btc: '',
                eth: '',
                usdc: '',
            }
        }
    },
    created() {
        criptoyaApi.getBitcoin().then((res) => { this.criptos.btc = res.data });
        criptoyaApi.getEtherum().then((res) => { this.criptos.eth = res.data });
        criptoyaApi.getUSDC().then((res) => { this.criptos.usdc = res.data });
    },
    computed: {
        totalTransaction() {
            let amount = 0;

            if (this.coin === 'btc') {
                if (this.action === 'purchase') {
                    amount = this.crypto_amount * this.criptos.btc.totalAsk;
                } else if (this.action === 'sale') {
                    amount = this.crypto_amount * this.criptos.btc.totalBid;
                }
            } else if (this.coin === 'eth') {
                if (this.action === 'purchase') {
                    amount = this.crypto_amount * this.criptos.eth.totalAsk;
                } else if (this.action === 'sale') {
                    amount = this.crypto_amount * this.criptos.eth.totalBid;
                }
            } else if (this.coin === 'usdc') {
                if (this.action === 'purchase') {
                    amount = this.crypto_amount * this.criptos.usdc.totalAsk;
                } else if (this.action === 'sale') {
                    amount = this.crypto_amount * this.criptos.usdc.totalBid;
                }
            }

            return amount.toFixed(2);
        }
    },
    methods: {
        realizarOperacion() {
            this.datetime = new Date();
            this.datetime = moment(this.datetime).format("DD-MM-YYYY hh:ss");
            let transaction = {
                user_id: localStorage.getItem('userId'),
                action: this.action,
                crypto_code: this.coin,
                crypto_amount: this.crypto_amount.toString(),
                money: this.money,
                datetime: this.datetime,
            }
            lab3api.postTransaction(transaction);
            console.log(transaction);
        },
    }
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