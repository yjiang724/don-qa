<template>
  <div class="don-qa-question-cs-b" v-if="!fill">
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
        selected="受访者是否回答了以下一题相关内容？"
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
  <div class="don-qa-question-cs-b" v-else>
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
  name: 'donQuestionCsB',
  props: {
    fill: {
      type: Boolean,
      default: false
    },
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
    res: {
      type: Object,
      default () {
        return null
      }
    },
    options: {
      type: Array,
      default () {
        return [
          { name: '是', key: 1 },
          { name: '否', key: 5 },
          { name: '无法判断', key: 9 }
        ]
      }
    }
  },
  data () {
    return {
      groupID: 0,
      questionID: 0,
      inputSn: '',
      group: undefined,
      question: undefined
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
    onSubmitEventHandler (val) {
      let content = this.questions.filter(item => item.questionId === this.question)
      this.$emit('callback', {
        'QuesOptionValues': '1,5,9',
        'QuesOptionTexts': '是,否,无法判断',
        'questionID': this.question,
        'questionContent': '受访者是否回答了 ' + content[0].quesText + ' 一题相关内容？',
        'questionSn': this.inputSn, 'QuesType': '3001'
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-cs-b >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
