<template>
  <v-card color="#F3F6F7" class="mt-10" flat rounded="xl">
    <v-container fluid class="px-8 pb-8">

      <div class="d-flex my-4 mb-8 justify-space-between align-center">
        <div class="d-flex align-center">
          <v-icon :icon="IconPlusGreenOutlined"></v-icon>
          <span class="ml-2">სლაიდერის დამატება</span>
        </div>
        <div>
          <v-btn
              @click="emits('closeSliderAddForm')"
              color="#1D455233"
              variant="outlined"
              :icon="IconClose"
          ></v-btn>
        </div>

      </div>

      <v-card flat class="my-1 d-flex" rounded="lg">
        <v-container fluid class="py-2 px-2">
          <v-form @submit.prevent="submitForm" ref="formElement"
                  class="py-7 px-5 d-flex flex-column align-lg-start align-center">
            <div class="input-group">
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
                  :rules="sliderRules.title.en"
                  variant="outlined"
                  density="comfortable"
                  label="სათაური (ინგლ)"
              />
              <v-file-input
                  rounded
                  flat
                  v-model="form.image"
                  prepend-icon=""
                  density="comfortable"
                  :rules="sliderRules.image"
                  :append-inner-icon="IconImagePreview"
                  accept="image/*"
                  label="ატვირთე სურათი"
                  variant="outlined"
              />
              <DateInput @date-update="setDateValue"/>
            </div>
            <div class="d-flex w-100 justify-center ga-4 ga-lg-8 flex-column flex-lg-row align-center mt-6">
              <v-btn
                  rounded
                  flat
                  color="#F3F6F7"
                  height="48"
                  width="100%"
                  max-width="287"
                  @click="emits('closeSliderAddForm')"
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
                სლაიდერის დამატება
              </v-btn>
            </div>
          </v-form>

        </v-container>
      </v-card>

    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import IconPlusGreenOutlined from "@/components/icons/IconPlusGreenOutlined.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconImagePreview from "@/components/icons/IconImagePreview.vue";
import DateInput from "@/components/inputs/DateInput.vue";
import {inject, ref} from "vue";
import {messageServiceKey} from "@/service/message";
import sliderRules from '@/validation/slider/index.ts'
import axios from "@/config/axios";
import {SliderFormDataType} from "@/types/slider/index.interface.ts";

const emits = defineEmits(['closeSliderAddForm', 'addSlider']);
const form = ref<SliderFormDataType>({
  title: {
    en: "",
    ka: ""
  },
  image: undefined,
  date: undefined,
});
const formIsSubmitting = ref(false);
const formElement = ref<{isValid: boolean} | null>(null);

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
  if (form.value?.image) formData.append("image", form.value?.image[0]);

  axios.post('sliders', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
      .then(() => {
        emits('addSlider', form.value);
        emits('closeSliderAddForm');
        messageService?.showMessage('სლაიდერის შექმნა წარმატებით დასრულდა!', 'success');
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
  max-width: 335px;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-row-gap: 5px;
}
</style>