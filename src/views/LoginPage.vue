<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Bienvenido</h1>
      <p>Ingresa tu ID alfanumérico para continuar:</p>
      <form @submit.prevent="handleLogin">
        <input
          type="text"
          v-model="userId"
          placeholder="ID alfanumérico"
          required
          maxlength="20"
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      userId: '',
    };
  },
  methods: {
    ...mapMutations(['setUserId']), // Mapea la mutación setUserId desde Vuex
    handleLogin() {
      if (this.userId) {
        this.setUserId(this.userId); // Llama a la mutación para guardar el ID
        this.$router.push('/home'); // Redirige al home
      } else {
        alert('Por favor, ingresa un ID válido.');
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

.login-container {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>
