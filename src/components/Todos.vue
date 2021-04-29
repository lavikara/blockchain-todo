<template>
  <div id="todos" class="container">
    <div class="pending">
      <h2 class="label">Pending task</h2>
      <div
        class="todos"
        v-for="(todo, index) in todos.pendingTodos"
        :key="index"
      >
        <input
          class="checkbox"
          type="checkbox"
          :id="todo.id"
          v-model="todo.completed"
          @change="clicked($event)"
        />
        <ul class="todo-list">
          <li class="list">{{ todo.todo }}</li>
        </ul>
      </div>
    </div>
    <div class="completed">
      <h2 class="label">Completed task</h2>
      <div
        class="todos"
        v-for="(todo, index) in todos.completedTodos"
        :key="index"
      >
        <input
          class="checkbox"
          type="checkbox"
          :id="todo.id"
          v-model="todo.completed"
          @change="clicked($event)"
        />
        <ul class="todo-list">
          <li class="list">{{ todo.todo }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TodosComponent",
  mounted() {
    this.getTodos();
  },
  computed: {
    ...mapState({
      todos: (state) => state.todoModule.todo,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("todoModule", ["getTodos", "toggleCompleted"]),

    clicked(event) {
      let id = event.target.id;
      this.toggleCompleted(id);
    },
  },
};
</script>

<style lang="scss" scoped>
#todos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 6rem;

  .pending,
  .completed {
    @include fadeIn;
    border-radius: 14px;
    padding: 1rem 2rem;

    .label {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 1.2rem;
    }

    .todos {
      display: flex;
      align-items: center;

      @supports (-webkit-appearance: none) or (-moz-appearance: none) {
        .checkbox {
          -webkit-appearance: none;
          -moz-appearance: none;
          width: 20px;
          height: 20px;
          outline: none;
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin: 0;
          margin-right: 0.5rem;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid var(--bc, var(--borderColor));
          background: var(--b, var(--whiteColor));
          transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;

          &:after {
            content: "";
            display: block;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
              opacity var(--d-o, 0.2s);
            width: 5px;
            height: 9px;
            border: 2px solid var(--whiteColor);
            border-top: 0;
            border-left: 0;
            left: 7px;
            top: 4px;
            transform: rotate(var(--r, 20deg));
          }

          &:checked {
            --b: var(--magenta);
            --bc: var(--magenta);
            --d-o: 0.3s;
            --d-t: 0.6s;
            --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
            --r: 43deg;
          }

          &:hover {
            &:not(:checked) {
              &:not(:disabled) {
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
          &:focus {
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

      .todo-list {
        .list {
          font-size: 1.1rem;
          margin: 0.5rem 0;
        }
      }
    }
  }

  .pending {
    background-color: var(--magentaBG);
  }

  .completed {
    background-color: var(--lavenderBG);

    .todos {
      .todo-list {
        .list {
          text-decoration: line-through;
          text-decoration-color: var(--magenta);
        }
      }
    }
  }
}
</style>
