<template>
  <div class="don-qa-welcome">
    <div class="qa-answer-wrapper">
      <div class="qa-answer-title">
        {{ title }}
      </div>
      <div class="qa-answer-subtitle">
        {{ title }}
      </div>
      <div class="qa-answer-content">
        {{ content }}
      </div>
      <div class="qa-answer-btn">
        <pku-button class="pku-danger" value="进入" @callback="onSubmitEventHandler"></pku-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'donQaWelcome',
  props: {
    title: {
      type: String,
      default: 'TITLE'
    },
    subtitle: {
      type: String,
      default: 'TITLE'
    },
    content: {
      type: String,
      default: 'CONTENT'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    onSubmitEventHandler () {
      this.$emit("callback", this.options)
    }
  }
}
</script>
<style scoped>
.don-qa-welcome {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background-color: #e5e5e5;
}
.qa-answer-wrapper {
  position: relative;
  margin: 0 auto;
  top: 30%;
  max-width: 90%;
  width: 1008px;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px #ccc;
  border-radius: 5px;
}
.qa-answer-title {
  background-color: #8f000b;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 24px;
}
.qa-answer-subtitle {
  padding: 20px;
  font-size: 14px;
  line-height: 20px;
}
.qa-answer-content {
  padding: 20px;
  font-size: 14px;
  line-height: 20px;
}
.qa-answer-btn{
  padding: 20px;
  text-align: center;
}
</style>
