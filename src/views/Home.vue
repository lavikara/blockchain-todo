<template>
  <div class="home">
    <TodoInput />
    <Todos />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoInput from "@/components/TodoInput.vue";
import Todos from "@/components/Todos.vue";

export default {
  name: "HomeView",
  components: {
    TodoInput,
    Todos,
  },
};
</script>
