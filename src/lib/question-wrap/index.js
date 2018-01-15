import donQaQuestionWrap from './../questions/src/question-wrap.vue'

/* istanbul ignore next */
donQaQuestionWrap.install = function(Vue) {
  Vue.component(donQaQuestionWrap.name, donQaQuestionWrap);
};

export default donQaQuestionWrap
