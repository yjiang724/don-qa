<template>
  <div class="don-qa-question-cs-j" v-if="!fill">
    <don-qa-question-wrap label="题目序号">
      <pku-input
        class="wrap-input"
        ref="input"
        @change="onInputEventHandler"></pku-input>
    </don-qa-question-wrap>
    <don-qa-question-wrap label="题干">
      <pku-select
        class="wrap-select"
        selected="下面这一题，受访者给出的答案是什么？"
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
        :message="inputOptions"></pku-radio>
    </don-qa-question-wrap>
    <don-qa-question-wrap>
      <pku-button
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': selected * inputSn.length === 0}"
        :disabled="selected * inputSn.length === 0"
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
    onSelectEventHandler (val) {
      let content = this.array.filter(item => item.questionId === val)
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
        this.select = val
        this.selected++
        this.inputOptions = arr.concat()
      }
    },
    onSubmitEventHandler () {
      let content = this.array.filter(item => item.questionId === this.select)
      this.$emit('callback', {'QuesOptionValues': this.QuesOptionValues.toString(), 'QuesOptionTexts': this.QuesOptionTexts.toString(), 'questionID': this.select, 'questionContent': '"' + content[0].quesText + '"这一题，受访者给出的答案是什么？', 'questionSn': this.inputSn, 'QuesType': '3009'})
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
