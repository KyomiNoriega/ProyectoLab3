import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://criptoya.com/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

export default {
    getBitcoin() {
        return apiClient.get('argenbtc/btc/ars/1')
    },
    getEtherum() {
        return apiClient.get('argenbtc/eth/ars/1')
    },
    getUSDC() {
        return apiClient.get('lemoncash/usdc/ars/1')
    }
}