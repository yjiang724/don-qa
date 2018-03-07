<template>
  <div>
    <don-qa-question-wrap label="题目序号">
      <pku-input
        class="wrap-input"
        :message="message"
        ref="input"
        @change="onInputEventHandler"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题干">
      <pku-select
        class="wrap-select"
        selected="访员是否提问了下面这一题相关内容？"
        :list="title"
        @callback="onSelectEventHandler"></pku-select>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题目选项">
      <pku-radio
        :disabled="true"
        :importKey="importKey"
        :exportKey="exportKey"
        :message="options"></pku-radio>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-button
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': selected * input.length === 0}"
        :disabled="selected * input.length === 0"
        @callback="onSubmitEventHandler"></pku-button>
    </don-qa-question-wrap>
  </div>
</template>

<script>
export default {
  name: 'donQuestionA',
  props: {
    message: {
      type: String,
      default () {
        return ''
      }
    },
    title: {
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
          { name: '否', key: 5 },
          { name: '无法判断', key: 9 }
        ]
      }
    },
    importKey: {
      type: String,
      default: 'name'
    },
    exportKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      selected: 0,
      input: '',
      select: undefined
    }
  },
  methods: {
    onInputEventHandler (val) {
      this.input = val
    },
    onSelectEventHandler (val) {
      if (val) {
        this.select = val
        this.selected++
      }
    },
    onSubmitEventHandler () {
      this.$emit('callback', {'questionContent': this.select, 'questionID': this.input})
    }
  }
}
</script>
<style scoped>
.wrap-title, .wrap-select {
  margin-bottom: 20px;
}
</style>
