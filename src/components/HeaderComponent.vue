<template>
  <header class="app-header">
    <nav class="navbar">
      <div class="logo">
        <h1>CryptoApp</h1>
      </div>

      <ul class="nav-links">
        <li><router-link to="/home">Inicio</router-link></li>
        <li><router-link to="/nuevacompra">Compra</router-link></li>
        <li><router-link to="/historialdemovimientos">Movimientos</router-link></li>
        <li><router-link to="/detalletransacciones">Transacciones</router-link></li>
        <li><router-link to="/analisisdeestadoactual">Analisis del Estado</router-link></li>
        <li><router-link to="/analisisdeinversiones">Analisis de Inversiones</router-link></li>
      </ul>

      <div class="user-info">
        <span>Bienvenido, {{ userId }}</span>
        <button @click="logout">Cerrar sesión</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['userId']), // Obtiene el userId desde Vuex
  },
  methods: {
    ...mapMutations(['clearUserId']), // Mapea la mutación para limpiar el estado
    logout() {
      this.clearUserId(); // Limpia el ID del usuario
      this.$router.push('/login'); // Redirige al login
    },
  },
};
</script>

<style scoped>
.app-header {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>