export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const SET_NEW_TODO = (state, payload) => {
  state.todo.newTodo = payload.newTodo;
};

export const CLEAR_NEW_TODO = (state, payload) => {
  state.todo.newTodo = payload.newTodo;
};

export const SET_PENDING_TODO = (state, payload) => {
  state.todo.pendingTodos = payload.pendingTodos;
};

export const SET_COMPLETED_TODO = (state, payload) => {
  state.todo.completedTodos = payload.completedTodos;
};
