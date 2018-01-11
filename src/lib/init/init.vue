<template>
  <pku-form class="form" :inline="inline" :style="{ width: maxlength + 'px' }">
    <pku-form-item v-for="(item, idx) in message" :label="item.label">
      <component v-bind:is="item.name"  v-bind="item.options" ref="response"></component>
    </pku-form-item>
    <pku-form-item>
      <pku-button
        class="btn-default"
        value="重置"></pku-button>
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
          { name: 'pku-input', label: '问卷编号', options: {} },
          { name: 'pku-input', label: '问卷名称', options: {} },
          { name: 'pku-select', label: '问卷所属项目', options: {} },
          { name: 'pku-select', label: '关联调查问卷', options: {} },
          { name: 'pku-switch', label: '核查问卷类型', options: { ableText: '录音核查', disableText: '电话核查'} },
          { name: 'pku-textarea', label: '问卷描述', options: {} },
          { name: 'pku-textarea', label: '欢迎语', options: {} },
          { name: 'pku-textarea', label: '结束语', options: {} },
        ]
      }
    }
  },
  computed: {
    refName (id) {
      return 'ref_' + id
    }
  },
  data () {
    return {
      itemw: 'pku-button'
    }
  },
  methods: {
    onSubmitEventHandler () {
      this.$refs.response.forEach(item => {
        console.log(item)
      })
      console.log('onSubmitEventHandler')
    }
  }
}
</script>
<style scoped>
</style>
