import Vue from 'vue'
import Index from '@/pages/index'

describe('Index.vue', () => {
  const Constructor = Vue.extend(Index);

  const vm = new Constructor().$mount();

  const select = vm.$el.querySelector('select');

  it('displays items from the citylist', () => {
    expect(select.textContent).contain('Sydney');
  })
  it('change city on select',()=>{
    const changeEvent = new window.Event('change');

    select.dispatchEvent(changeEvent);
    vm._watcher.run();
    expect(vm.$el.querySelector('.wind').textContent).to.contain('8');
  })
})
