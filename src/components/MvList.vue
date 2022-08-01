<template>
  <div>
    <!-- 内容区 -->
    <div class="container">
      <div
        class="item globe-shadow-box"
        v-for="(item, i) in newMvList"
        :key="i"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="goPlayById(item)"
        :style="{ width: myWidth + '%' }"
      >
        <!-- 图片 -->
        <img v-lazy="item.picUrl || item.cover" class="item-img" />
        <!-- 描述区 -->
        <div class="item-des">
          <!-- 标题 -->
          <div class="item-name">
            <span>{{ item.name }}</span>
          </div>
          <!-- 作者 -->
          <div class="item-artist">
            <span>{{ item.artists[0].name || item.artistName }}</span>
          </div>
        </div>
        <!-- 播放量 -->
        <PlayNum :playCount="item.playCount"></PlayNum>
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
      MouseMove: false,
      // 可能需要多渲染元素的个数
      newNum: 0
    }
  },
  methods: {
    // 通过 ID 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/mvDetail/?id=${item.id}`)
    },
    // 计算末行空元素的数量
    num() {
      // if: 解决数据为空时,读取不到 length 报错的问题
      if (this.newMvList) {
        // 计算有多少条数据
        let length = this.newMvList.length
        // 一行最多有多少个元素
        let lineNum = Math.floor(100 / this.myWidth)
        // 判断是否能除尽
        const result = length % lineNum
        // 如果不能除尽,需要计算添加的元素量
        // 一行最多有多少个元素,减去最后一行多出的元素量
        if (result) this.newNum = lineNum - result
      }
    }
  },
  props: {
    // mv 列表
    newMvList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 一行的单个 item 项的宽度
    myWidth: {
      type: Number,
      default: 30
    }
  },
  watch: {
    // 监听传递过来的 newMvList，必须在watch里才能调用到 newMvList
    newMvList: function (newArr, oldArr) {
      this.num()
    }
  },
  components: {
    PlayNum
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;

  .item {
    .item-img {
      width: 100%;
      max-height: 250px;
    }

    .item-des {
      margin: auto 0;
      width: 100%;
      padding: 10px;
    }

    .item-name {
      width: 100%;
      font-size: 15px;
    }

    .item-artist {
      color: gray;
      font-size: 14px;
      margin-top: 10px;
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
