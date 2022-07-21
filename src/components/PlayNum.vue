<template>
  <div class="playNum">
    <i class="el-icon-video-play"></i>
    <span>{{ playCount | ellipsisPlayVolume }}</span>
  </div>
</template>

<script>
export default {
  props: {
    playCount: {
      type: Number,
      default: 0
    }
  },
  filters: {
    // 播放量转换
    ellipsisPlayVolume(val) {
      if (val < 100000) return val
      return parseInt(val / 10000) + '万'
    }
  }
}
</script>

<style lang="less" scoped>
.playNum {
  position: absolute;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: right;
  border-radius: 15px 15px 0 0;
  top: 0;
  right: 0;

  span {
    padding-right: 10px;
    font-size: 13px;
  }
}
</style>
