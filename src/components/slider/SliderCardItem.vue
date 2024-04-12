<template>
  <v-list-item>
    <v-dialog v-model="deleteModalIsOpen" max-width="400">

      <template v-slot:activator>
        <v-card flat class="my-1 d-flex" rounded="lg">
          <v-container fluid class="py-2 px-2">
            <v-row
                class="d-flex justify-center justify-lg-space-between flex-column flex-lg-row">
              <v-col align-self="center" class="d-flex">
                <v-img :src="getImage" cover width="113" height="72" max-width="113" rounded="lg"></v-img>
                <div :title="data?.title?.ka" class="d-flex flex-column justify-space-evenly pl-3 text-gray">
                  <span>{{ data?.title?.ka }}</span>
                  <span>{{ data?.date }}</span>
                </div>
              </v-col>
              <v-col class="d-flex flex-row align-center justify-space-between btnGroup pr-5">
                <v-btn @click="setSliderEditIsOpen(!sliderEditIsOpen)" rounded flat color="#1E77A64D" class="editBtn"
                       :prepend-icon="IconPencil">
                  რედაქტირება
                </v-btn>
                <v-btn @click="setModalIsOpen(true)" rounded flat color="#BB2C2C4D" class="deleteBtn"
                       :loading="sliderIsDeleting"
                       :prepend-icon="IconTrash">
                  წაშლა
                </v-btn>
              </v-col>
            </v-row>

            <SliderEditForm
                v-if="sliderEditIsOpen"
                :data="data"
                @closeEditSliderForm="setSliderEditIsOpen(false)"
                @editSlider="emits('editSlider')"
            />

          </v-container>
        </v-card>
      </template>

      <template v-slot:default>
        <v-card class="w-100 d-flex text-center" title="ნამდვილად გსურთ წაშლა?">

          <v-card-actions class="w-100 d-flex justify-center">
            <v-btn
                text="დახურვა"
                variant="outlined"
                @click="setModalIsOpen(false)"
            ></v-btn>

            <v-btn
                text="წაშლა"
                variant="outlined"
                color="rgb(187,44,44)"
                class="deleteBtn"
                :loading="sliderIsDeleting"
                @click="deleteSliderAndCloseModal"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>

    </v-dialog>
  </v-list-item>
</template>

<script setup lang="ts">
import footballImage from "@/assets/images/football.jpeg";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import {computed, inject, PropType, ref} from "vue";
import SliderEditForm from "@/components/slider/SliderEditForm.vue";
import {messageServiceKey} from "@/service/message";
import axios from "@/config/axios";
import {SliderDataType} from "@/types/slider/index.interface.ts";

const {data} = defineProps({
  data: {
    type: Object as PropType<SliderDataType>,
    required: true
  }
});

const emits = defineEmits(['deleteSlider', 'editSlider']);

const deleteModalIsOpen = ref(false);
const sliderIsDeleting = ref(false);
const sliderEditIsOpen = ref(false);

const getImage = computed(() => {
  if (typeof data.image === 'string' && data.image) {
    return data.image;
  }
  // load default image if something unexpected happens
  return footballImage;
});

const messageService = inject(messageServiceKey);


const setModalIsOpen = (value: boolean) => deleteModalIsOpen.value = value;
const setSliderEditIsOpen = (value: boolean) => sliderEditIsOpen.value = value;

function deleteSliderAndCloseModal() {
  sliderIsDeleting.value = true;

  axios.delete(`sliders/${data?.id}`)
      .then(() => {
        emits('deleteSlider', data.id);
        messageService?.showMessage('სლაიდერის წაშლა წარმატებით დასრულდა!', 'success');
      })
      .catch((err) => {
        messageService?.showMessage(`დაფიქსირდა შეცდომა: ${err}`, 'error');
      })
      .finally(() => {
        deleteModalIsOpen.value = false;
        sliderIsDeleting.value = false;
      })
}


</script>

<style scoped>
.editBtn {
  font-weight: bold;
  color: #1E77A6;
}

.deleteBtn {
  font-weight: bold;
  color: #BB2C2C;
}

.text-gray {
  color: #001E28 !important;
}

.btnGroup {
  width: 100%;
  max-width: 330px;
  margin-left: auto;
}
</style>