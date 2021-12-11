import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import { setContext } from "apollo-link-context";
const httpLink = createHttpLink({
  uri: "https://mision-tic-api-gateway-gym.herokuapp.com/",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem("token_access") || "",
    },
  };
});
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const apolloProvider = new createApolloProvider({
  defaultClient: apolloClient,
});

createApp(App)
  .use(router)
  .use(apolloProvider)
  // .use(BootstrapVue)
  .mount("#app");
