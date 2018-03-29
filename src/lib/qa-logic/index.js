import donQaLogic from './question-logic.vue'

/* istanbul ignore next */
donQaLogic.install = function(Vue) {
  Vue.component(donQaLogic.name, donQaLogic);
};

export default donQaLogic
