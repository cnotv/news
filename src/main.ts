import { createApp } from 'vue'

import './registerServiceWorker'
import { router } from './router'
import { store } from './store'
import { mixins } from './mixins'

import App from './App.vue'

// import * as Sentry from '@sentry/vue'
// import { Integrations as Tracing } from '@sentry/tracing'

const app = createApp({
  ...App,
  mixins: [mixins],
})

app.use(store)
app.use(router)

app.mount('#app')

// Sentry.init({
//   app,
//   dsn: 'https://f908d5c000ea4ffa87f6484a4c286732@sentry.io/1472388',
//   integrations: [
//     new Tracing.BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracingOrigins: ['cnotv-news.netlify.app', /^\//],
//     }),
//   ],
//   tracesSampleRate: 0.2,
//   environment: process.env.NODE_ENV,
//   release: process.env.VERSION,
// })
