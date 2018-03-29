import donQaInit from './qa-init.vue'

/* istanbul ignore next */
donQaInit.install = function(Vue) {
  Vue.component(donQaInit.name, donQaInit);
};

export default donQaInit
