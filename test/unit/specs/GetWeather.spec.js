import Vue from 'vue'
import Index from '@/pages/Index'

describe('Index.vue', () => {
  const Constructor = Vue.extend(Index);

  const vm = new Constructor().$mount();

  const select = vm.$el.querySelector('select');

  it('displays items from the citylist', () => {
    expect(select.textContent).contain('Sydney');
  })
})
