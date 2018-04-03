<template>
  <div class="don-qa-question-input" v-if="!fill">
    <pku-tab
      :list="list">
      <div slot="slot_0">
        <don-qa-question-wrap label="题目序号" v-if="!fill">
          <pku-input
            class="wrap-input"
            ref="input"
            @change="onSnEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="题目标题" v-if="!fill">
          <pku-input
            class="wrap-input"
            ref="input"
            style="width: 50%;"
            :message="message"
            @change="onTitleEventHandler"></pku-input>
          <pku-select
            class="wrap-select"
            importKey="propertyName"
            exportKey="propertyCode"
            label="增加变量"
            style="width: 49%;"
            :list="propertyInfo"
            @callback="onPropertyEventHandler">
          </pku-select>
        </don-qa-question-wrap>
        <don-qa-question-wrap v-if="!fill">
          <pku-button
            value="保存"
            :class="{'btn-primary': true, 'btn-disabled': (!inputSn || !inputTitle)}"
            :disabled="(!inputSn || !inputTitle)"
            @callback="onSubmitEventHandler"></pku-button>
        </don-qa-question-wrap>
      </div>
      <div slot="slot_1">
        <don-qa-question-wrap label="题目类型" v-if="!fill">
          <pku-radio
            importKey="name"
            exportKey="key"
            :message="options"
            class="wrap-input"
            ref="type"
            @callback="onRadioEventHandler"></pku-radio>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="最小长度" v-if="!fill">
          <pku-input
            class="wrap-input"
            ref="input"
            @change="onMinEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap label="最大长度" v-if="!fill">
          <pku-input
            class="wrap-input"
            ref="input"
            @change="onMaxEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap v-if="!fill">
          <pku-button
            value="保存"
            :class="{'btn-primary': true, 'btn-disabled': (!inputSn || !inputTitle)}"
            :disabled="(!inputSn || !inputTitle)"
            @callback="onSubmitEventHandler"></pku-button>
        </don-qa-question-wrap>
      </div>
    </pku-tab>
  </div>
  <div class="don-qa-question-input" v-else>
    <pku-input class="wrap-input" v-if="importType === '0100'"></pku-input>
  </div>
</template>

<script>
export default {
  name: 'donQuestionInput',
  props: {
    fill: {
      type: Boolean,
      default: false
    },
    importType: {
      type: String,
      default: '0100'
    },
    res: {
      type: Object,
      default () {
        return null
      }
    },
    propertyInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      list: ['问题设置', '个性设置'],
      options: [
        { name: '文本', key: '0100' },
        // { name: '密码', key: '0101' },
        { name: '纯文字', key: '0102' }
      ],
      inputSn: '',
      inputTitle: '',
      inputMin: '',
      inputMax: '',
      message: '',
      type: '0100'
    }
  },
  mounted () {
    if (this.fill && this.res) {
      // this.$children[0].$data.value = this.res.quesOptions[0]
    } else {
      this.$refs.type.$data.value = 0
    }
  },
  methods: {
    onRadioEventHandler (val) {
      this.type = val
    },
    // 这个题目类型是用questType来区别的。文本题：0100、密码题：0101、纯文字：0102。
    // 你截图部分的是文本化的显示。原系统是用onclick事件做的。
    onSnEventHandler (val) {
      this.inputSn = val
    },
    onTitleEventHandler (val) {
      this.inputTitle = val
    },
    onMaxEventHandler (val) {
      this.inputMax = val
    },
    onMinEventHandler (val) {
      this.inputMin = val
    },
    onPropertyEventHandler (val) {
      this.message = this.inputTitle + '${Sample_' + val +'}'
    },
    onSubmitEventHandler () {
      this.$emit('callback', {
        'questionContent': this.inputTitle,
        'questionSn': this.inputSn,
        'QuesType': this.type,
        'minCharacter': Number(this.inputMin),
        'maxCharacter': Number(this.inputMax)
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-input >>> .don-qa-question-wrap label {
  font-size: 14px;
}
</style>
