<template>
  <Notification :notification="notification" />
  <div
    class="min-h-screen bg-gray-100 flex flex-col font-sans relative overflow-hidden"
  >
    <!-- Decorative circle -->
    <div
      class="absolute top-0 left-0 w-48 h-48 bg-[#55847A] rounded-full -translate-x-32 -translate-y-20 opacity-50"
    ></div>
    <div
      class="absolute top-0 left-0 w-32 h-32 bg-[#55847A] rounded-full -translate-x-2 -translate-y-16 opacity-50"
    ></div>

    <!-- Back button -->
    <button class="absolute top-14 left-2 z-50" @click="$router.push('/')">
      <img src="@/assets/vectors/back-arrow.svg" alt="Back Arrow" class="w-9" />
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col justify-center px-8 relative z-10">
      <h1
        class="text-3xl font-bold text-gray-800 mb-6 items-center self-center"
      >
        Welcome Onboard!
      </h1>
      <p class="text-gray-400 mb-8 self-center">
        Let's help you meet up your task
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <input
            v-model="fullName"
            type="text"
            placeholder="Enter your Full Name"
            class="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-900"
          />
        </div>
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your Email address"
            class="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-900"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Create a Password"
            class="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-900"
          />
        </div>
        <div>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
            class="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-900"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#55847A] text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Already have an account?
        <a
          @click="$router.push('/login')"
          class="text-[#55847A] font-semibold cursor-pointer"
          >Sign In</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apiClient from "../heplers/apiClient";
import { useRouter } from "vue-router";
import Notification from "../components/Notification.vue";

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const notification = ref({ show: false, message: "", type: "" });

const router = useRouter();

const showNotification = (message: string, type: "success" | "error") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 3000);
};

const handleSubmit = async () => {
  const payload = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    const response = await apiClient.post("/v1/auth/sign-up", payload);
    console.log(response.data);
    showNotification(
      "Registration successful!<br> Redirecting to login...",
      "success"
    );
    setTimeout(() => router.push("/login"), 3000);
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Registration failed: ", errorMessage);
    showNotification(`${errorMessage}. Please try again.`, "error");
  }
};
</script>
