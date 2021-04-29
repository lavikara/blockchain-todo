<template>
  <div id="header-nav" class="container">
    <div class="left-side">
      <ul>
        <li>
          {{ contractName }}
        </li>
        <li v-if="user.userAccount">
          <router-link to="/"> Hi, {{ user.userName }} </router-link>
        </li>
        <li v-if="!user.userAccount">
          <router-link to="/register">
            Register
          </router-link>
        </li>
      </ul>
    </div>
    <div class="right-side">
      <div class="logo-container">
        <div class="profile-dropdown">
          <input type="checkbox" id="profile2" />
          <img alt="Vue logo" class="logo" src="@/assets/img/logo.png" />
          <ul>
            <li>
              <p>User</p>
              <h3>{{ user.userAccount }}</h3>
            </li>
            <li>
              <p>Balance</p>
              <h3>{{ user.userBalance }} ETH</h3>
            </li>
            <li>
              <p>Chain</p>
              <h3>{{ user.chainId }}</h3>
            </li>
            <li>
              <p>Block count</p>
              <h3>{{ user.blockCount }}</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderNavComponent",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.userModule.user,
      contractName: (state) => state.contractName,
    }),
  },
};
</script>

<style lang="scss" scoped>
#header-nav {
  @include fadeIn;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  z-index: 10;

  .left-side {
    ul {
      display: flex;

      li {
        margin: 0 1rem;
        cursor: pointer;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .right-side {
    .logo-container {
      .profile-dropdown {
        position: relative;

        input[type="checkbox"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 2rem;
          height: 2rem;
          opacity: 0;
          cursor: pointer;

          &:checked {
            & ~ ul {
              display: block;
            }
          }
        }

        ul {
          position: absolute;
          top: 100%;
          right: 0;
          display: none;
          list-style: none;
          background: var(--magenta);
          padding: 1rem 0;
          border-radius: 10px;

          li {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0.5rem 2rem;

            p {
              color: var(--offWhite);
            }

            h3 {
              color: var(--offWhite);
              font-weight: 500;
            }
          }
        }
      }
    }

    .logo {
      width: 3rem;
    }
  }
}
</style>
