<template>
  <div>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('fetchUser')
    this.$store.dispatch('getProducts')
    if(!localStorage.getItem('wishs')){
      localStorage.setItem('wishs', JSON.stringify([]))
    }
  }
}
</script>
<style>
  
</style>