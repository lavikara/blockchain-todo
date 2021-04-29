import myUtils from "../../utils/myUtils";
import router from "../../router";

export const getUserAccount = async ({ dispatch, commit, rootState }) => {
  const accounts = await ethereum.request({
    method: "eth_accounts",
  });
  const userAddress = accounts[0];
  const contract = rootState.contracts.userContract;
  await contract.methods.users(userAddress).call(function(err, result) {
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
    } else if (result.userAddress.includes("0x0")) {
      dispatch(
        "notificationModule/showModal",
        {
          description: "Login or signup to start storing todos",
          display: true,
          type: "error",
        },
        { root: true }
      );
      commit("SET_USER_ACCOUNT", { userAccount: "" });
      router.push("/register");
      dispatch("getContractName", {}, { root: true });
      commit("SET_USER_BALANCE", { userBalance: "" });
      dispatch("getBlockCount");
      dispatch("setChain");
      dispatch("setLoading", false, { root: true });
      return;
    } else {
      const userAccount = result.userAddress.toLowerCase();
      const userName = myUtils.setUppercase(result.userName);
      commit("SET_USER_ACCOUNT", { userAccount });
      commit("SET_USER_NAME", { userName });
      router.push("/");
    }
    dispatch("getBlockCount");
    dispatch("getUserBalance");
    dispatch("setChain");
    dispatch("todoModule/getTodos", {}, { root: true });
    dispatch("setLoading", false, { root: true });
    dispatch("getContractName", {}, { root: true });
  });
};

export const getUserBalance = async ({ dispatch, commit, state }) => {
  if (!state.user.userAccount) {
    return;
  }
  await web3.eth.getBalance(state.user.userAccount, function(err, newBalance) {
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
      const userBalance = parseFloat(web3.utils.fromWei(newBalance, "ether"));
      commit("SET_USER_BALANCE", { userBalance });
    }
  });
};

// export const registerUser = async ({ dispatch, commit, state }) => {
//   commit("SET_LOADING", true, { root: true });
//   await web3.eth.getBalance(state.user.userAccount, function(err, newBalance) {
//     if (err) {
//       dispatch(
//         "notificationModule/showModal",
//         {
//           description: err.message,
//           display: true,
//           type: "error",
//         },
//         { root: true }
//       );
//     } else {
//       const userBalance = parseFloat(web3.utils.fromWei(newBalance, "ether"));
//       commit("SET_USER_BALANCE", { userBalance });
//     }
//   });
//   commit("SET_LOADING", false, { root: true });
// };

export const getBlockCount = async ({ commit }) => {
  const blockCount = await web3.eth.getBlockNumber();
  commit("SET_BLOCK_COUNT", { blockCount });
};

export const setChain = async ({ dispatch, commit }) => {
  let chainId = await ethereum.request({
    method: "eth_chainId",
  });
  switch (chainId) {
    case "0x1":
      chainId = "Ethereum Main Network (Mainnet)";
      break;
    case "0x3":
      chainId = "Ropsten Test Network";
      break;
    case "0x4":
      chainId = "Rinkeby Test Network";
      break;
    case "0x5":
      chainId = "Goerli Test Network";
      break;
    case "0x2a":
      chainId = "Kovan Test Network";
      break;
    case "0x539":
      chainId = "Ganache Local Network";
      break;

    default:
      chainId = "Unknown Network";
      break;
  }
  commit("SET_CHAIN", { chainId });
  dispatch("getUserBalance");
};

export const setUserAccount = ({ dispatch, commit }, userAccount) => {
  commit("SET_USER_ACCOUNT", { userAccount });
  dispatch("getUserAccount");
  dispatch("todoModule/getTodos", {}, { root: true });
};

export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};
