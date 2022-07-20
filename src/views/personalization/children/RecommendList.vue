<template>
  <div class="container">
    <!-- 标题项 -->
    <h3 v-if="title">
      <router-link to="/home/songMenu">
        歌单推荐
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <!-- 内容主体项 -->
    <div class="content-box">
      <div
        class="content-item"
        v-for="(item, i) in RecommendList"
        :key="i"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="goPlayById(item)"
      >
        <!-- 顶部播放数量 -->
        <div class="content-title">
          <i class="el-icon-video-play"></i>
          <span>{{ item.playCount | ellipsisPlayVolume }}</span>
        </div>
        <!-- 图片 -->
        <img v-lazy="item.picUrl || item.coverImgUrl" class="content-img" />
        <!-- 描述 -->
        <div class="content-name">
          <span>
            {{ item.name }}
          </span>
        </div>
        <!-- 播放图标 -->
        <div class="content-icon" v-show="MouseMove === i">
          <i class="el-icon-video-play"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      MouseMove: false
    }
  },
  methods: {
    // 通过 ID 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id',item.id)
      this.$router.push(`/home/detail/?id=${item.id}`)
    }
  },
  props: {
    // 推荐歌单的数据
    RecommendList: [],
    // 是否显示标题栏
    title: {
      type: Boolean,
      dafault: true
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
.content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .content-item {
    width: 250px;
    position: relative;
    margin: 20px 0 0 0;
    box-shadow: 2px 2px 5px rgba(98, 95, 95, 0.5);
    border-radius: 15px;
    cursor:pointer;
    

    .content-img {
      width: 100%;
      border-radius: 15px;
    }

    .content-name {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }

    .content-title {
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
