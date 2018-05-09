<template>
  <div class="don-qa-question-rate" v-if="!fill">
    <pku-tab
      :list="list">
      <div slot="slot_0">
        <don-qa-question-wrap label="题目序号">
          <pku-input
            class="wrap-input"
            ref="input"
            @change="onSnEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="题目标题">
          <pku-input
            class="wrap-input"
            ref="input"
            @change="onTitleEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="净值个数">
          <pku-input
            class="wrap-input"
            ref="input"
            :message="inputMax"
            @change="onMaxEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="净值初始值">
          <pku-input
            class="wrap-input"
            ref="input"
            :message="inputVoidNum"
            @change="onNumEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap>
          <pku-rate
            :max="Number(inputMax)"
            :voidShow="true"
            :voidStart="Number(inputVoidNum)"
          ></pku-rate>
        </don-qa-question-wrap>
        <don-qa-question-wrap>
          <pku-button
            value="保存"
            :class="{'btn-primary': true, 'btn-disabled': (!inputSn || !inputTitle || inputMax === '' || inputVoid === '')}"
            :disabled="(!inputSn || !inputTitle || inputMax === '' || inputVoid === '')"
            @callback="onSubmitEventHandler"></pku-button>
        </don-qa-question-wrap>
      </div>
      <div slot="slot_1">
        <don-qa-question-wrap label="题目类型" v-if="!fill">
            <pku-radio
              importKey="name"
              exportKey="key"
              class="wrap-input"
              ref="type"
              :message="options"
              @callback="onTypeEventHandler"></pku-radio>
        </don-qa-question-wrap>
        <don-qa-question-wrap>
          <pku-button
            value="保存"
            :class="{'btn-primary': true, 'btn-disabled': (!inputSn || !inputTitle || inputMax === '' || inputVoid === '')}"
            :disabled="(!inputSn || !inputTitle || inputMax === '' || inputVoid === '')"
            @callback="onSubmitEventHandler"></pku-button>
        </don-qa-question-wrap>
      </div>
    </pku-tab>
  </div>
  <div class="don-qa-question-rate" v-else>
    <pku-rate
      :max="Number(inputMax)"
      :voidShow="true"
      :voidStart="Number(inputVoidNum)"
    ></pku-rate>
  </div>
</template>

<script>
export default {
  name: 'donQuestionRate',
  props: {
    max: {
      type: Number,
      default: 5
    },
    voidNum: {
      type: Number,
      default: 1
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
      list: ['问题设置', '个性设置'],
      options: [
        { name: '星形题', key: '0600' },
        { name: '数值题', key: '0601' }
      ],
      inputSn: undefined,
      inputTitle: undefined,
      inputMax: this.max,
      inputVoidNum: this.voidNum,
      inputType: '0600'
    }
  },
  mounted () {
    if (this.fill) {
      if (this.res) {
        this.$children[0].$data.start = Number(this.res.recomStartNum[0])
        this.$children[0].$data.max = Number(this.res.valueCount[0])
        this.$children[0].$data.clickID = this.res.quesOptions[0] - this.res.recomStartNum[0]
        this.$children[0].$data.nowValue = this.res.quesOptions[0] - this.res.recomStartNum[0]
      }
    } else {
      this.$refs.type.$data.value = 0
    }
  },
  methods: {
    onSnEventHandler (val) {
      this.inputSn = val
    },
    onTitleEventHandler (val) {
      this.inputTitle = val
    },
    onMaxEventHandler (val) {
      this.inputMax = val
    },
    onTypeEventHandler (val) {
      if (val === 0) {
        this.inputType = '0600'
      } else {
        this.inputType = '0601'
      }
    },
    onNumEventHandler (val) {
      this.inputVoidNum = Number(val)
    },
    onSubmitEventHandler () {
      this.$emit('callback', {
        'questionContent': this.inputTitle,
        'valueCount': this.inputMax,
        'recomStartNum': this.inputVoidNum,
        'questionSn': this.inputSn,
        'QuesType': this.inputType
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-rate >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
