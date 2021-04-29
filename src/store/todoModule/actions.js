import myUtils from "../../utils/myUtils";

export const getTodos = async ({ dispatch, commit, rootState }) => {
  let pendingTodos = [];
  let completedTodos = [];
  const userAccount = rootState.userModule.user.userAccount;
  const contract = rootState.contracts.todoContract;

  let todoCount = await contract.methods.todoCount().call();
  for (let i = 1; i <= todoCount; i++) {
    await contract.methods.todos(i).call(
      {
        from: userAccount,
      },
      function(err, result) {
        if (err) {
          dispatch(
            "notificationModule/showModal",
            {
              description: err.message,
              display: true,
              type: "error",
            },
            { root: true }
          );
        } else {
          dispatch("userModule/getBlockCount", {}, { root: true });
          dispatch("userModule/getUserBalance", {}, { root: true });
          result.todo = myUtils.setUppercase(result.todo);
          let todoOwner = result.sender.toLowerCase();
          if (!result.completed && todoOwner === userAccount) {
            pendingTodos.push({
              id: result.id,
              todo: result.todo,
              completed: result.completed,
            });
          } else if (result.completed && todoOwner === userAccount) {
            completedTodos.push({
              id: result.id,
              todo: result.todo,
              completed: result.completed,
            });
          }
        }
      }
    );
  }
  commit("SET_PENDING_TODO", { pendingTodos });
  commit("SET_COMPLETED_TODO", { completedTodos });
};

export const submitTodo = async ({ dispatch, commit, state, rootState }) => {
  const userAccount = rootState.userModule.user.userAccount;
  const contract = rootState.contracts.todoContract;
  await contract.methods
    .createTodo(state.todo.newTodo)
    .send({
      from: userAccount,
    })
    .then((tx) => {
      const isMined = tx.events.TodoCreated.type;
      if (isMined === "mined") {
        dispatch(
          "notificationModule/showToast",
          {
            description: isMined,
            display: true,
            type: "success",
          },
          { root: true }
        );
      } else {
        dispatch(
          "notificationModule/showModal",
          {
            description: isMined,
            display: true,
            type: "error",
          },
          { root: true }
        );
      }
      dispatch("getTodos");
    })
    .catch((err) => {
      dispatch(
        "notificationModule/showModal",
        {
          description: err.message,
          display: true,
          type: "error",
        },
        { root: true }
      );
    });
  commit("CLEAR_NEW_TODO", { newTodo: "" });
};

export const toggleCompleted = async (
  { dispatch, commit, rootState },
  payload
) => {
  const userAccount = rootState.userModule.user.userAccount;
  const contract = rootState.contracts.todoContract;

  await contract.methods
    .toggleCompleted(payload)
    .send({
      from: userAccount,
    })
    .then((tx) => {
      const isMined = tx.events.TaskCompleted.type;
      if (isMined === "mined") {
        dispatch(
          "notificationModule/showToast",
          {
            description: isMined,
            display: true,
            type: "success",
          },
          { root: true }
        );
        dispatch("getTodos");
      } else {
        dispatch(
          "notificationModule/showModal",
          {
            description: isMined,
            display: true,
            type: "error",
          },
          { root: true }
        );
      }
      dispatch("getTodos");
    })
    .catch((err) => {
      dispatch(
        "notificationModule/showModal",
        {
          description: err.message,
          display: true,
          type: "error",
        },
        { root: true }
      );
      dispatch("getTodos");
    });
  commit("CLEAR_NEW_TODO", { newTodo: "" });
};

export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};
