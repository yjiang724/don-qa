<template>
  <div class="qa-answer-fill">
    <div v-for="(group, index1) in options">
      <div class="qa-answer-wrapper" v-for="(item, index2) in group">
        <div class="qa-answer-title">
          {{item.quesSn}}: <span v-html="splitTitle(item.quesText)"></span>
          <audio  class="audio"
                  :src="eachFile(item)"
                  v-if="item.quesType === '3000' || item.quesType === '3001' || item.quesType === '3002' || item.quesType === '3003' || item.quesType === '3004' || item.quesType === '3005' || item.quesType === '3006' || item.quesType === '3007' || item.quesType === '3008' || item.quesType === '3009'"
                  controls="controls">Your browser does not support the audio element.</audio>
        </div>
        <div class="qa-answer-content">
          <component v-if="item.quesType === '3000'" v-bind:is='"donQuestionCsA"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3001'" v-bind:is='"donQuestionCsB"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3002'" v-bind:is='"donQuestionCsC"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3003'" v-bind:is='"donQuestionCsD"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3004'" v-bind:is='"donQuestionCsE"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3005'" v-bind:is='"donQuestionCsF"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3006'" v-bind:is='"donQuestionCsG"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3007'" v-bind:is='"donQuestionCsH"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3008'" v-bind:is='"donQuestionCsI"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '3009'" v-bind:is='"donQuestionCsJ"' :options="eachOption(item)" :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '0100'" importType="0100" v-bind:is='"donQuestionInput"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '0102'" importType="0102" v-bind:is='"donQuestionInput"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '0600' || item.quesType ==='0601'" v-bind:is='"donQuestionRate"' :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component> 
          <component v-else-if="item.quesType === '0001'" v-bind:is='"donQuestionSelect"' :options="eachOption(item)" :res="eachRes(index1, index2)" :fill="true" :disabled="false" ref="res"></component>
          <component v-else></component>
        </div>
      </div>
    </div>
    <div class="qa-answer-btn">
      <pku-button v-if="prev" class="btn-default" value="上一页" @callback="onPrevEventHandler"></pku-button>
      <pku-button class="btn-danger" value="下一页" @callback="onSubmitEventHandler"></pku-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'donQaFill',
  props: {
    // title: {
    //   type: String,
    //   default: 'TITLE'
    // },
    // subtitle: {
    //   type: String,
    //   default: 'TITLE'
    // },
    audio: {
      type: String,
      default: 'url'
    },
    content: {
      type: String,
      default: 'CONTENT'
    },
    groups: {
      type: String,
      default: '{}'
    },
    prev: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      componentName: 'donQuestionCsA'
    }
  },
  computed: {
    options () {
      return JSON.parse(this.groups)
    }
  },
  // watch: {
  //   // groups (val) {
  //   //   this.options = JSON.parse(val)
  //   // },
  //   // content (val) {
  //   //   this.res = JSON.parse(val)[0]
  //   // }
  // },
  methods: {
    eachOption (val) {
      let arr = []
      val.quesOptionTexts.forEach((item, index) => {
        arr.push({
          name: item,
          value: val.quesOptions[index]
        })
      })
      return arr
    },
    eachRes (index1, index2) {
      let len = 0
      this.options.forEach((item, index) => {
        if (index < index1) {
          len += item.length
        } else if (index === index1) {
          len += index2
        }
      })
      let tmp = JSON.parse(this.content)
      let arr = tmp.filter(item => Number(item.indexForAns) === len)
      if (arr) {
        return arr[0]
      } else {
        return null
      }
    },
    eachFile (item) {
      let tmp = item.quesText.split('____________')
      if (tmp.length > 1) {
        tmp = tmp[1]
      } else {
        return this.audio + '.mp3'
      }
      tmp = tmp.split('[')
      if (tmp.length > 1) {
        tmp = tmp[1]
        return this.audio + '_' + tmp.substring(0, tmp.length - 1) + '(0).mp3'
      } else {
        return this.audio + '.mp3'
      }
    },
    splitTitle (title) {
      return title.split('____________')[0]
    },
    onPrevEventHandler () {
      this.$emit('prev')
    },
    onSubmitEventHandler () {
      // let len = this.$refs.res.length
      let tmpCount = 0
      this.$refs.res.forEach(singleQuestion => {
        let name = singleQuestion.$options.name
        if (name === 'donQuestionInput') {
          if (singleQuestion.$children[0]) {
            if (singleQuestion.$children[0].$data.value.length === 0) {
              tmpCount++
            }
          }
        } else if( name === 'donQuestionRate') {
          if (singleQuestion.$children[0].$data.clickID === -1) {
            tmpCount++
          }
        } else if (name === 'donQuestionSelect') {
          if (singleQuestion.$children[0].$data.value === false) {
            tmpCount++
          }
        } else {
          if (singleQuestion.$children[0].$data.value === false) {
            tmpCount++
          }
        }
      })
      if (tmpCount > 0) {
        this.$emit("callback", {
          answersStr: 'notfilled'
        })
      } else {
        let tmp = JSON.parse(this.groups).concat()
        let count = 0
        let res = []
        tmp.forEach(item => {
          item.forEach(val => {
            val.questionID = val.quesId
            delete val.quesId
            delete val.quesRequired
            delete val.quesAllowRefused
            delete val.quesText
            delete val.quesTimer
            delete val.quesTipVisible
            delete val.quesRandomized
            delete val.quesSn
            delete val.colOptions
            delete val.colOptionTexts
            delete val.rowOptionTexts
            delete val.quesOptionTexts
            delete val.colOrders
            delete val.rowOptions
            delete val.rowOrders
            console.log(this.$refs.res[count])
            if (val.quesType === '0001') {
              let num = this.$refs.res[count].$children[0].$data.value
              val.a = [val.optionOrders[num]]
              val.b = [val.quesOptions[num]]
              delete val.optionOrders
              val.optionOrders = val.a.concat()
              delete val.quesOptions
              val.quesOptions = val.b.concat()
              delete val.a
              delete val.b
              res.push(val)
            } else if (val.quesType === '0100') {
              let num = this.$refs.res[count].$children[0].$data.value
              // delete val.optionOrders
              val.optionOrders = ['0']
              // delete val.quesOptions
              val.quesOptions = [num]
              res.push(val)
            } else if (val.quesType === '0102') {
            } else if (val.quesType === '0600' || val.quesType === '0601') {
              let num = this.$refs.res[count].$children[0].$data.voidStart + this.$refs.res[count].$children[0].$data.nowValue
              delete val.optionOrders
              val.optionOrders = ['0']
              delete val.quesOptions
              val.quesOptions = [num]
              res.push(val)
            } else {
              let num = this.$refs.res[count].$children[0].$data.value
              val.a = [val.optionOrders[num]]
              val.b = [val.quesOptions[num]]
              delete val.optionOrders
              val.optionOrders = val.a.concat()
              delete val.quesOptions
              val.quesOptions = val.b.concat()
              delete val.a
              delete val.b
              res.push(val)
            }
            count++
          })
        })
        this.$emit("callback", {
          answersStr: res
        })
      }
    }
  }
}
</script>
<style scoped>
.qa-answer-fill {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background-color: #e5e5e5;
  overflow-y: scroll;
}
.qa-answer-wrapper {
  position: relative;
  margin: 20px auto;
  top: 40%;
  max-width: 90%;
  width: 1008px;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px #ccc;
  border-radius: 5px;
}
.qa-answer-title {
  background-color: #f5f7fa;
  // color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 24px;
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
.audio {
  position: absolute;
  bottom: 30px;
  right: 20px;
  display: inline-block;
}
</style>
