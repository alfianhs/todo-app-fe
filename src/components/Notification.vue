<template>
  <div 
    v-if="notification.show" 
    :class="[
      'fixed top-10 right-5 p-4 text-lg rounded-lg shadow-lg z-50 transition-all duration-300',
      notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'
    ]"
  >
  <span v-html="notification.message" :class="notification.type === 'success' ? 'text-green-700' : 'text-red-700 font-semibold'"></span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  notification: {
    type: Object,
    required: true,
    default: () => ({ show: false, message: '', type: '' }),
  },
});
</script>
