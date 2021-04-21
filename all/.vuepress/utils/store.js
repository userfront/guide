import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Userfront from "@userfront/core";
Vue.use(Vuex);
Userfront.init("p9ny8bdj");

const store = new Vuex.Store({
  state: {
    accessToken: Userfront.accessToken(),
    projects: [],
    usableProjects: [], // admin or member role
    activeProject: {},
    projectToken: "",
    // webhookToken: "",
  },
  mutations: {
    setProjects(state) {
      try {
        const authorization = getAuthorizationObject();
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
    /**
     * Usable projects have an admin or member role.
     */
    setUsableProjects(state) {
      const usableProjects = state.projects.filter(
        (project) =>
          project.roles &&
          (project.roles.includes("admin") || project.roles.includes("member"))
      );
      Vue.set(state, "usableProjects", usableProjects);
    },
    setProjectToken(state, projectToken) {
      state.projectToken = projectToken;
    },
    // setWebhookToken(state, webhookToken) {
    //   state.webhookToken = webhookToken;
    // },
  },
  actions: {
    async setActiveProject({ commit, dispatch }, project) {
      try {
        const authorization = getAuthorizationObject();
        const projectIds = Object.keys(authorization);
        project = project || authorization[projectIds[0]];
        const tenantId = project.tenantId || projectIds[0];
        await dispatch("setProjectToken", tenantId);
        commit("setProjects");
        commit("setUsableProjects");
        commit("setActiveProject", project);
      } catch (error) {}
    },

    async setProjectToken({ commit, state }, tenantId) {
      try {
        const authorization = getAuthorizationObject();
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

    // async setWebhookToken({ commit, state }, tenantId) {
    //   try {
    //     const authorization = getAccessTokenObject().authorization;
    //     tenantId = tenantId || Object.keys(authorization)[0];
    //     const tokenLevel = authorization[tenantId].roles.includes("admin")
    //       ? "admin"
    //       : "readonly";
    //     const { data } = await axios.get(
    //       `https://api.userfront.com/v0/tenants/${tenantId}/tokens/webhook?test=true`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${state.accessToken}`,
    //         },
    //       }
    //     );
    //     commit("setWebhookToken", data.liveWebhook);
    //     return data.liveWebhook;
    //   } catch (error) {
    //     return;
    //   }
    // },
  },
});

const getAccessTokenObject = () => {
  try {
    const accessToken = Userfront.accessToken();
    if (!accessToken) return;
    return JSON.parse(atob(accessToken.split(".")[1]));
  } catch (error) {
    return;
  }
};

const getAuthorizationObject = () => {
  const accessTokenObject = getAccessTokenObject();
  return accessTokenObject ? accessTokenObject.authorization : {};
};

export default store;
