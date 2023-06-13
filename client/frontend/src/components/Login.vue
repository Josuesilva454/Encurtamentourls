<template>
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div>
        <label for="username">Nome de usuário</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Entrar</button>
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
      login() {
        const data = {
          username: this.username,
          password: this.password
        };
        // Fazer a requisição POST para '/login' no backend
        fetch('http://localhost:3000/login', {
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
            console.error('Erro ao fazer login:', error);
            this.error = 'Erro interno do servidor';
            this.message = '';
          });
      
      }
    }
  };
  </script>