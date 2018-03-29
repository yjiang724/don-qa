import Vue from 'vue'
import QaInit from './lib/qa-init'
import QaFill from './lib/qa-fill'
import QaWrap from './lib/qa-wrap'
import QaLogic from './lib/qa-logic'
import QaWelcome from './lib/qa-welcome'
import QuestionCsA from './lib/qa-questions/question-cs-a'
import QuestionCsB from './lib/qa-questions/question-cs-b'
import QuestionCsC from './lib/qa-questions/question-cs-c'
import QuestionCsD from './lib/qa-questions/question-cs-d'
import QuestionCsE from './lib/qa-questions/question-cs-e'
import QuestionCsF from './lib/qa-questions/question-cs-f'
import QuestionCsG from './lib/qa-questions/question-cs-g'
import QuestionCsH from './lib/qa-questions/question-cs-h'
import QuestionCsI from './lib/qa-questions/question-cs-i'
import QuestionCsJ from './lib/qa-questions/question-cs-j'
import QuestionInput from './lib/qa-questions/question-input'
import QuestionRate from './lib/qa-questions/question-rate'
import QuestionSelect from './lib/qa-questions/question-select'

const components = [
  QaInit,
  QaWrap,
  QaLogic,
  QaWelcome,
  QaFill,
  QuestionCsA,
  QuestionCsB,
  QuestionCsC,
  QuestionCsD,
  QuestionCsE,
  QuestionCsF,
  QuestionCsG,
  QuestionCsH,
  QuestionCsI,
  QuestionCsJ,
  QuestionInput,
  QuestionRate,
  QuestionSelect
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
  QaInit,
  QaWrap,
  QaLogic,
  QaWelcome,
  QaFill,
  QuestionCsA,
  QuestionCsB,
  QuestionCsC,
  QuestionCsD,
  QuestionCsE,
  QuestionCsF,
  QuestionCsG,
  QuestionCsH,
  QuestionCsI,
  QuestionCsJ,
  QuestionInput,
  QuestionRate,
  QuestionSelect
}

export default {
  version: '0.0.6',
  install,
  QaInit,
  QaWrap,
  QaLogic,
  QaWelcome,
  QaFill,
  QuestionCsA,
  QuestionCsB,
  QuestionCsC,
  QuestionCsD,
  QuestionCsE,
  QuestionCsF,
  QuestionCsG,
  QuestionCsH,
  QuestionCsI,
  QuestionCsJ,
  QuestionInput,
  QuestionRate,
  QuestionSelect
}
