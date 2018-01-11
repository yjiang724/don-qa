import Vue from 'vue'
import Init from './lib/init'

const components = [
  Init
]

const install = function(Vue, opts = {}) {
  if (install.installed) return
  
  components.map(component => {
    Vue.component(component.name, component)
  })

  // Object.keys(components).forEach(key => Vue.component(key, components[key]));
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { 
  Init
}

export default {
  version: '0.0.6',
  install,
  Init
}
