<template>
    <form @submit.prevent="signup">
      <h2>Cadastro</h2>
      <div>
        <label for="username">Nome de usuário</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Cadastrar</button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="message" class="message">{{ message }}</div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
        message: ''
      };
    },
    methods: {
      signup() {
        const data = {
          username: this.username,
          password: this.password
        };
        // Fazer a requisição POST para '/signup' no backend
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              this.error = data.error;
              this.message = '';
            } else {
              this.error = '';
              this.message = data.message;
            }
          })
          .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            this.error = 'Erro interno do servidor';
            this.message = '';
          });
      }
    }
  };
  </script>

   