<template>
  <div>
    <!-- 标题区 -->
    <h3 v-if="title">
      <router-link to="/home/newMv">
        最新MV
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
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
    </div>
  </div>
</template>
<script>
import PlayNum from './PlayNum.vue'
export default {
  data() {
    return {
      MouseMove: false
    }
  },
  methods: {
    // 通过 ID 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/detail/?id=${item.id}`)
    }
  },
  props: {
    // mv 列表
    newMvList: [],
    // 是否显示标题
    title: {
      type: Boolean,
      default: true
    },
    // 一行的单个 item 项的宽度
    myWidth: {
      type: Number,
      default: 30
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
