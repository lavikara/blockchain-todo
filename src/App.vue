<template>
  <div v-if="!loading">
    <Toast />
    <Modal />
    <HeaderNav />
    <router-view />
  </div>
</template>

<script>
import Web3 from "web3";
import todos from "../contract/build/contracts/TodoContract.json";
import users from "../contract/build/contracts/UserContract.json";
import main from "../contract/build/contracts/MainContract.json";
import HeaderNav from "@/components/HeaderNav.vue";
import Toast from "@/components/Notification/Toast/Toast";
import Modal from "@/components/Notification/Modal/Modal";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    HeaderNav,
    Toast,
    Modal,
  },

  created() {
    this.connectChain();
  },

  computed: {
    ...mapState({
      user: (state) => state.userModule.user,
      loading: (state) => state.loading,
    }),
  },

  methods: {
    ...mapActions("userModule", [
      "getUserAccount",
      "setChain",
      "setUserAccount",
    ]),
    ...mapActions(["setUserContract", "setTodoContract", "setMainContract"]),

    async connectChain() {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }

      ethereum.on("chainChanged", () => {
        this.setChain();
      });

      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          alert("connect to metamask");
        } else {
          this.setUserAccount(accounts[0]);
        }
      });
      this.initContracts();
    },

    initContracts() {
      const todoContractAddress = todos.networks[5777].address;
      const todoAbi = todos.abi;
      const todoContract = new web3.eth.Contract(todoAbi, todoContractAddress);
      this.setTodoContract(todoContract);

      const userContractAddress = users.networks[5777].address;
      const userAbi = users.abi;
      const userContract = new web3.eth.Contract(userAbi, userContractAddress);
      this.setUserContract(userContract);

      const mainContractAddress = main.networks[5777].address;
      const mainAbi = main.abi;
      const mainContract = new web3.eth.Contract(mainAbi, mainContractAddress);
      this.setMainContract(mainContract);

      this.getUserAccount();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
