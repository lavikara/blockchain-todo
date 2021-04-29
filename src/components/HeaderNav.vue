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
            <li v-if="user.userAccount">
              <p>User</p>
              <h3>{{ user.userAccount }}</h3>
            </li>
            <li v-if="user.userBalance">
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
  padding: 3rem 0 1rem 0;
  margin-bottom: 2rem;
  z-index: 10;

  @media screen and (max-width: 1200px) {
    padding: 3rem 5rem 1rem 5rem;
  }

  @media screen and (max-width: 680px) {
    padding: 3rem 1rem 1rem 1rem;
  }

  .left-side {
    flex: 1;

    @media screen and (max-width: 1200px) {
      flex: 3;
    }

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
    flex: 1;

    .logo-container {
      .profile-dropdown {
        position: relative;

        input[type="checkbox"] {
          position: absolute;
          top: -1.4rem;
          right: 0.3rem;
          width: 2rem;
          height: 2rem;
          opacity: 0;
          cursor: pointer;

          &:checked {
            & ~ ul {
              display: flex;
              flex-direction: column;
            }
          }
        }

        .logo {
          position: absolute;
          top: -1.6rem;
          right: 0rem;
          z-index: -10;
        }

        ul {
          position: absolute;
          top: 100%;
          right: 0;
          display: none;
          list-style: none;
          background: var(--magenta);
          padding: 1rem 0;
          margin-top: 2rem;
          border-radius: 10px;
          // white-space: nowrap;
          overflow: hidden;
          // text-overflow: ellipsis;

          @media screen and (max-width: 680px) {
            width: 90vw;
          }

          li {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0.5rem 2rem;

            p {
              color: var(--offWhite);
            }

            h3 {
              text-align: left;
              color: var(--offWhite);
              font-weight: 500;

              @media screen and (max-width: 680px) {
                font-size: 1rem;
                -ms-word-break: break-all;
                word-break: break-all;
                word-break: break-word;
              }
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
