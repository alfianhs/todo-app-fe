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
    <button
      class="absolute top-14 left-2 z-20"
      @click="$router.push('/register')"
    >
      <img src="@/assets/vectors/back-arrow.svg" alt="Back Arrow" class="w-9" />
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col justify-center px-8 relative z-10">
      <h1
        class="text-3xl font-bold text-gray-800 mb-6 items-center self-center"
      >
        Welcome Back!
      </h1>
      <p class="text-gray-400 mb-8 self-center">
        <img src="@/assets/images/login.svg" alt="Login Illustration" />
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
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
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your Password"
            class="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-900"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#55847A] text-white py-3 rounded-md text-lg font-semibold hover:bg-slate-800 transition duration-300"
        >
          Sign In
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Already have an account?
        <a
          @click="$router.push('/register')"
          class="text-[#55847A] font-semibold cursor-pointer"
          >Sign Up</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import apiClient from "../heplers/apiClient";
import { useRouter } from "vue-router";
import Notification from "../components/Notification.vue";

const email = ref("");
const confirmPassword = ref("");
const authMessage = ref("");
const notification = ref({ show: false, message: "", type: "" });

const router = useRouter();

const showNotification = (message: string, type: "success" | "error") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 2000);
};

onMounted(() => {
  localStorage.removeItem("authToken");
  authMessage.value = localStorage.getItem("authMessage") || "";
  if (authMessage.value) {
    showNotification(authMessage.value, "error");
  }
  localStorage.removeItem("authMessage");
});

const handleSubmit = async () => {
  const payload = {
    email: email.value,
    password: confirmPassword.value,
  };

  try {
    const response = await apiClient.post("/v1/auth/sign-in", payload);
    console.log(response.data);
    localStorage.setItem("authToken", response.data.data.token);
    showNotification("Login successful!", "success");
    router.push("/todo-list");
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Login failed: ", errorMessage);
    showNotification(`${errorMessage}. Please try again.`, "error");
  }
};
</script>
