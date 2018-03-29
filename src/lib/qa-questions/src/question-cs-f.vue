<template>
  <div class="don-qa-question-cs-f" v-if="!fill">
    <don-qa-question-wrap label="题目序号">
      <pku-input
        class="wrap-input"
        ref="input"
        @change="onInputEventHandler"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题干">
      <pku-select
        class="wrap-select"
        selected="访员是否完整读出选项？"
        importKey="quesText"
        exportKey="questionId"
        :list="array"
        :html="true"
        @callback="onSelectEventHandler"></pku-select>
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
        :class="{'btn-primary': true, 'btn-disabled': selected * input.length === 0}"
        :disabled="selected * input.length === 0"
        @callback="onSubmitEventHandler"></pku-button>
    </don-qa-question-wrap>
  </div>
  <div class="don-qa-question-cs-f" v-else>
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
  name: 'donQuestionCsF',
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
          { name: '完整读出', key: 1 },
          { name: '部分读出', key: 3 },
          { name: '全部未读出', key: 5 }
        ]
      }
    }
  },
  data () {
    return {
      selected: 0,
      input: '',
      select: undefined
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
      this.input = val
    },
    onSelectEventHandler (val) {
      if (val) {
        this.select = val
        this.selected++
      }
    },
    onSubmitEventHandler () {
      let content = this.array.filter(item => item.questionId === this.select)
      this.$emit('callback', {'QuesOptionValues': '1,3,5', 'QuesOptionTexts': '完整读出,部分读出,全部未读出', 'questionID': this.select, 'questionContent': '"' + content[0].quesText + '"一题，访员是否完整读出选项？', 'questionSn': this.input, 'QuesType': '3005'})
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
</style>
