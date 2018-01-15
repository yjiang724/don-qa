import donQaQuestionLogic from './../questions/src/question-logic.vue'

/* istanbul ignore next */
donQaQuestionLogic.install = function(Vue) {
  Vue.component(donQaQuestionLogic.name, donQaQuestionLogic);
};

export default donQaQuestionLogic
