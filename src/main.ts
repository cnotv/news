import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { router } from "./router";
import { store } from "./store";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://f908d5c000ea4ffa87f6484a4c286732@sentry.io/1472388",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],

  environment: process.env.NODE_ENV,
  release: process.env.VERSION,
});

const app = createApp({
  ...App,
  mixins: [App.mixin],
});

app.use(store);
app.use(router);

app.mount("#app");

Sentry.init({
  app,
  // ...
});
