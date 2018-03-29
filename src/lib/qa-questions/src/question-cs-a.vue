<template>
  <div class="don-qa-question-cs-a" v-if="!fill">
    <don-qa-question-wrap label="题目序号">
      <pku-input
        class="wrap-input"
        ref="input"
        @change="onInputEventHandler"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题干">
      <pku-select
        class="wrap-select"
        selected="访员是否提问了下面这一题相关内容？"
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
        :class="{'btn-primary': true, 'btn-disabled': selected * inputSn.length === 0}"
        :disabled="selected * inputSn.length === 0"
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
      this.inputSn = val
    },
    onSelectEventHandler (val) {
      if (val) {
        this.select = val
        this.selected++
      }
    },
    onSubmitEventHandler () {
      let content = this.array.filter(item => item.questionId === this.select)
      this.$emit('callback', {'QuesOptionValues': '1,5,9', 'QuesOptionTexts': '是,否,无法判断', 'questionID': this.select, 'questionContent': '访员是否提问了"' + content[0].quesText + '"一题相关内容？', 'questionSn': this.inputSn, 'QuesType': '3000'})
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
