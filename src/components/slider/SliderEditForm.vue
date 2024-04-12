<template>
  <v-form @submit.prevent="submitForm" ref="formElement"
          class="py-7 px-5 d-flex flex-column align-lg-start align-center">
    <div class="input-group">
      <div>
        <v-text-field
            rounded
            flat
            v-model="form.title.ka"
            variant="outlined"
            :rules="sliderRules.title.ka"
            density="comfortable"
            label="სათაური (ქართ)"
        />
        <v-text-field
            rounded
            flat
            v-model="form.title.en"
            variant="outlined"
            :rules="sliderRules.title.en"
            density="comfortable"
            label="სათაური (ინგლ)"
            class="mt-2"
        />
      </div>
      <div>
        <v-file-input
            rounded
            flat
            v-model="form.image"
            prepend-icon=""
            density="comfortable"
            :append-inner-icon="IconImagePreview"
            accept="image/*"
            label="ატვირთე სურათი"
            variant="outlined"
            class="mt-2"
        />
        <DateInput
            @date-update="setDateValue"
            :date="form.date"
            class="mt-2"
        />
      </div>
    </div>
    <div class="d-flex w-100 justify-center ga-4 ga-lg-8 flex-column flex-lg-row align-center mt-6">
      <v-btn
          rounded
          flat
          color="#F3F6F7"
          height="48"
          width="100%"
          max-width="287"
          @click="emits('closeEditSliderForm')"
      >
        დახურვა
      </v-btn>
      <v-btn
          rounded
          flat
          color="primary"
          type="submit"
          height="48"
          width="100%"
          max-width="287"
          :loading="formIsSubmitting"
      >
        სლაიდერის რედაქტირება
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import IconImagePreview from "@/components/icons/IconImagePreview.vue";
import DateInput from "@/components/inputs/DateInput.vue";
import {inject, PropType, ref} from "vue";
import {messageServiceKey} from "@/service/message";
import sliderRules from '@/validation/slider/index.ts'
import axios from "@/config/axios";
import {SliderDataType, SliderFormDataType} from "@/types/slider/index.interface.ts";

const emits = defineEmits(['closeEditSliderForm', 'editSlider']);
const {data} = defineProps({
  data: {
    type: Object as PropType<SliderDataType>,
    required: true,
  }
});

const form = ref<SliderFormDataType>({
  id: data.id,
  title: {
    en: data.title.en,
    ka: data.title.ka,
  },
  image: undefined,
  date: data.date,
});

const formIsSubmitting = ref(false);
const formElement = ref<{ isValid: boolean } | null>(null);

const messageService = inject(messageServiceKey);

const setDateValue = (date: string) => form.value.date = date;

async function submitForm() {
  const formIsValid = formElement?.value?.isValid;
  if (!formIsValid) return;
  formIsSubmitting.value = true;

  const formData = new FormData();
  formData.append("title[ka]", form.value.title.ka);
  formData.append("title[en]", form.value.title.en);
  formData.append("date", form.value.date ? form.value.date : "");
  if (form.value.image) formData.append("image", form.value.image[0]);
  formData.append("_method", "PATCH");

  axios.post(`sliders/${form.value.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
      .then(() => {
        emits('editSlider');
        emits('closeEditSliderForm');
        messageService?.showMessage('სლაიდერის რედაქტირება წარმატებით დასრულდა!', 'success');
      })
      .catch((err) => {
        messageService?.showMessage(`დაფიქსირდა შეცდომა: ${err}`, 'error');
      })
      .finally(() => {
        formIsSubmitting.value = false;
      })
}


</script>

<style scoped>
.input-group {
  width: 100%;
  grid-row-gap: 5px;
}
</style>