import todos from "../../contract/build/contracts/TodoContract.json";
const contractAddress = todos.networks[5777].address;
const abi = todos.abi;

export default {
  contract: () => {
    return new web3.eth.Contract(abi, contractAddress);
  },
};
