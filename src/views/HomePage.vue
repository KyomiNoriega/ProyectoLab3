<template>
  <div class="home-page">
    <div class="header">
      <h1>Cripto Precios</h1>
    </div>

    <div class="content">
      <div class="crypto-grid">
        <CryptoCard v-for="crypto in cryptos" :key="crypto.name" :name="crypto.name" :ask="crypto.ask" />
      </div>
    </div>
  </div>
</template>

<script>
import CryptoCard from '@/components/CryptoCard.vue';
import { getCryptoPrices } from '@/api/criptoya.js';
import { mapState, mapMutations } from 'vuex';

export default {
  components: { CryptoCard },
  data() {
    return {
      cryptos: [], // Almacena la lista de criptomonedas con sus datos
    };
  },
  mounted() {
    this.fetchCryptos();
  },
  computed: {
    ...mapState(['userId']),
  },
  methods: {
    ...mapMutations(['clearUserId']),
    logout() {
      this.clearUserId();
      this.$router.push('/login');
    },
    async fetchCryptos() {
      try {
        const prices = await getCryptoPrices();

        // Mapear los datos a un formato compatible con los componentes
        this.cryptos = [
          { name: 'Bitcoin', ask: prices.BTC },
          { name: 'Ethereum', ask: prices.ETH },
          { name: 'USDC', ask: prices.USDC },
        ];
      } catch (error) {
        console.error('Error al cargar precios:', error);
      }
    },
  },
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

.crypto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  align-items: start;
}
</style>