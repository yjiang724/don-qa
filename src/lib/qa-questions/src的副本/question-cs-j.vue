<template>
  <div class="don-qa-question-cs-j" v-if="!fill">
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
        selected="下面这一题，受访者给出的答案是什么？"
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
        :message="inputOptions"></pku-radio>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-button
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': questionID * groupID * inputSn.length === 0}"
        :disabled="questionID * groupID * inputSn.length === 0"
        @callback="onSubmitEventHandler"></pku-button>
    </don-qa-question-wrap>
  </div>
  <div class="don-qa-question-cs-j" v-else>
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
  name: 'donQuestionCsJ',
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
      selected: 0,
      inputSn: '',
      select: undefined,
      inputOptions: this.options,
      QuesOptionValues: [],
      QuesOptionTexts: []
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
    // onQuestionEventHandler (val) {
    //   if (val) {
    //     this.question = val
    //     this.questionID++
    //   }
    // },
    onQuestionEventHandler (val) {
      let content = this.questions.filter(item => item.questionId === val)
      let arr = []
      if (content[0].optionTexts.length > 0) {
        content[0].optionTexts.forEach((item, index) => {
          this.QuesOptionTexts.push(item)
          this.QuesOptionValues.push(content[0].optionValues[index])
          arr.push({
            key: content[0].optionValues[index],
            name: item
          })
        })
      }
      if (val) {
        this.question = val
        this.questionID++
        this.inputOptions = arr.concat()
      }
    },
    onSubmitEventHandler () {
      let content = this.questions.filter(item => item.questionId === this.question)
      this.$emit('callback', {
        'QuesOptionValues': this.QuesOptionValues.toString(),
        'QuesOptionTexts': this.QuesOptionTexts.toString(), 
        'questionID': this.question, 
        'questionContent': content[0].quesText + ' 这一题，受访者给出的答案是什么？', 
        'questionSn': this.inputSn, 
        'QuesType': '3009'
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-cs-j >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
