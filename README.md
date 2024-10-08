[![Netlify Status](https://api.netlify.com/api/v1/badges/5d30be00-bed2-4c64-8f22-9f868a44d104/deploy-status)](https://app.netlify.com/sites/cnotv-news/deploys)
[![codecov](https://codecov.io/gh/cnotv/news/branch/master/graph/badge.svg)](https://codecov.io/gh/cnotv/news)

# cnotv-news

News aggregator based on Reddit API, Vue.js and PWA

## Todo

- [ ] Service worker to inform of new posts with refresh button
- [ ] Add Open ID SSO and OAuth with Firebase
- [ ] Posts options per subredddit
- [ ] Inline SVG
- [ ] Add share button with [Share API](https://web.dev/web-share/)
- [ ] Slide to next menu with transition
- [ ] Menu transition
- [ ] Create plugins out of swipe behavior
- [ ] Add Travis or Circle.ci configuration for CI pipes
- [ ] Add models and types for all the missing cases
- [ ] Complete unit testing
- [ ] Add push notifications for new posts
- [ ] Add dark mode using CSS variables and or theme class
- [ ] Rewrite layout with CSS grids
- [ ] Use parameters over query string
- [ ] Add factories
- [ ] Add e2e tests

- [x] Store posts in local storage
- [x] Add pull to refresh
- [x] Mobile header with current menu
- [x] Add comments number
- [x] Make header fixed
- [x] Display subheader only when changing settings
- [x] Create infinite scroll appending elements
- [x] Integrate Sentry
- [x] Integrate Hotjar
- [x] Add PWA files from the vue.config
- [x] Add pull to refresh transitions
- [x] Convert code to typescript compliant
- [x] Improve subreddit search

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
