<template>
  <pku-form class="form" :inline="inline" :style="{ width: maxlength + 'px' }">
    <pku-form-item v-for="(item, idx) in message" :label="item.label">
      <component v-bind:is="item.name" v-bind:data-key="item.key" v-bind="item.options" ref="response" @callback="onWatchEventHandler($event, item.key)"></component>
    </pku-form-item>
    <pku-form-item>
      <pku-button
        class="btn-default"
        value="重置"
        @callback="onReset"></pku-button>
      <pku-button
        class="btn-primary"
        value="确认"
        @callback="onSubmitEventHandler"></pku-button>
    </pku-form-item>
  </pku-form>
</template>

<script>
export default {
  name: 'donQaInit',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: ''
    },
    message: {
      type: Array,
      default () {
        return [
          { name: 'pku-input',  key: 'questionaireID', label: '问卷编号', options: {} },
          { name: 'pku-input', key: 'questionaireName', label: '问卷名称', options: {} },
          { name: 'pku-select', key: 'questionaireFrom', label: '问卷所属项目', options: {} },
          { name: 'pku-select', key: 'questionaireRelated', label: '关联调查问卷', options: {} },
          { name: 'pku-switch', key: 'questionaireType', label: '核查问卷类型', options: { ableText: '录音核查', disableText: '电话核查' } },
          { name: 'pku-textarea', key: 'questionaireDes', label: '问卷描述', options: {} },
          { name: 'pku-textarea', key: 'questionaireWelcome', label: '欢迎语', options: {} },
          { name: 'pku-textarea', key: 'questionaireEnding', label: '结束语', options: {} }
        ]
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    onWatchEventHandler (evt, item) {
      this.$emit('change', {item, value: evt})
    },
    onSubmitEventHandler () {
      let res = {}
      let idx = 0
      this.$refs.response.forEach(item => {
        if (item.$options.name === 'pkuSelect') {
          res[item.$el.dataset.key] = item.valueKey || item.value
          if ((!item.valueKey && !item.value) || item.value === '请选择') {
            idx++
          }
        } else if (item.$options.name === 'pkuSwitch') {
          res[item.$el.dataset.key] = item.on
        } else {
          if (!item.value) {
            idx++
          }
          res[item.$el.dataset.key] = item.value
        }
      })
      if (idx === 0) {
        // this.$emit('callback', res)
        this.$emit('callback', JSON.stringify(res))
      } else {
        this.$alert('请将表格填写完整', '参数不全', {
          submit: () => {
          }
        })
      }
    },
    onReset () {
      this.$refs.response.forEach(item => {
        if (!item.disabled) {
          item.value = ''
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
