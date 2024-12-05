<template>
    <div class="crypto-card">
        <h2>{{ name }}</h2>
        <p><strong>Precio de Venta:</strong> {{ formatCurrency(ask) }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: String, // Nombre de la criptomoneda
        ask: Number,  // Precio de venta
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2,
            }).format(value);
        },
    },
};
</script>

<style scoped>
.crypto-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    text-align: center;
    width: 250px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.crypto-card h2 {
    margin-bottom: 15px;
    font-size: 1.5em;
    color: #333;
}

.crypto-card p {
    margin: 8px 0;
    font-size: 1em;
    color: #555;
}

.crypto-card p strong {
    color: #000;
}
</style>