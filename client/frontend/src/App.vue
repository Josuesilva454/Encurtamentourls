<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/shorten">Encurtando</RouterLink>  
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  display: flex;
    align-items: center;
    justify-content: space-around;
    background: -moz-linear-gradient();
    height: 4.6875rem;
    padding: 1rem;
}
nav a {
  display: block;
    padding: 50px;
   border-radius: 0.5rem;
}
</style>
