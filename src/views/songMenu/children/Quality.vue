<template>
  <div class="container">
    <!-- 歌单区 -->
    <div class="item" v-for="item in playlists" :key="item.id">
      <!-- 左侧图片 -->
      <div class="item-img">
        <img :src="item.coverImgUrl" />
      </div>
      <!-- 右侧描述 -->
      <div class="item-des">
        <div class="item-des-icon">
          <i class="el-icon-medal"></i><span>精品歌单</span>
        </div>
        <span>{{ item.name }}</span>
        <span class="item-des-copywriter">{{ item.copywriter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    playlists: []
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 250px;
  position: relative;
  border-radius: 15px;
  background: repeating-linear-gradient(
    0deg,
    #0f2027 0%,
    #203a43 50%,
    #2c5364 100%
  );
  justify-content: space-around;
  align-items: center;

  .item {
    width: 40%;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    cursor: pointer;

    .item-img {
      height: 100%;
      img {
        border-radius: 15px;
        height: 100%;
      }
    }

    .item-des {
      margin-left: 20px;
      height: 120px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      color: white;

      .item-des-icon {
        width: 100px;
        border: 2px solid #ffc063;
        border-radius: 15px;
        color: #ffc063;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }

      .item-des-copywriter {
        color: rgb(209, 209, 209);
        font-size: 14px;
      }
    }
  }
}
</style>
