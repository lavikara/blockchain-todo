<template>
  <div id="todo-input" class="container">
    <div class="form-container">
      <label class="label" for="todo-input">New task</label>
      <form class="form" @submit.prevent="submitTodo()">
        <textarea
          class="textarea"
          id="textarea"
          name="todoinput"
          placeholder="Enter task"
          v-model="todo.newTodo"
          @keypress="detectKey"
          required
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TodoInputComponent",

  data() {
    return {
      whiteSpace: /^\s+$/,
    };
  },
  computed: {
    ...mapState({
      todo: (state) => state.todoModule.todo,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("todoModule", ["submitTodo"]),
    detectKey(event) {
      if (
        (event.which === 13 && event.target.value.match(this.whiteSpace)) ||
        (event.which === 13 && !event.target.value)
      ) {
        return;
      } else if (
        event.which === 13 &&
        !event.target.value.match(this.whiteSpace)
      ) {
        event.target.form.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
        event.preventDefault();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#todo-input {
  .form-container {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
      width: 75%;
    }

    @media screen and (max-width: 680px) {
      width: 90%;
    }

    .label {
      color: var(--labelColor);
      margin-bottom: 0.5rem;
    }

    .form {
      @include fadeIn;
      width: 100%;

      .textarea {
        width: 100%;
        border: 1px solid var(--borderColor);
        border-radius: 4px;
        font-size: 16px;
        font-size: 1.2rem;
        font-family: inherit;
        padding: 0.5em 1em;
        margin-bottom: 2rem;
        background-color: var(--offWhite);
      }

      .textarea:focus {
        box-shadow: 0 0 0 1px
          hsla(
            var(--input-focus-h),
            var(--input-focus-s),
            calc(var(--input-focus-l) + 40%),
            0.7
          );
      }
    }
  }
}
</style>
