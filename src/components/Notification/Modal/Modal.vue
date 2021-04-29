<template>
  <transition name="fade">
    <div class="modal" v-if="display" @click="clickTarget">
      <div class="modal-card">
        <div class="modal-card__close">
          <img
            src="@/assets/img/close.svg"
            alt="close icon"
            @click="closeModal"
          />
        </div>
        <div class="modal-card__content">
          <div class="icons">
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
          </div>
          <p>
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ModalComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState("notificationModule", {
      alert: (state) => state.modal.type,
      description: (state) => state.modal.description,
      display: (state) => state.modal.display,
    }),
  },

  methods: {
    ...mapActions("notificationModule", ["showModal"]),
    closeModal() {
      this.showModal({
        description: "",
        display: false,
        type: "",
      });
    },
    clickTarget() {
      if (event.target.className === "modal") {
        this.closeModal();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 1000;

  .modal-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 20rem;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 600px) {
      min-width: 80%;
    }

    &__close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: flex;
      justify-content: flex-end;

      img {
        cursor: pointer;
      }
    }

    &__content {
      display: flex;
      margin: 1rem auto 1rem auto;

      .icons {
        display: flex;
        justify-content: center;

        img {
          width: 3rem;
        }
      }

      p {
        max-width: 15rem;
        color: #000000;
        font-family: Graphik;
        font-size: 1.2rem;
        line-height: 1.6rem;
        // text-align: center;
        margin: auto;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.45, 0.25, 0.6, 0.95);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0%, -10px);
  opacity: 0;
}
</style>
