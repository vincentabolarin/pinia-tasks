import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false
  }),

  getters: {
    getFavTasks() {
      return this.tasks.filter(task => task.isFav);
    },

    getFavCount () {
      // return this.getFavTasks.length;

      // return this.tasks.filter(task => task.isFav).length;

      return this.tasks.reduce((acc, task) => task.isFav ? acc + 1 : acc, 0);
    },

    getTotalCount: (state) => state.tasks.length,
  },

  actions: {
    async getTasks() {
      this.loading = true;

      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      this.tasks = data;

      this.loading = false;
    },
    
    addTask(task) {
      this.tasks.push(task);
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    toggleFavTask(id) {
      const task = this.tasks.find(task => task.id === id);
      task.isFav = !task.isFav;
    }
  }
})