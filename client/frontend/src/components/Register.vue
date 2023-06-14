<template>
     <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  <div class="div-header">
    <div class="card" >
      <h2>Cadastro</h2>
    <form @submit.prevent="signup">
      <div class="label-float">
        <label for="username">Nome de usuário</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="label-float">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class=".justify-center">
      <button type="submit">Cadastrar</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="message" class="message">{{ message }}</div>
    </form>
    </div>
  </div>
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
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  *{
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
.div-header {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed
  
}
form{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
}
.card {
  background-color: #ffffff80;
  padding: 30px;
  border-radius: 4%;
  box-shadow: 3px 3px 1px 0px #00000060;
  width: 700px;
}
h2{
  text-align: center;
  margin-bottom: 5px;
  color: #0d009c
}
.label-float input{
  width: 100%;
  padding: 5px 5px;
  display: inline-block;
  border: 0;
  border-bottom: 2px solid #0d009c;
  background-color: transparent;
  outline: none;
  min-width: 180px;
  font-size: 16px;
  transition: all .3s ease-out;
  border-radius: 0;
}
.label-float{
  position: relative;
  padding-top: 13px;
  margin-top: 5%;
  margin-bottom: 5%;
}

.label-float input:focus{
  border-bottom: 2px solid #4038a0;
}
.label-float label{
  color: #0d009c;
  pointer-event: none;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0%;
  transition: all .3s ease-out;
}

.label-float input:focus + label,
.label-float input:valid + label{
  font-size: 13px;
  margin-top: 0;
  color: #4038a0
}
button{
  background-color: transparent;
  border-color: #0d009c;
  color: #0d009c;
  padding: 7px;
  font-weight: bold;
  font-size: 12pt;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: all .4s ease-out;
}

button:hover{
  background-color: #0d009c;
  color: #fff;
}

.justify-center{
  display: flex;
  justify-content: 100px;
  padding-right: 100px;
}
#msgError{
  text-align: center;
  color: #ff0000;
  background-color: #ffbbbb;
  padding: 10px;
  border-radius: 4px;
  display: none;
}

#msgSuccess{
  text-align: center;
  color: #00bb00;
  background-color: #bbffbe;
  padding: 10px;
  border-radius: 4px;
  display: none;
}

</style>
   