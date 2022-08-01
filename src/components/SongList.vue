<template>
  <div class="container">
    <!-- 内容主体项 -->
    <div class="content-box">
      <div
        class="content-item globe-shadow-box"
        v-for="(item, i) in RecommendList"
        :key="i"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="goPlayById(item)"
        :style="{ width: myWidth + '%' }"
      >
        <!-- 顶部播放数量 -->
        <PlayNum :playCount="item.playCount"></PlayNum>
        <!-- 图片 -->
        <div class="content-img">
          <img v-lazy="item.picUrl || item.coverImgUrl" />
        </div>
        <!-- 描述 -->
        <div class="globe-overflow-text">
          {{ item.name }}
        </div>
        <!-- 播放图标 -->
        <div class="content-icon" v-show="MouseMove === i">
          <i class="el-icon-video-play"></i>
        </div>
      </div>
      <!-- 可能需要多渲染的元素,用于末行左对齐 -->
      <template v-if="newNum">
        <div
          v-for="(item, j) in newNum"
          :key="j + 'a'"
          :style="{ width: myWidth + '%' }"
          class="test"
        ></div>
      </template>
    </div>
  </div>
</template>
<script>
import PlayNum from './PlayNum.vue'
export default {
  data() {
    return {
      // 判断哪个 item 项要显示播放图标
      MouseMove: false,
      // 可能需要多渲染元素的个数
      newNum: 0
    }
  },
  methods: {
    // 通过 ID 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/detail/?id=${item.id}`)
    },
    // 计算末行空元素的数量
    num() {
      // 计算有多少条数据
      let length = this.RecommendList.length
      // 一行最多有多少个元素
      let lineNum = Math.floor(100 / this.myWidth)
      // 判断是否能除尽
      const result = length % lineNum
      // 如果不能除尽,需要计算添加的元素量
      // 一行最多有多少个元素,减去最后一行多出的元素量
      if (result) this.newNum = lineNum - result
    }
  },
  props: {
    // 推荐歌单的数据
    RecommendList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 自定义宽度
    myWidth: {
      type: Number,
      default: 21
    }
  },
  components: {
    PlayNum
  },
  watch: {
    // 监听传递过来的 RecommendList，必须在watch里才能调用到 RecommendList
    RecommendList: function(newArr,oldArr) {
      this.num()
    }
  }
}
</script>
<style lang="less" scoped>
.content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .content-item {

    .content-img {
      width: 100%;
      img {
        width: 100%;
      }
    }

    .content-icon {
      position: absolute;
      right: 5%;
      bottom: 20%;
      width: 40px;
      height: 40px;
      color: red;
      font-size: 40px;
    }
  }
}
</style>
