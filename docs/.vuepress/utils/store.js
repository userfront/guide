import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Userfront from "@userfront/core";
Vue.use(Vuex);
Userfront.init("p9ny8bdj");

const getAccessTokenObject = () => {
  try {
    const accessToken = Userfront.accessToken();
    if (!accessToken) return;
    return JSON.parse(atob(accessToken.split(".")[1]));
  } catch (error) {
    return;
  }
};

const store = new Vuex.Store({
  state: {
    accessToken: Userfront.accessToken(),
    projects: [],
    activeProject: {},
    projectToken: "",
    webhookToken: "",
  },
  mutations: {
    setProjects(state) {
      try {
        const authorization = getAccessTokenObject().authorization;
        const projects = Object.keys(authorization).map(
          (key) => authorization[key]
        );
        Vue.set(state, "projects", projects);
      } catch (error) {
        Vue.set(state, "projects", []);
      }
    },
    setActiveProject(state, project) {
      Vue.set(state, "activeProject", project);
    },
    setProjectToken(state, projectToken) {
      state.projectToken = projectToken;
    },
    setWebhookToken(state, webhookToken) {
      state.webhookToken = webhookToken;
    },
  },
  actions: {
    async setActiveProject({ commit, dispatch }, project) {
      const authorization = getAccessTokenObject().authorization;
      const projectIds = Object.keys(authorization);
      project = project || authorization[projectIds[0]];
      const tenantId = project.tenantId || projectIds[0];
      await dispatch("setProjectToken", tenantId);
      await dispatch("setWebhookToken", tenantId);
      commit("setProjects");
      commit("setActiveProject", project);
    },

    async setProjectToken({ commit, state }, tenantId) {
      try {
        const authorization = getAccessTokenObject().authorization;
        tenantId = tenantId || Object.keys(authorization)[0];
        const tokenLevel = authorization[tenantId].roles.includes("admin")
          ? "admin"
          : "readonly";
        const { data } = await axios.get(
          `https://api.userfront.com/v0/tenants/${tenantId}/tokens/${tokenLevel}?test=true`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        const tokenName = tokenLevel === "admin" ? "liveAdmin" : "liveReadonly";
        commit("setProjectToken", data[tokenName]);
        return data[tokenName];
      } catch (error) {
        return;
      }
    },

    async setWebhookToken({ commit, state }, tenantId) {
      try {
        const authorization = getAccessTokenObject().authorization;
        tenantId = tenantId || Object.keys(authorization)[0];
        const tokenLevel = authorization[tenantId].roles.includes("admin")
          ? "admin"
          : "readonly";
        const { data } = await axios.get(
          `https://api.userfront.com/v0/tenants/${tenantId}/tokens/webhook?test=true`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        commit("setWebhookToken", data.liveWebhook);
        return data.liveWebhook;
      } catch (error) {
        return;
      }
    },
  },
});

export default store;
