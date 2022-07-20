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
        class="item"
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
          <span>{{ item.name }}</span>
          <span class="item-artist">{{ item.song.artists[0].name }}</span>
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
    margin-top: 20px;
    display: flex;
    justify-content: left;
    width: 30%;
    border-radius: 15px;
    box-shadow: 2px 2px 5px rgba(98, 95, 95, 0.5);

    .img-container {
      position: relative;

      .item-img {
        width: 100px;
        height: 100%;
        border-radius: 15px;
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
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .item-artist {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
