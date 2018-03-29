import donQaWelcome from './qa-welcome.vue'

/* istanbul ignore next */
donQaWelcome.install = function(Vue) {
  Vue.component(donQaWelcome.name, donQaWelcome);
};

export default donQaWelcome
