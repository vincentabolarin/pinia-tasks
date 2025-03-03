<template>
  <main>
    <!-- Header -->
     <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo">
      <h1>Pinia Tasks</h1>
     </header>

     <!-- New Task Form -->
      <div class="new-task-form">
        <TaskForm />
      </div>

     <!-- Filter -->
      <nav class="filter">
        <button @click="filter = 'all'">All Tasks</button>
        <button @click="filter = 'favs'">Fav Tasks</button>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="loading">
        <p>Loading Tasks...</p>
      </div>

     <!-- Task List -->
      <div class="task-list" v-if="filter === 'all'">
        <p>You have {{ totalCount }} task{{totalCount > 1 ? 's' : ''}} left to do!</p>
        <div v-for="task in tasks">
          <TaskDetails :task="task" />
        </div>
      </div>

      <div class="task-list" v-if="filter === 'favs'">
        <p>You have {{ favCount }} fav task{{favCount > 1 ? 's' : ''}} left to do!</p>
        <div v-for="task in favTasks">
          <TaskDetails :task="task" />
        </div>
      </div>

      <!-- <button @click="resetState">Reset State</button> -->
  </main>
</template>

<script setup>
import { ref } from 'vue';
import TaskDetails from './components/TaskDetails.vue';
import { useTaskStore } from './stores/TaskStore';
import TaskForm from './components/TaskForm.vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();

taskStore.getTasks();

const filter = ref('all');

const { tasks, loading, favTasks, favCount, totalCount } = storeToRefs(taskStore);

const resetState = () => {
  taskStore.$reset();
}
</script>