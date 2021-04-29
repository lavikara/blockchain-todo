export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};

export const setUserContract = ({ commit }, payload) => {
  commit("SET_USER_CONTRACT", payload);
};

export const setTodoContract = ({ commit }, payload) => {
  commit("SET_TODO_CONTRACT", payload);
};

export const setMainContract = ({ commit }, payload) => {
  commit("SET_MAIN_CONTRACT", payload);
};

export const getContractName = async ({ state, commit }) => {
  const contract = state.contracts.mainContract;
  let contractName = await contract.methods.contractName().call();
  commit("CONTRACT_NAME", contractName);
};
