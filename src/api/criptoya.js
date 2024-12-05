import axios from 'axios';

const API_BASE_URL = 'https://criptoya.com/api';

export const getCryptoPrices = async () => {
  try {
    const [btc, eth, usdc] = await Promise.all([
      axios.get(`${API_BASE_URL}/satoshitango/btc/ars`),
      axios.get(`${API_BASE_URL}/satoshitango/eth/ars`),
      axios.get(`${API_BASE_URL}/satoshitango/usdc/ars`),
    ]);

    return {
      BTC: btc.data.totalAsk,
      ETH: eth.data.totalAsk,
      USDC: usdc.data.totalAsk,
    };
  } catch (error) {
    console.error('Error al obtener precios de criptomonedas:', error);
    throw error;
  }
};
