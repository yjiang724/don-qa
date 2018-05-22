<template>
  <div class="don-qa-logic">
    <don-qa-question-wrap
      label="从上一题">
      <pku-select
        class="wrap-select"
        importKey="quesName"
        exportKey="quesID"
        :list="title"
        @callback="onSelectEventHandler($event, 0)"></pku-select>
    </don-qa-question-wrap>
    <don-qa-question-wrap
      label="跳转到下一题">
      <pku-select
        class="wrap-select"
        importKey="quesName"
        exportKey="quesID"
        :list="title"
        @callback="onSelectEventHandler($event, 1)"></pku-select>
    </don-qa-question-wrap>
    
    <don-qa-question-wrap label="跳转条件">
      <pku-button
        class="btn-warning"
        value="增加条件"
        @callback="onClickEventHadnler"></pku-button>
    </don-qa-question-wrap>
    
    <transition-group name="list" tag="div">
      <don-qa-question-wrap 
        class="list-item"
        v-for="(logic, id) in logics"
        :key="id"
        :label="logicid(id)"
        :inline="true">
        <pku-select
          class="wrap-logic"
          label="如果"
          importKey="quesName"
          exportKey="quesID"
          selected="请选择条件问题"
          :list="source"
          :style="styleObj"
          @callback="onSelectEventHandler($event, 2, id, 'a')"></pku-select>
        <pku-select
          class="wrap-logic"
          selected="请选择跳转逻辑"
          importKey="name"
          exportKey="value"
          :list="option"
          :style="styleObj"
          @callback="onSelectEventHandler($event, 2, id, 'b')"></pku-select>
        <transition name="input">
        <pku-select
          importKey="optionText"
          exportKey="optionValue"
          :list="logicOpts[id]"
          v-show="logic.show"
          :style="styleObj"
          @callback="onSelectEventHandler($event, 3, id)"></pku-select>
        </transition>
        </don-qa-question-wrap>
    </transition-group>
    <don-qa-question-wrap label="保存本条跳转逻辑">
      <pku-button
        class="wrap-button"
        value="保存"
        :class="{'btn-danger': true, 'btn-disabled': !(from && des)}"
        :disabled="!(from && des)"
        @callback="onSaveEventHandler"></pku-button>
    </don-qa-question-wrap>
  </div>
</template>

<script>
export default {
  name: 'donQaLogic',
  props: {
    title: {
      type: Array,
      default () {
        return ['题目1', '题目2', '题目3']
      }
    },
    source: {
      type: Array,
      default () {
        return ['题目1', '题目2', '题目3']
      }
    },
    logicOpts: {
      type: Array,
      default () {
        return []
      }
    }
    // importKey: {
    //   type: String,
    //   default: 'name'
    // },
    // exportKey: {
    //   type: String,
    //   default: 'id'
    // }
  },
  data () {
    return {
      selected: [0],
      logics: [
        { a: '', b: '', show: false }
      ],
      styleObj: {
        width: '30%'
      },
      type: '0001',
      option: [],
      options: {
        '0001': [
          { value: 'skiporcheck', name: '跳过或选中' },
          { value: 'checked', name: '选中' },
          { value: 'notchecked', name: '未选中' },
          { value: 'unknown', name: '选择不知道' },
          { value: 'refuse', name: '选择拒绝回答' }
        ],
        '0002': [
          { value: 'skiporcheck', name: '跳过或选中' },
          { value: 'checked', name: '选中' },
          { value: 'notchecked', name: '未选中' },
          { value: 'in', name: '包含' },
          { value: 'unknown', name: '选择不知道' },
          { value: 'refuse', name: '选择拒绝回答' }
        ],
        '0100': [
          { value: 'equal', name: '等于' },
          { value: 'notequal', name: '不等于' },
          { value: 'unknown', name: '选择不知道' },
          { value: 'refuse', name: '选择拒绝回答' }
        ],
        '0200': [
          { value: 'less', name: '等于' },
          { value: 'equal', name: '不等于' },
          { value: 'great', name: '选择不知道' },
          { value: 'notequal', name: '选择拒绝回答' },
          { value: 'lessequal', name: '选择拒绝回答' },
          { value: 'greatequal', name: '选择拒绝回答' },
          { value: 'unknown', name: '选择拒绝回答' },
          { value: 'refuse', name: '选择拒绝回答' }
        ]
      },
      from: undefined,
      des: undefined
    }
  },
  mounted () {
    // console.log(this.from && this.des, this.from, this.des)
  },
  methods: {
    logicid (id) {
      return '条件' + String(id + 1)
    },
    onSelectEventHandler (evt, val, id, tag) {
      let flag = false
      if (val === 2) {
        if (tag === 'a') {
          // add here
          this.type = this.list.filter(item => return item.quesID === evt)[0].quesType
          if (this.type > 3000) {
            this.type = '0001'
          }
          this.option = this.options[this.type]
          this.$emit('selected', { idx: id, value: evt })
        } else if (tag === 'b') {
          if (evt === 'skiporcheck' || evt === 'checked' || evt === 'notchecked') {
            flag = true
          }
        }
        this.logics[id][tag] = evt
        this.logics[id].show = this.logics[id].a  && this.logics[id].b && flag
      } else if (val === 1) {
        if (evt) {
          this.des = evt
        }
      } else if (val === 0) {
        if (evt) {
          this.from = evt
        }
      } else if (val === 3) {
        this.logics[id]['c'] = evt
      }
    // this.selected[val]++
    },
    onClickEventHadnler () {
      this.logics.push({
        a: '',
        b: '',
        show: false
      })
    },
    onSaveEventHandler () {
      this.$emit('save', { from: this.from, des: this.des, logics: this.logics })
    }
  }
}
</script>
<style scoped>
.wrap-title, .wrap-select {
  margin-bottom: 20px;
}
.wrap-logic {
  margin: 0;
}
.input-enter-active, .input-leave-active {
  transition: all .3s ease;
}
.input-enter, .input-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.list-item {
  margin-bottom: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
