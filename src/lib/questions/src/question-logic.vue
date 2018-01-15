<template>
  <div>
    <don-qa-question-wrap
      label="从上一题">
      <pku-select
        class="wrap-select"
        :list="title"
        @callback="onSelectEventHandler($event, 0)"></pku-select>
    </don-qa-question-wrap>
    <don-qa-question-wrap
      label="跳转到下一题">
      <pku-select
        class="wrap-select"
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
          :selected="请选择条件问题"
          :list="title"
          :style="styleObj"
          @callback="onSelectEventHandler($event, 2, id, 'a')"></pku-select>
        <pku-select
          class="wrap-logic"
          :selected="请选择跳转逻辑"
          :list="title"
          :style="styleObj"
          @callback="onSelectEventHandler($event, 2, id, 'b')"></pku-select>
        <transition name="input">
          <pku-input
          message="参数"
          v-show="logic.show"
          :style="styleObj"></pku-input>
        </transition>
        </don-qa-question-wrap>
    </transition-group>
    <don-qa-question-wrap label="保存本条跳转逻辑">
      <pku-button
        class="wrap-button"
        value="保存"
        :class="{'btn-primary': true, 'btn-disabled': !(from && des)}"></pku-button>
    </don-qa-question-wrap>
  </div>
</template>

<script>
export default {
  name: 'donQuestionLogic',
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
      selected: [0, 0],
      logics: [
        { a: '', b: '', show: false },
        { a: '', b: '', show: false }
      ],
      styleObj: {
        width: '30%'
      },
      from: undefined,
      des: undefined
    }
  },
  mounted () {
    console.log(this.from && this.des, this.from, this.des)
  },
  methods: {
    logicid (id) {
      return '条件' + String(id + 1)
    },
    onSelectEventHandler (evt, val, id, tag) {
      if (val === 2) {
        this.logics[id][tag] = evt
        this.logics[id].show = this.logics[id].a  && this.logics[id].b 
      } else if (val === 1) {
        if (evt) {
          this.des = evt
        }
      } else if (val === 0) {
        if (evt) {
          this.from = evt
        }
      }
    // this.selected[val]++
    },
    onClickEventHadnler () {
      this.logics.push({
        a: '',
        b: '',
        show: false
      })
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
