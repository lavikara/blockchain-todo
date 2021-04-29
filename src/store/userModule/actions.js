export const getUserAccount = async ({ dispatch, commit }) => {
  commit("SET_LOADING", true, { root: true });
  const accounts = await ethereum.request({
    method: "eth_accounts",
  });
  const userAccount = accounts[0];
  commit("SET_USER_ACCOUNT", { userAccount });
  dispatch("getBlockCount");
  dispatch("getUserBalance");
  dispatch("setChain");
  commit("SET_LOADING", false, { root: true });
};

export const getUserBalance = async ({ dispatch, commit, state }) => {
  commit("SET_LOADING", true, { root: true });
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
  commit("SET_LOADING", false, { root: true });
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
  commit("SET_LOADING", true, { root: true });
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
  commit("SET_LOADING", false, { root: true });
};

export const setUserAccount = ({ dispatch, commit }, userAccount) => {
  commit("SET_LOADING", true, { root: true });
  commit("SET_USER_ACCOUNT", { userAccount });
  dispatch("getUserBalance");
  commit("SET_LOADING", false, { root: true });
};
