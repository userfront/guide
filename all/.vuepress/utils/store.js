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

const demoMods = {
  "Signup form": "nkmbbm",
  "Login form": "alnkkd",
  "Password reset form": "dkbmmo",
  "Logout button": "kdbooo",
};

const store = new Vuex.Store({
  state: {
    accessToken: Userfront.accessToken(),
    tenants: [],
    usableTenants: [], // admin or member role
    demoTenant,
    demoToken: "uf_test_readonly_demo1234_2d87b3d230bda5685276b43efdac2852",
    activeTenant: JSON.parse(JSON.stringify(demoTenant)),
    tenantToken: "",
    loadingToken: false,
    installation: {
      tenantId: demoTenant.tenantId,
      mods: JSON.parse(JSON.stringify(demoMods)),
    },
    loadingInstallation: false,
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
      if (tenant.tenantId === state.demoTenant.tenantId) {
        Vue.set(state, "tenantToken", state.demoToken);
      }
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
    setInstallation(state, { tenantId, mods }) {
      if (!tenantId || !mods) return;
      const modNames = [
        "Signup form",
        "Login form",
        "Password reset form",
        "Logout button",
      ];
      // Require all the mods to be present in order for the
      // installation object to be updated.
      const modsToAdd = {};
      for (let i = 0; i < modNames.length; i++) {
        let modMatch;
        mods.map((mod) => {
          if (mod.displayTitle === modNames[i]) {
            modMatch = mod;
          }
        });
        if (!modMatch) return;
        modsToAdd[modNames[i]] = modMatch.eid;
      }

      Vue.set(state, "installation", {
        tenantId,
        mods: modsToAdd,
      });
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
        if (!tenant && localStorage.activeTenant) {
          try {
            tenant = JSON.parse(localStorage.activeTenant);
          } catch (error) {
            tenant = undefined;
          }
        }
        tenant ||= authorization[tenantIds[0]];
        if (!tenant) return;
        const tenantId = tenant.tenantId || tenantIds[0];
        await dispatch("setTenantToken", tenantId);
        commit("setTenants");
        commit("setUsableTenants");
        commit("setActiveTenant", tenant);
        await dispatch("setInstallationTenant", tenantId);
        localStorage.activeTenant = JSON.stringify(tenant);
      } catch (error) {
        delete localStorage.activeTenant;
      }
    },

    async setTenantToken({ commit, state }, tenantId) {
      try {
        if (state.tenantToken.includes(tenantId) || state.loadingToken) return;
        const authorization = getAuthorizationObject();
        tenantId = tenantId || Object.keys(authorization)[0];
        const tokenLevel = authorization[tenantId].roles.includes("admin")
          ? "admin"
          : "readonly";
        state.loadingToken = true;
        // Return if the tenant token is already set
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

    /**
     * Set the installation object based on tenantId, unless the tenantId
     * is the one already in use.
     *
     * @param {String} tenantId
     */
    async setInstallationTenant({ commit, state }, tenantId) {
      if (
        state.installation.tenantId === tenantId ||
        state.loadingInstallation
      ) {
        return;
      }
      state.loadingInstallation = true;
      try {
        const { data } = await axios.get(
          `https://api.userfront.com/v0/tenants/${tenantId}/mods`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        commit("setInstallation", { tenantId, mods: data.results });
        state.loadingInstallation = false;
      } catch (error) {
        state.loadingInstallation = false;
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
