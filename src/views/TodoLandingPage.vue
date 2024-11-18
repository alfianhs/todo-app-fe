<template>
  <div class="min-h-screen bg-green-50 flex flex-col font-sans">
    <!-- Decorative circle -->
    <div
      class="absolute top-0 left-0 w-48 h-48 bg-[#55847A] rounded-full -translate-x-32 -translate-y-20 opacity-50"
    ></div>
    <div
      class="absolute top-0 left-0 w-32 h-32 bg-[#55847A] rounded-full -translate-x-2 -translate-y-16 opacity-50"
    ></div>
    <!-- Main content -->
    <div class="flex-1 flex flex-col justify-center items-center px-8">
      <!-- Placeholder for 3D illustration -->
      <div class="w-64 h-64 mb-8 flex items-center justify-center">
        <img src="@/assets/images/home.svg" alt="landingpage" />
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">
        Get things done with TODo
      </h1>

      <p class="text-gray-600 text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing. Maxime, tempore!
        Animi nemo aut que, deserunt nihil doloremque.
      </p>

      <button
        class="bg-[#55847A] text-white py-3 px-8 text-lg font-semibold"
        @click="$router.push('/register')"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoLanding",
});
</script>
