import Vue from 'vue'

Vue.filter('img', str => str.match(/.*.(jpg|png|gif)/)[0])
Vue.filter('ampRemoval', str => str.replace('amp;s', 's'))
