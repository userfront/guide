import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Userfront from "@userfront/core";
Vue.use(Vuex);
Userfront.init("p9ny8bdj");

const demoTenant = {
  tenantId: "demo1234",
  name: "Demo account",
  roles: [],
  permissions: [],
};

const store = new Vuex.Store({
  state: {
    accessToken: Userfront.accessToken(),
    tenants: [],
    usableTenants: [], // admin or member role
    demoTenant,
    activeTenant: JSON.parse(JSON.stringify(demoTenant)),
    tenantToken: "",
    loadingToken: false,
    // webhookToken: "",
  },
  mutations: {
    setTenants(state) {
      try {
        const authorization = getAuthorizationObject();
        const tenants = Object.keys(authorization)
          .map((key) => authorization[key])
          .filter((obj) => obj.tenantId !== "p9ny8bdj");
        Vue.set(state, "tenants", tenants);
      } catch (error) {
        Vue.set(state, "tenants", []);
      }
    },
    setActiveTenant(state, tenant) {
      Vue.set(state, "activeTenant", tenant);
    },
    /**
     * Usable tenants have an admin or member role.
     */
    setUsableTenants(state) {
      const usableTenants = state.tenants.filter(
        (tenant) =>
          tenant.roles &&
          (tenant.roles.includes("admin") || tenant.roles.includes("member"))
      );
      Vue.set(state, "usableTenants", usableTenants);
    },
    setTenantToken(state, tenantToken) {
      Vue.set(state, "tenantToken", tenantToken);
    },
    // setWebhookToken(state, webhookToken) {
    //   state.webhookToken = webhookToken;
    // },
  },
  actions: {
    async setActiveTenant({ commit, dispatch }, tenant) {
      try {
        const authorization = getAuthorizationObject();
        const tenantIds = Object.keys(authorization);
        if (!tenantIds || tenantIds.length < 1) return;
        tenant = tenant || authorization[tenantIds[0]];
        if (!tenant) return;
        const tenantId = tenant.tenantId || tenantIds[0];
        await dispatch("setTenantToken", tenantId);
        commit("setTenants");
        commit("setUsableTenants");
        commit("setActiveTenant", tenant);
      } catch (error) {}
    },

    async setTenantToken({ commit, state }, tenantId) {
      try {
        const authorization = getAuthorizationObject();
        tenantId = tenantId || Object.keys(authorization)[0];
        const tokenLevel = authorization[tenantId].roles.includes("admin")
          ? "admin"
          : "readonly";
        state.loadingToken = true;
        const { data } = await axios.get(
          `https://api.userfront.com/v0/tenants/${tenantId}/tokens/${tokenLevel}?test=true`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        const tokenName = tokenLevel === "admin" ? "liveAdmin" : "liveReadonly";
        commit("setTenantToken", data[tokenName]);
        state.loadingToken = false;
        return data[tokenName];
      } catch (error) {
        state.loadingToken = false;
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
