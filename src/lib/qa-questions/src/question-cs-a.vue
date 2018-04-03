<template>
  <div class="don-qa-question-cs-a" v-if="!fill">
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
      <component
        class="wrap-select"
        :is="reWriteName"
        selected="访员是否提问了下面这一题相关内容？"
        importKey="quesText"
        exportKey="questionId"
        ref="host"
        :style="{width: reWrite ? '80%' : 'unset'}"
        :list="questions"
        :html="true"
        @callback="onQuestionEventHandler">
      </component>
      <!-- <pku-select
        class="wrap-select"
        selected="访员是否提问了下面这一题相关内容？"
        importKey="quesText"
        exportKey="questionId"
        ref="host"
        :style="{width: reWrite ? '80%' : 'unset'}"
        :list="questions"
        :html="true"
        @callback="onQuestionEventHandler"></pku-select> -->
      <pku-edit v-if="reWrite && this.question" :showFunc="showFunc" :cancelFunc="cancelFunc" :submitFunc="submitFunc"></pku-edit>
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
  <div class="don-qa-question-cs-a" v-else>
     <pku-radio
        importKey="name"
        exportKey="id"
        :disabled="false"
        :message="options"></pku-radio>
  </div>
</template>

<script>
export default {
  name: 'donQuestionCsA',
  props: {
    reWrite: {
      type: Boolean,
      default: false
    },
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
      reWriteName: 'pkuSelect',
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
    showFunc () {
      let tmp = this.questions.filter(item => item.questionId === this.question)
      this.reWriteName = 'pkuInput'
      this.$nextTick(() => {
        this.$refs.host.value = tmp[0].quesText
      })
    },
    submitFunc () {
      this.reWriteName = 'pkuSelect'
    },
    cancelFunc () {
      this.reWriteName = 'pkuSelect'
      let tmp = this.questions.filter(item => item.questionId === this.question)
      this.$nextTick(() => {
        this.$refs.host.value = tmp[0].quesText || '访员是否提问了下面这一题相关内容？'
      })
    },
    onInputEventHandler (val) {
      this.inputSn = val
    },
    onGroupEventHandler (val) {
      if (val) {
        this.group = val
        this.groupID++
        if (this.reWrite) {
          this.reWriteName = 'pkuSelect'
        }
        this.$refs.host.reset()
        this.question = undefined
        this.questionID = 0
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
        'QuesOptionValues': '1,5,9',
        'QuesOptionTexts': '是,否,无法判断',
        'questionID': this.question,
        'questionContent': '访员是否提问了 ' + content[0].quesText + ' 一题相关内容？',
        'questionSn': this.inputSn, 'QuesType': '3000'
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-cs-a >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
