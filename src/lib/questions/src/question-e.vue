<template>
  <div>
    <don-qa-question-wrap
      label="题干">
      <pku-input
        class="wrap-title"
        value="下面这一题，访员读出关键词的情况是？" 
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
  name: 'donQuestionE',
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
          { name: '逐字完整读出', key: 1 },
          { name: '部分读出', key: 3 },
          { name: '全部未读出', key: 9 }
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
