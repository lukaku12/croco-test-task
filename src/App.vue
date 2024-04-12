<template>
  <Layout>
    <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
    </router-view>
    <ApiMessages/>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layouts/Layout.vue";
import ApiMessages from "@/components/FlashMessages.vue";

</script>