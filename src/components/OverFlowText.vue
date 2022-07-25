<template>
  <div class="dp-text-ellipsis-wrapper">
    <div class="text" :class="textClass" :style="textStyleObject">
      <label class="btn" @click="showall = !showall"></label>
      {{ info }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: String,
      default: ''
    },
    lineClamp: {
      type: Number,
      default: 3
    },
    hiddenBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showall: false
    }
  },
  computed: {
    textStyleObject() {
      return {
        'max-height': this.showall ? 'none' : `${1.5 * this.lineClamp}em`
      }
    },
    textClass() {
      let cls = this.showall ? 'showall' : ''
      cls = cls + (this.hiddenBtn ? ' hidden-btn' : '')
      return cls
    }
  },
  watch: {
    info() {
      this.showall = false
    }
  }
}
</script>
<style lang="less">
.dp-text-ellipsis-wrapper {
  display: flex;
  margin: 6px 0 20px 0;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;

  .text {
    position: relative;
    overflow: hidden;
    line-height: 1.5;
    text-align: justify;
    text-overflow: ellipsis;
    word-break: break-all;
    transition: 0.3s max-height;
    white-space: pre-wrap;
  }
  .text::before {
    float: right;
    height: calc(100% - 20px);
    content: '';
  }
  .text::after {
    position: absolute;
    width: 999vw;
    height: 999vw;
    margin-left: -100px;
    box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
    content: '';
  }
  .btn {
    position: relative;
    float: right;
    clear: both;
    margin-left: 10px;
    font-size: 14px;
    padding: 0 8px;
    color: #206ef7;
    line-height: 20px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10;
  }
  .btn::after {
    /* stylelint-disable-next-line */
    font-family: element-icons !important;
    content: '展开\e790';
  }

  .text.showall {
    max-height: none;
  }
  .text.showall .btn::before {
    visibility: hidden;
  }
  .text.showall .btn::after {
    visibility: hidden;
  }
  .text.showall.hidden-btn .btn::after {
    content: '收起\e78f';
    visibility: visible;
  }
  .btn::before {
    position: absolute;
    left: 1px;
    color: #206ef7;
    transform: translateX(-100%);
    content: '...';
  }
}
</style>
