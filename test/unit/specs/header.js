import Vue from 'vue'
import header from '@/components/header'

describe('header.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(header)
    const vm = new Constructor().$mount()
    expect(!!vm.$el.querySelector('header')).to.be(true)
  })
})
