<template>
  <div class="message-container text-white font-weight-bold position-fixed">
    <div
        v-for="message in messages"
        :key="message.id"
        :class="message.type"
        class="msg-box rounded px-3 pl-5 py-5 w-100 d-flex justify-space-between mb-4"
    >
      <span class="pt-1 pr-6">{{ message.text }}</span>
      <v-btn :icon="IconClose"
             size="x-small"
             flat
             @click="messageService?.deleteMessage(message.id)"
      ></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {messageServiceKey} from "@/service/message";
import {inject, ref} from "vue";
import IconClose from "@/components/icons/IconClose.vue";

const messageService = inject(messageServiceKey);

const messages = ref(messageService?.messages)


</script>


<style scoped>
.message-container {
  width: fit-content;
  right: 10px;
  bottom: 10px;
  max-height: 60vh;
}

.success {
  background-color: #0E9F6E;
}

.error {
  background-color: #BB2C2C;
}

.info {
  background-color: #1E77A6;
}

.msg-box {
  animation-name: fadeIn, fadeOut;
  animation-duration: 500ms, 500ms;
  animation-delay: 0ms, 2500ms;
}

@keyframes fadeIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>