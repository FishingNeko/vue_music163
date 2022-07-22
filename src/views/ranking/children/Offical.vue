<template>
  <div class="container">
    <!-- 循环渲染排行榜前五个 -->
    <div class="item" v-for="(item, i) in specialRankingList" :key="i">
      <!-- 左侧图片区 -->
      <div class="container-img" @click="gpToDetail(item.id)">
        <img :src="item.coverImgUrl" class="item-img" />
        <div class="item-updateFrequency">{{ item.updateFrequency }}</div>
      </div>
      <!-- 右侧歌曲描述区 -->
      <div class="container-list">
        <div class="item-list" v-for="(item2, j) in item.tracks" :key="j"  @click="playMusic(item2)">
          <div class="item-name-container">
            <div
              class="item-song-ranking"
              :class="{ golden: j === 0, sliver: j === 1 ,cooper: j ===2}"
            >
              {{ j + 1 }}
            </div>
            <span class="item-song-name">{{ item2.first }}</span>
          </div>
          <span class="item-song-artists">{{ item2.second }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 播放音乐
    playMusic(item) {
      console.log(item);
    },
    // 前往排行榜详情
    gpToDetail(id) {
      this.$router.push(`/home/details/${id}`)
    }
  },
  props: {
    specialRankingList: []
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;

  .item {
    display: flex;
    margin: 10px 0;

    .container-img {
      position: relative;
      width: 200px;
      cursor: pointer;

      .item-img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }

      .item-updateFrequency {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 200%);
        font-size: 14px;
        color: #fff;
      }
    }

    .container-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .item-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 5%;
        cursor: pointer;

        .item-name-container {
          display: flex;
          align-items: center;

          .item-song-ranking {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 25px;
            border-radius: 15px;
            margin-right: 5px;
          }
        }
      }

      .item-list:hover {
        background-color: rgb(251, 248, 248);
      }
    }

    .golden {
      color: gold;
      border: 1px solid gold;
    }

    .sliver {
      color: rgb(146, 144, 141);
       border: 1px solid rgb(146, 144, 141);
    }

    .cooper {
       color: rgb(161, 129, 82);
       border: 1px solid rgb(161, 129, 82);
    }
  }
}
</style>
