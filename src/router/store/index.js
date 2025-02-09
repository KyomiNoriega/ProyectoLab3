import { createStore } from 'vuex';

const store = createStore({
  state: {
    userId: localStorage.getItem('userId') || '', // Inicializa con el valor de localStorage
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id; // Actualiza el estado de Vuex
      localStorage.setItem('userId', id); // Persiste en localStorage
    },
    clearUserId(state) {
      state.userId = ''; // Limpia el estado de Vuex
      localStorage.removeItem('userId'); // Elimina del localStorage
    },
  },
  getters: {
    getUserId: (state) => state.userId, // Getter para acceder al ID
  },
});

export default store;
