<template>
  <Header @search="search"/>
  <v-container fluid>

    <v-btn v-if="!sliderFormIsOpen" @click="setSliderAddFormIsOpen(true)"
           class="mt-10 ml-10" flat rounded="lg" height="48"
           color="primary" :append-icon="IconDownArrow"
           :prepend-icon="IconPlusFilled"
    >
      სლაიდერის დამატება
    </v-btn>
    <SliderAddForm
        v-else
        @close-slider-add-form="setSliderAddFormIsOpen(false)"
        @add-slider="fetchData"
    />


    <v-card color="#F3F6F7" class="mt-10" flat rounded="xl">
      <v-container fluid>

        <SliderCardItem
            v-if="dataIsNotEmptyAfterFetch"
            v-for="slider in data"
            :key="slider?.id"
            :data="slider"
            @delete-slider="fetchData"
            @edit-slider="fetchData"
        />
        <v-card
            v-if="dataIsEmptyAfterFetch"
            class="py-3 font-weight-bold"
            rounded="xl"
            align="center"
            flat>
          სლაიდერები არ მოიძებნა!
        </v-card>
        <SliderSkeletonLoader
            v-if="dataIsEmptyBeforeFetch"
        />

      </v-container>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import IconDownArrow from "@/components/icons/IconDownArrow.vue";
import IconPlusFilled from "@/components/icons/IconPlusFilled.vue";
import SliderSkeletonLoader from "@/components/slider/SliderSkeletonLoader.vue";
import SliderCardItem from "@/components/slider/SliderCardItem.vue";
import SliderAddForm from "@/components/slider/SliderCreateForm.vue";
import {computed, inject, ref} from "vue";
import axiosInstance from "@/config/axios";
import Header from "@/components/Header.vue";
import {messageServiceKey} from "@/service/message";

import {SliderDataType} from "@/types/slider/index.interface.ts";

const data = ref<SliderDataType[]>([]);
const searchableData = ref<SliderDataType[]>([]);
const dataIsFetched = ref(false);
const sliderFormIsOpen = ref(false);


const setSliderAddFormIsOpen = (value: boolean) => sliderFormIsOpen.value = value;

const messageService = inject(messageServiceKey);

const dataIsNotEmptyAfterFetch = computed(() => dataIsFetched.value && data.value.length > 0);
const dataIsEmptyBeforeFetch = computed(() => !dataIsFetched.value && data.value.length === 0);
const dataIsEmptyAfterFetch = computed(() => dataIsFetched.value && data.value.length === 0);

const setDataValue = (value: SliderDataType[]) => data.value = value;
const setSearchableData = (value: SliderDataType[]) => searchableData.value = value;
const setDataIsFetched = (value: boolean) => dataIsFetched.value = value;


const search = (value: string) => data.value = searchableData.value.filter((x: SliderDataType) => (x.title.ka.toLowerCase()).includes(value.toLowerCase()));

async function fetchData() {

  setDataIsFetched(false);
  setDataValue([]);
  setSearchableData([]);

  axiosInstance.get('sliders')
      .then((res) => {
        const fetchedDataArray: SliderDataType[] = res.data.data;

        setDataValue(fetchedDataArray);
        setSearchableData(fetchedDataArray);
      })
      .catch((err) => {
        messageService?.showMessage(`Something went Wrong: ${err?.response?.data?.message}`, 'error');
      })
      .finally(() => {
        setDataIsFetched(true);
      })
}


fetchData();

</script>

<style scoped>

</style>