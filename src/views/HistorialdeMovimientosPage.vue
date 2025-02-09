<template>
    <div>
        <div v-if="!showEditForm" class="w-full md:w-2/3 mx-auto p-4">
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <div class="bg-blue-500 text-white text-lg font-semibold p-4">
                    Historial de Transacciones
                </div>
                <div class="p-4 overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Crypto Code</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Crypto Amount</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Money</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date</th>
                                <th class="px-4 py-2"></th>
                                <th class="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="tran in history" :key="tran._id">
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ tran.crypto_code }}
                                </td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ tran.crypto_amount }}
                                </td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ tran.money }}</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{
                                    tran.action.toUpperCase() }}</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ new
                                    Date(tran.datetime).toLocaleString() }}</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm">
                                    <button @click="editTransaction(tran)" class="text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                </td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm">
                                    <button @click="delTransaction(tran._id)" class="text-red-500 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-else class="w-full md:w-2/3 mx-auto p-4">
            <div class="bg-white shadow rounded-lg p-6">
                <h3 class="text-lg font-semibold mb-4">Edit Transaction</h3>
                <form @submit.prevent="updateTran">
                    <div class="mb-4">
                        <label for="crypto_code" class="block text-sm font-medium text-gray-700">Crypto Code</label>
                        <select v-model="selectedTranEdit.crypto_code" id="crypto_code"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="btc">Bitcoin</option>
                            <option value="eth">Ethereum</option>
                            <option value="usdc">USDC</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="crypto_amount" class="block text-sm font-medium text-gray-700">Crypto Amount</label>
                        <input type="text" v-model="selectedTranEdit.crypto_amount" id="crypto_amount"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="money" class="block text-sm font-medium text-gray-700">Money</label>
                        <input type="text" v-model="selectedTranEdit.money" id="money"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="action" class="block text-sm font-medium text-gray-700">Action</label>
                        <select v-model="selectedTranEdit.action" id="action"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="purchase">Purchase</option>
                            <option value="sale">Sale</option>
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Ok
                        </button>
                        <button type="button" @click="cancelEdit"
                            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import lab3api from '@/api/lab3api';

export default {
    components: {},
    data() {
        return {
            history: {},
            showEditForm: false,
            selectedTran: {},
            selectedTranEdit: {}
        }
    },
    created() {
        lab3api.getTransaction(localStorage.getItem('userId')).then((res) => {
            this.history = res.data;
        })
    },
    methods: {
        editTransaction(tran) {
            this.selectedTran = tran;
            this.selectedTranEdit = tran;
            this.showEditForm = true;
        },
        cancelEdit() {
            this.selectedTran = {};
            this.showEditForm = false;
            console.log("canceled")
        },
        updateTran() {
            if (!this.selectedTran || !this.selectedTran._id) {
                alert('No se ha seleccionado ninguna transacción');
                return;
            }

            const id = this.selectedTran._id;
            const data = {};

            if (!this.selectedTranEdit.crypto_code?.trim()) {
                alert('El código de la crypto es requerido');
                return;
            }

            if (!this.selectedTranEdit.crypto_amount || !this.selectedTranEdit.money) {
                alert('Los montos son requeridos');
                return;
            }

            data.crypto_code = this.selectedTranEdit.crypto_code;
            data.crypto_amount = this.selectedTranEdit.crypto_amount;
            data.money = this.selectedTranEdit.money;

            lab3api.patchTransaction(id, data);
            this.showEditForm = false;
        },
        delTransaction(id) {
            lab3api.delTransaction(id);
            alert('Transaction has been deleted: id ' + id);
            location.reload();
        }
    },
}
</script>