import { createStore } from "vuex";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import userModule from "./userModule/index";
import todoModule from "./todoModule/index";
import notificationModule from "./notificationModule/index";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    userModule,
    todoModule,
    notificationModule,
  },
});
