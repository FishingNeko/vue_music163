<template>
  <div>
    <!-- 标题区 -->
    <h3>
      <router-link to="/home/newSong">
        最新音乐
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <!-- 内容区 -->
    <div class="container">
      <div
        v-for="(item, i) in newSongList"
        :key="i"
        class="item globe-shadow-box"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="goPlayById(item)"
      >
        <!-- 图片区 -->
        <div class="img-container">
          <img v-lazy="item.picUrl" class="item-img" />
          <!-- 播放图标 -->
          <div class="content-icon" v-show="MouseMove === i">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <!-- 音乐名与作者名 -->
        <div class="item-des">
          <div class="item-songname globe-overflow-text">{{ item.name }}</div>
          <span class="item-artist globe-overflow-text">{{ item.song.artists[0].name }}</span>
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
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/detail/?id=${item.id}`)
    }
  },
  props: {
    newSongList: []
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
    display: flex;
    justify-content: left;
    width: 30%;

    .img-container {
      position: relative;
      width: 30%;

      .item-img {
        width: 100%;
        height: 100%;
      }

      .content-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: red;
        font-size: 40px;
      }
    }

    .item-des {
      width: 60%;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-evenly;

      .item-songname {
        width: 100%;
      }

      .item-artist {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
