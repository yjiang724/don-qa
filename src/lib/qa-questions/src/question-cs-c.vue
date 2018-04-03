<template>
  <div class="don-qa-question-cs-c" v-if="!fill">
    <don-qa-question-wrap label="题目序号">
      <pku-input
        class="wrap-input"
        ref="input"
        @change="onInputEventHandler"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="问题组">
      <pku-select
        class="wrap-select"
        selected="选择问题组"
        :list="array"
        importKey="quesText"
        exportKey="questionId"
        @callback="onGroupEventHandler"></pku-select>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题干">
      <pku-select
        class="wrap-select"
        selected="访员是否完整读完出题干？"
        :list="questions"
        :html="true"
        importKey="quesText"
        exportKey="questionId"
        @callback="onQuestionEventHandler"></pku-select>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-radio
        importKey="name"
        exportKey="id"
        :disabled="true"
        :message="options"></pku-radio>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-button
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': questionID * groupID * inputSn.length === 0}"
        :disabled="questionID * groupID * inputSn.length === 0"
        @callback="onSubmitEventHandler"></pku-button>
    </don-qa-question-wrap>
  </div>
  <div class="don-qa-question-cs-c" v-else>
    <pku-radio
      importKey="name"
      exportKey="id"
      :disabled="false"
      :message="options">
    </pku-radio>
  </div>
</template>

<script>
export default {
  name: 'donQuestionCsC',
  props: {
    array: {
      type: Array,
      default () {
        return ['题目1', '题目2', '题目3']
      }
    },
    questions: {
      type: Array,
      default () {
        return ['题目1', '题目2', '题目3']
      }
    },
    options: {
      type: Array,
      default () {
        return [
          { name: '是', key: 1 },
          { name: '否', key: 5 }
        ]
      }
    },
    res: {
      type: Object,
      default () {
        return null
      }
    },
    fill: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      groupID: 0,
      questionID: 0,
      group: undefined,
      question: undefined,
      inputSn: ''
    }
  },
  mounted () {
    if (this.fill && this.res) {
      this.res.quesOptions.forEach((item, index) => {
        if (item !== null) {
          this.$children[0].$data.value = index
        }
      })
    }
  },
  methods: {
    onInputEventHandler (val) {
      this.inputSn = val
    },
    onGroupEventHandler (val) {
      if (val) {
        this.group = val
        this.groupID++
        this.$emit('groupChange', val)
      }
    },
    onQuestionEventHandler (val) {
      if (val) {
        this.question = val
        this.questionID++
      }
    },
    onSubmitEventHandler () {
      let content = this.questions.filter(item => item.questionId === this.question)
      this.$emit('callback', {
        'QuesOptionValues': '1,5',
        'QuesOptionTexts': '是,否',
        'questionID': this.question,
        'questionContent': content[0].quesText + ' 一题，访员是否完整读出题干？',
        'questionSn': this.inputSn,
        'QuesType': '3002'
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-cs-c >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
