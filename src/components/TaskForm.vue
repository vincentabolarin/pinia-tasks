<template>
  <form @submit.prevent="addTask">
    <input type="text" v-model="newTask" placeholder="Add a new task">
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore';
import { ref } from 'vue';

const taskStore = useTaskStore();

const newTask = ref('');

const addTask = () => {
  if (newTask.value.trim() === '') return;

  taskStore.addTask({
    id: String(Math.floor(Math.random() * 10000)),
    title: newTask.value,
    isFav: false
  });
  newTask.value = '';
}
</script>