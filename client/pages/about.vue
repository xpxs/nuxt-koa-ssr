<template>
  <section class="container">
    <img 
      src="/img/logo.png" 
      alt="Nuxt.js Logo" 
      class="logo" >
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 
      v-if="name === 'client'" 
      class="info">
      Please refresh the page
    </h2>
    <nuxt-link 
      class="button" 
      to="/">
      Home page
    </nuxt-link>
  </section>
</template>
<script>
export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>
