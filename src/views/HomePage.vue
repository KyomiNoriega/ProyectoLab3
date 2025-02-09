<template>
  <div class="home-page">
    <div class="header">
      <h1>Cripto Precios</h1>
    </div>

    <div class="container m-auto text-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <template v-if="Value">
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 class="text-2xl font-semibold mb-4">Bitcoin</h2>
            <p class="text-gray-700 mb-2">Compra: ${{ btc.totalAsk }}</p>
            <p class="text-gray-700">Venta: ${{ btc.totalBid }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 class="text-2xl font-semibold mb-4">Etherum</h2>
            <p class="text-gray-700 mb-2">Compra: ${{ eth.totalAsk }}</p>
            <p class="text-gray-700">Venta: ${{ eth.totalBid }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 class="text-2xl font-semibold mb-4">USDC</h2>
            <p class="text-gray-700 mb-2">Compra: ${{ usdc.totalAsk }}</p>
            <p class="text-gray-700">Venta: ${{ usdc.totalBid }}</p>
          </div>
        </template>
        <div v-else class="col-span-full">
          <p class="text-center text-gray-500 text-lg">Cargando....</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import criptoyaApi from '@/api/criptoya'

export default {
  data() {
    return {
      btc: {},
      eth: {},
      usdc: {},
    };
  },
  created() {
    criptoyaApi.getBitcoin().then((res) => { this.btc = res.data });
    criptoyaApi.getEtherum().then((res) => { this.eth = res.data });
    criptoyaApi.getUSDC().then((res) => { this.usdc = res.data });
  },
  computed: {
    Value: function () {
      if (Object.keys(this.btc).length === 0 || Object.keys(this.eth).length === 0 || Object.keys(this.usdc).length === 0) {
        return false
      } else {
        return true
      }
    }
  }
};

</script>

<style scoped>
.header {
  background-color: #4caf50;
  color: white;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  font-size: 2rem;
}
</style>