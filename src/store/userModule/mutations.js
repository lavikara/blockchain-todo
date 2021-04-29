export const SET_USER_BALANCE = (state, payload) => {
  state.user.userBalance = payload.userBalance;
};

export const SET_CHAIN = (state, payload) => {
  state.user.chainId = payload.chainId;
};

export const SET_USER_ACCOUNT = (state, payload) => {
  state.user.userAccount = payload.userAccount;
};

export const SET_BLOCK_COUNT = (state, payload) => {
  state.user.blockCount = payload.blockCount;
};
