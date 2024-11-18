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
      class="absolute top-14 left-2 z-50"
      @click="$router.push('/todo-list')"
    >
      <img src="@/assets/vectors/back-arrow.svg" alt="Back Arrow" class="w-9" />
    </button>

    <!-- Main content -->
    <div class="flex-1 flex flex-col justify-center px-8 z-10">
      <h1
        class="text-3xl font-bold text-gray-800 mb-6 items-center self-center"
      >
        Welcome Onboard!
      </h1>
      <p class="text-gray-400 mb-8 self-center">
        <img src="@/assets/images/createTodo.svg" alt="CreateTodo" />
        Add What you want to do later on..
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-for="(task, index) in tasks" :key="index" class="relative">
          <input
            v-model="tasks[index]"
            type="text"
            class="w-full p-3 rounded-xl border border-gray-300"
            placeholder="Enter a todo task..."
          />
          <!-- Remove Todo Button -->
          <button
            type="button"
            @click="removeTodo(index)"
            class="absolute top-1/2 -translate-y-1/2 right-3 text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>
        <!-- Add New Todo Input -->
        <button
          type="button"
          @click="addTodo"
          class="text-[#55847A] font-semibold hover:underline"
        >
          + Add another todo
        </button>
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-[#55847A] text-white py-3 rounded-md text-lg font-semibold hover:bg-slate-800 transition duration-300"
        >
          Add to list
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apiClient from "../heplers/apiClient";
import { useRouter } from "vue-router";
import Notification from "../components/Notification.vue";

const tasks = ref([""]);
const notification = ref({ show: false, message: "", type: "" });

const router = useRouter();

const showNotification = (message: string, type: "success" | "error") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 2000);
};

// Add new input for another todo
const addTodo = () => {
  tasks.value.push("");
};

// Remove todo by index
const removeTodo = (index: number) => {
  tasks.value.splice(index, 1);
};

// Handle submit and call API
const handleSubmit = async () => {
  const payloads = tasks.value.filter((todo) => todo.trim() !== ""); // Filter empty inputs

  if (!payloads.length) {
    showNotification("Please add at least one todo task.", "error");
    return;
  }

  try {
    // Call API for each todo (one at a time)
    for (const name of payloads) {
      await apiClient.post("/v1/todo", { name });
    }
    showNotification("Todo task(s) added successfully!<br> Redirecting to todo list...", "success");
    setTimeout(() => (router.push("/todo-list")), 2000);
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    console.error("Error creating todos:", errorMessage);
    showNotification(`${errorMessage}. Please try again.`, "error");
  }
};
</script>
