<template>
  <v-app class="bg-gray w-100 h-100">
    <div class="d-flex w-100 h-100">
      <Navbar/>
      <div class="w-100">
        <slot/>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
.bg-gray {
  background-color: #DFE5E7;
}
</style>