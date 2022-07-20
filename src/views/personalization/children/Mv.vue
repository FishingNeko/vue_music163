<template>
  <div>
    <!-- 标题区 -->
    <h3>
      <router-link to="/home/newMv">
        最新MV
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <!-- 内容区 -->
    <div class="container">
      <div
        class="item"
        v-for="(item, i) in newMvList"
        :key="i"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="goPlayById(item)"
      >
        <!-- 图片 -->
        <div class="item-img">
          <img v-lazy="item.picUrl" />
        </div>
        <!-- 描述区 -->
        <div class="item-des">
          <!-- 标题 -->
          <div class="item-name">
            <span>{{ item.name }}</span>
          </div>
          <!-- 作者 -->
          <div class="item-artist">
            <span>{{ item.artists[0].name }}</span>
          </div>
        </div>
        <!-- 播放量 -->
        <div class="playNum">
          <i class="el-icon-video-play"></i>
          <span>{{ item.playCount }}</span>
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
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/detail/?id=${item.id}`)
    }
  },
  props: {
    // mv 列表
    newMvList: []
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    width: 30%;
    border-radius: 15px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

    .item-img {
      width: 100%;
      img {
        width: 100%;
        border-radius: 15px;
      }
    }

    .item-des {
      width: 95%;
      padding: 10px;
    }

    .item-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-artist {
      color: gray;
      font-size: 14px;
      margin-top: 10px;
    }

    .playNum {
      width: 100%;
      position: absolute;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0;
      right: 0;
      text-align: right;
      border-radius: 15px 15px 0 0;

      span {
        margin-right: 10px;
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
