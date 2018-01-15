<template>
  <div>
    <don-qa-question-wrap
      label="题干">
      <pku-input
        class="wrap-title"
        value="下面这一题，访员是否至少追问一次？" 
        :disabled="true"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap
      label="题目信息">
      <pku-select
        class="wrap-select"
        :list="title"
        @callback="onSelectEventHandler"></pku-select>
      <pku-radio
        :disabled="true"
        :importKey="importKey"
        :exportKey="exportKey"
        :message="options"></pku-radio>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-button
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': selected === 0}"></pku-button>
    </don-qa-question-wrap>
  </div>
</template>

<script>
export default {
  name: 'donQuestionH',
  props: {
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
          { name: '否', key: 5 }
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
      selected: 0
    }
  },
  methods: {
    onSelectEventHandler (val) {
      if (val) {
        this.selected++
      }
    }
  }
}
</script>
<style scoped>
.wrap-title, .wrap-select {
  margin-bottom: 20px;
}
</style>
