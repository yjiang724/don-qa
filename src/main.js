import Vue from 'vue'
import Init from './lib/init'
import QuestionA from './lib/question-a'
import QuestionB from './lib/question-b'
import QuestionC from './lib/question-c'
import QuestionD from './lib/question-d'
import QuestionE from './lib/question-e'
import QuestionF from './lib/question-f'
import QuestionG from './lib/question-g'
import QuestionH from './lib/question-h'
import QuestionI from './lib/question-i'
import QuestionJ from './lib/question-j'
import QuestionWrap from './lib/question-wrap'
import QuestionLogic from './lib/question-logic'

const components = [
  Init,
  QuestionA,
  QuestionB,
  QuestionC,
  QuestionD,
  QuestionE,
  QuestionF,
  QuestionG,
  QuestionH,
  QuestionI,
  QuestionJ,
  QuestionWrap,
  QuestionLogic
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
  Init,
  QuestionA,
  QuestionB,
  QuestionC,
  QuestionD,
  QuestionE,
  QuestionF,
  QuestionG,
  QuestionH,
  QuestionI,
  QuestionJ,
  QuestionWrap,
  QuestionLogic
}

export default {
  version: '0.0.6',
  install,
  Init,
  QuestionA,
  QuestionB,
  QuestionC,
  QuestionD,
  QuestionE,
  QuestionF,
  QuestionG,
  QuestionH,
  QuestionI,
  QuestionJ,
  QuestionWrap,
  QuestionLogic
}
