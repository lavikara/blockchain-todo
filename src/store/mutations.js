export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const SET_USER_CONTRACT = (state, payload) => {
  state.contracts.userContract = payload;
};

export const SET_TODO_CONTRACT = (state, payload) => {
  state.contracts.todoContract = payload;
};

export const SET_MAIN_CONTRACT = (state, payload) => {
  state.contracts.mainContract = payload;
};

export const CONTRACT_NAME = (state, payload) => {
  state.contractName = payload;
};
