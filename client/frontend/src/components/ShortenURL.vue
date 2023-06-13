<template>
    <div>
      <h2>Encurtar URL</h2>
      <div v-if="shortUrl">
        URL encurtada: <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
      </div>
      <form @submit.prevent="shortenUrl">
        <label>URL:</label>
        <input type="url" v-model="url" required><br>
        <button type="submit">Encurtar</button>
      </form>
      
      <h2>Top 100 de URLs mais visitadas</h2>
  <div v-for="url in topUrls" :key="url.id">
      <p>{{ url.originalUrl }}</p>
      <p>Visitas: {{ url.visits }}</p>
      <p>Título: {{ url.title }}</p>
    </div>
  
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        url: '',
        shortUrl: '',
        topURLs: []
      };
    },
    methods: {
      shortenUrl() {
        const data = {
          url: this.url
        };
  
        axios.post('http://localhost:3000/shorten', data)
          .then(response => {
            const data = response.data;
            if (data.error) {
              console.error('Erro ao encurtar URL:', data.error);
            } else {
              this.shortUrl = data.shortUrl;
            }
          })
          .catch(error => {
            console.error('Erro ao encurtar URL:', error);
          });
      },
      fetchTopURLs() {
        axios.get('http://localhost:3000/top100')
          .then(response => {
            const data = response.data;
            this.topURLs = data.topURLs;
          })
          .catch(error => {
            console.error('Erro ao obter top 100 de URLs:', error);
          });
      }
    },
    mounted() {
      this.fetchTopURLs();
    }
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 10px;
  }
  form {
    margin-bottom: 20px;
  }
  </style>