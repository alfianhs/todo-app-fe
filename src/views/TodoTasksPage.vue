<template>
  <Notification :notification="notification" />
  <div class="bg-[#EDEDED] min-h-screen flex flex-col items-center relative">
    <!-- Background Elements -->
    <div
      class="bg-[#70978F] text-white p-[100px] h-[230px] transform skew-y-6 absolute top-0 left-0 z-0"
    ></div>
    <div
      class="bg-[#70978F] text-white p-[100px] h-[230px] transform -skew-y-6 absolute top-0 right-0 z-0"
    ></div>

    <!-- Decorative circle -->
    <div
      class="absolute top-0 left-0 w-48 h-48 bg-[#5D8A81] rounded-full z-20 -translate-x-32 -translate-y-20 opacity-50"
    ></div>
    <div
      class="absolute top-0 left-0 w-32 h-32 bg-[#5D8A81] rounded-full z-20 -translate-x-2 -translate-y-16 opacity-50"
    ></div>

    <!-- Header -->
    <div
      class="bg-[#70978F] w-full max-w-md p-8 rounded-br-[500px] rounded-bl-[500px] text-white text-center z-10 relative"
    >
      <img
        class="h-32 w-32 rounded-full mx-auto mb-4 object-cover"
        src="@/assets/images/profile.webp"
        alt="Profile"
      />
      <h1 class="text-2xl font-semibold">Welcome {{ profile.name }}</h1>
    </div>

    <!-- Image and Greeting Section -->
    <div class="w-full max-w-md flex justify-center flex-col items-center">
      <img
        src="@/assets/images/todoTasks.svg"
        alt="3D Character"
        class="w-48"
      />
      <span class="self-start ml-10 text-2xl font-semibold">Todo Tasks.</span>
    </div>

    <!-- Todo Section -->
    <div
      class="bg-white shadow-xl rounded-[30px] mt-8 max-w-fit min-w-[350px] p-6 mx-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-gray-400">Dairy Tasks.</h2>
        <button @click="$router.push('/create-todo')">
          <img src="@/assets/vectors/plus-icon.svg" alt="Plus Button" />
        </button>
      </div>
      <ul
        class="flex flex-col gap-4 mb-4 h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#5D8A81] scrollbar-track-gray-200"
      >
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="flex gap-4 cursor-pointer group"
          @click="toggleTaskStatus(task)"
        >
          <!-- Custom Checkbox -->
          <div
            class="w-6 h-6 border-2 border-black flex justify-center items-center transition-all duration-75 group-hover:border-black"
            :class="{
              'bg-[#5A877E]': task.status === 'Done',
              'bg-transparent': task.status !== 'Done',
            }"
          >
            <div
              class="w-4 h-4 transition-all duration-75"
              :class="{ 'bg-[#5A877E]': task.status === 'Done' }"
            ></div>
          </div>
          <!-- Task Name -->
          <span class="text-lg text-gray-700 font-semibold">
            {{ task.name }}
          </span>
        </div>
      </ul>
      <!-- Pagination Navigation -->
      <div class="flex justify-between items-center w-full max-w-md">
        <button
          class="p-2 rounded-full bg-[#5D8A81] text-white disabled:bg-gray-300"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          <img src="@/assets/vectors/back-arrow.svg" alt="Prev Arrow" />
        </button>
        <span class="text-gray-500">{{ currentPage }}</span>
        <button
          class="p-2 rounded-full bg-[#5D8A81] text-white disabled:bg-gray-300"
          :disabled="currentPage === totalPage || totalPage === 0"
          @click="nextPage"
        >
          <img
            src="@/assets/vectors/back-arrow.svg"
            alt="Prev Arrow"
            class="rotate-180"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import apiClient from "../heplers/apiClient";
import Notification from "../components/Notification.vue";

const profile = ref<{ id: string; name: string }>({ id: "", name: "" });
const tasks = ref<Array<{ id: string; name: string; status: string }>>([]);
const currentPage = ref(1);
const totalPage = ref(1);
const notification = ref({ show: false, message: "", type: "" });

const showNotification = (message: string, type: "success" | "error") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 2000);
};

const fetchProfile = async () => {
  try {
    const response = await apiClient.get("/v1/auth/profile");
    profile.value.id = response.data.data.id;
    profile.value.name = response.data.data.fullName;
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Error fetching profile:", errorMessage);
  }
};

const fetchTasks = async () => {
  try {
    const response = await apiClient.get(`/v1/todo?page=${currentPage.value}`);
    tasks.value = response.data.data.data.map((todo: any) => ({
      id: todo.id,
      name: todo.name,
      status: todo.status,
    }));
    totalPage.value = response.data.data.meta.totalPage;
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Error fetching todos:", errorMessage);
  }
};

const toggleTaskStatus = async (task: {
  id: string;
  name: string;
  status: string;
}) => {
  const newStatus = task.status === "Done" ? "NotStarted" : "Done";

  try {
    await apiClient.put(`/v1/todo/${task.id}`, { status: newStatus });
    fetchTasks();
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Error updating todo task:", errorMessage);
    showNotification(`${errorMessage}. Please try again.`, "error");
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchTasks();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1;
    fetchTasks();
  }
};

onMounted(() => {
  fetchProfile();
  fetchTasks();
});
</script>
