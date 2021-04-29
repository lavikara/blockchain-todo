<template>
  <div>
    <Toast />
    <Modal />
    <HeaderNav />
  </div>
  <router-view />
</template>

<script>
import Web3 from "web3";
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
    }),
  },

  methods: {
    ...mapActions("userModule", [
      "getUserAccount",
      "setChain",
      "setUserAccount",
    ]),

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
        } else if (accounts[0] !== this.user.userAccount) {
          this.setUserAccount(accounts[0]);
        }
      });
      this.getUserAccount();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
