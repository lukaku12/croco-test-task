<template>
  <v-dialog max-width="350" v-model="modalIsOpen">

    <template v-slot:activator>
      <div class="w-100 position-relative">
        <v-text-field
            rounded
            class="w-100"
            flat
            @focus="setModalIsOpen(true)"
            variant="outlined"
            v-model="dateToLocaleDateString"
            density="comfortable"
            :rules="sliderRules.date"
            readonly
            label="შეიყვანე თარიღი"
        ></v-text-field>

        <div class="closeIconContainer">
          <v-btn
              v-if="datePickerValue"
              @click="clearDatePickerValue"
              flat
              height="24"
              variant="outlined"
              :icon="IconClose" size="small"
              class="closeIcon">
          </v-btn>
        </div>
      </div>
    </template>


    <template v-slot:default>
      <v-card class="position-relative">

        <v-card-actions>
          <v-date-picker
              v-model="datePickerValue"
              @update:modelValue="emitValueAndCloseModal"
              class="w-100">
          </v-date-picker>

          <v-btn
              @click="setModalIsOpen(false)"
              color="#1D455233"
              size="small"
              class="position-absolute closeBtn"
              variant="outlined"
              :icon="IconClose"
          ></v-btn>


        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import IconClose from "@/components/icons/IconClose.vue";
import sliderRules from '@/validation/slider/index.ts'


const emits = defineEmits(['dateUpdate']);
const {date, validate} = defineProps({
  date: {
    type: String || null,
    default: null,
  },
  validate: {
    type: Boolean,
    default: true,
  }
});

// check if input needs validation
onMounted(() => validate ? sliderRules.date : sliderRules.date = [() => true]);

const datePickerValue = ref<Date | null>(date ? new Date(date) : null);
const modalIsOpen = ref(false);

const dateToLocaleDateString = computed(() => datePickerValue.value ? new Date(datePickerValue.value).toLocaleDateString("en-US") : "");

const setModalIsOpen = (value: boolean) => modalIsOpen.value = value;

const clearDatePickerValue = () => datePickerValue.value = null;

function emitValueAndCloseModal() {
  emits('dateUpdate', dateToLocaleDateString);
  setModalIsOpen(false);
}

</script>

<style scoped>
.closeBtn {
  top: 10px;
  right: 10px;
}

.closeIconContainer {
  position: absolute;
  top: 10px;
  right: 11px;
  width: 24px;
}

.closeIcon {
  width: 100%;
  z-index: 100;
}
</style>





