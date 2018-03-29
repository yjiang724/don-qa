<template>
  <div class="don-qa-question-select" v-if="!fill">
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
            @change="onTitleEventHandler"></pku-input>
        </don-qa-question-wrap>
        <don-qa-question-wrap>
          <pku-button
            class="btn-warning"
            value="增加选项"
            @callback="onClickEventHadnler"></pku-button>
        </don-qa-question-wrap>
        <transition-group name="list" tag="div">
          <don-qa-question-wrap 
            class="list-item"
            v-for="(item, id) in selects"
            :key="id"
            :label="selectID(id)">
            <pku-input class="question-input" placeholder="选项序号" @change="onSelectEventHandler($event, id, 'sn')"></pku-input>
            <pku-input class="question-input" placeholder="选项名称" @change="onSelectEventHandler($event, id, 'val')"></pku-input>
          </don-qa-question-wrap>
        </transition-group>
        <don-qa-question-wrap>
          <pku-button
            class="btn-primary"
            value="保存"
            :class="{'btn-primary': true, 'btn-disabled': !inputSn}"
            :disabled="!inputSn"
            @callback="onSubmitEventHandler"></pku-button>
        </don-qa-question-wrap>
      </div>
      <div slot="slot_1"></div>
    </pku-tab>
  </div>
  <div class="don-qa-question-select" v-else>
  123
  </div>
</template>

<script>
export default {
  name: 'donQuestionSelect',
  props: {
    fill: {
      type: Boolean,
      default: false
    },
    res: {
      type: Array,
      default () {
        return [null, null, null]
      }
    }
  },
  data () {
    return {
      list: ['问题设置'],
      selects: [
        { sn: '', val: ''}
      ],
      inputSn: undefined,
      inputTitle: undefined
    }
  },
  methods: {
    selectID (val) {
      return '选项' + String(val + 1)
    },
    onClickEventHadnler () {
      this.selects.push({
        sn: '',
        val: ''
      })
    },
    onSnEventHandler (val) {
      this.inputSn = val
    },
    onTitleEventHandler (val) {
      this.inputTitle = val
    },
    onSelectEventHandler (val, index, type) {
      this.selects[index][type] = val
    },
    onSubmitEventHandler () {
    //   let content = this.title.filter(item => item.questionId === this.select)
      let value = []
      let sns = []
      this.selects.forEach(item => {
        console.log(item)
        value.push(item.val)
        sns.push(item.sn)
      })
      this.$emit('callback', {
        'QuesOptionValues': sns.toString(),
        'QuesOptionTexts': value.toString(),
        // 'questionID': this.select,
        'questionContent': this.inputTitle,
        'questionSn': this.inputSn,
        'QuesType': '0001'
      })
    }
  }
}
</script>
<style scoped>
.wrap-input, .wrap-select {
  margin-bottom: 20px;
}
div.don-qa-question-select >>> .don-qa-question-wrap label {
  font-size: 14px;
}
.question-input {
  width: 48%;
}
</style>
