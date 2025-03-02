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
      try {
        this.loading = true;
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();

        if (data) {
          this.tasks = data;
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loading = false;
      }
    },
    
    async addTask(task) {
      try {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (response.ok) {
          this.tasks.push(task);
        } else {
          console.error("Error adding task");
        }
      } catch (error) {
        console.error('error', error)
      }
    },

    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      try {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error('error', error)
      }
    },

    toggleFavTask(id) {
      const task = this.tasks.find(task => task.id === id);
      task.isFav = !task.isFav;

      try {
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ isFav: task.isFav }),
        });
      } catch (error) {
        console.error('error', error)
      }
    }
  }
})