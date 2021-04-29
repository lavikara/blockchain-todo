<template>
  <transition name="show">
    <div class="toast-container" v-if="display">
      <div class="toast">
        <img
          v-show="alert == 'success'"
          src="@/assets/img/success.svg"
          alt="success icon"
        />
        <img
          v-show="alert == 'error'"
          src="@/assets/img/error.svg"
          alt="error icon"
        />
        <img
          v-show="alert == 'info'"
          src="@/assets/img/info.svg"
          alt="info icon"
        />
        <p>
          {{ description }}
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ToastComponent",
  computed: {
    ...mapState("notificationModule", {
      alert: (state) => state.toast.type,
      description: (state) => state.toast.description,
      display: (state) => state.toast.display,
    }),
  },

  methods: {
    ...mapActions("notificationModule", ["showToast"]),
  },

  watch: {
    display(val) {
      if (val === true) {
        setTimeout(() => {
          this.showToast({
            description: "",
            display: false,
            type: "",
          });
        }, 1500);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.toast-container {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 20%);
  z-index: 1000;

  @media screen and (max-width: 600px) {
    width: 80%;
  }

  svg {
    width: 1.5rem;
    height: 1rem;
  }
  .toast {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2rem;
    color: #000000;
    background-color: #ffffff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

    p {
      font-family: Graphik;
      font-size: 1.1rem;
      margin-left: 0.3rem;

      @media screen and (max-width: 600px) {
        font-size: 1rem;
      }
    }
  }
}

.show-enter-active,
.show-leave-active {
  transition: all 0.5s cubic-bezier(0.45, 0.25, 0.6, 0.95);
}

.show-enter,
.show-leave-to {
  transform: translate(-50%, -10px);
  opacity: 0;
}
</style>
