<template>
  <div id="register" class="container">
    <h2>Enter user name to register</h2>
    <div class="user-name-container">
      <label class="label" for="text-input">User name</label>
      <form class="form" action="" @submit.prevent="registerUser()">
        <input
          class="input"
          id="text-input"
          type="text"
          v-model="user.userName"
          @keypress="detectKey"
          required
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "RegisterComponent",

  data() {
    return {
      whiteSpace: /^\s+$/,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.userModule.user,
    }),
  },

  methods: {
    ...mapActions("userModule", ["registerUser"]),
    detectKey(event) {
      if (
        (event.which === 13 && event.target.value.match(this.whiteSpace)) ||
        (event.which === 13 && !event.target.value)
      ) {
        return;
      } else if (
        event.which === 13 &&
        !event.target.value.match(this.whiteSpace)
      ) {
        event.target.form.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
        event.preventDefault();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#register {
  h2 {
    margin-bottom: 3rem;
  }
  .user-name-container {
    width: 30%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
      width: 60%;
    }

    @media screen and (max-width: 680px) {
      width: 90%;
    }

    .label {
      color: var(--labelColor);
      margin-bottom: 0.5rem;
    }

    .form {
      @include fadeIn;
      width: 100%;

      .input {
        width: 100%;
        font-size: 16px;
        font-size: 1.2rem;
        font-family: inherit;
        padding: 0.25em 0.5em;
        background-color: var(--offWhite);
        border: 1px solid var(--borderColor);
        border-radius: 4px;
      }
    }

    .input:focus {
      box-shadow: 0 0 0 1px
        hsla(
          var(--input-focus-h),
          var(--input-focus-s),
          calc(var(--input-focus-l) + 40%),
          0.7
        );
    }
  }
}
</style>
