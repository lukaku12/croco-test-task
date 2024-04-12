<template>
  <v-container fluid class="w-100 h-100px mt-6">
    <v-card class="w-100 h-100px d-flex" flat rounded="xl">
      <v-col align-self="center" class="d-flex">
        <v-btn :icon="IconLeftArrow" variant="plain" class="pr-1 mr-2"></v-btn>
        <div class="d-flex justify-center align-center">
          <component :is="currentRoute?.icon" class="mr-2"/>
          <span class="font-weight-medium">{{ currentRoute?.title }}</span>
        </div>
      </v-col>

      <v-col align-self="center" justify="end" class="justify-end d-flex">
        <v-responsive
            max-width="335"
        >
          <v-text-field
              rounded
              v-model="search[currentRoute?.name]"
              @input="emits('search', search[currentRoute?.name])"
              density="comfortable"
              flat
              placeholder="ძიება"
              prepend-inner-icon="mdi-magnify"
              bg-color="#DFE5E7"
              variant="solo-filled"
              hide-details
              class="search-input py-0 pl-0"
          ></v-text-field>
        </v-responsive>
      </v-col>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {headerMetaData} from "@/data/navLinks.ts";
import {SearchType} from "@/types/search/index.interface.ts";

const search = ref<SearchType>({});
const navLinks = headerMetaData();

const emits = defineEmits(['search']);

const route = useRoute();

const currentRoute = navLinks.filter((navLink) => navLink.name === route.name)[0];

watch(route, () => {
  if (currentRoute?.name) search.value[currentRoute?.name] = "";
});

</script>

<style scoped>
.h-100px {
  height: 100px;
}


</style>

