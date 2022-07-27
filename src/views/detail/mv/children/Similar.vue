<template>
  <div class="container" v-if="mvSimilar">
    <el-divider content-position="center">类似MV</el-divider>
    <div
      class="globe-shadow-box item"
      v-for="(item, i) in mvSimilar"
      :key="i"
      @click="goPlayById(item)"
    >
      <div class="container-img">
        <img :src="item.cover" />
        <!-- 时长 -->
        <div class="during">
          <span>{{ item.duration | formatDuration }}</span>
        </div>
        <PlayNum :playCount="item.playCount"></PlayNum>
      </div>
      <div class="info-box">
        <!-- 标题 -->
        <span class="title">{{ item.name }}</span>
        <!-- 作者 -->
        <span class="artist">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PlayNum from '@/components/PlayNum.vue'
export default {
  props: {
    mvSimilar: []
  },
  components: {
    PlayNum
  },
  filters: {
    formatDuration(duration) {
      // 分钟：向下取整，转为字符，不足两位前边补零
      const minute = Math.floor(duration / 1000 / 60)
        .toString()
        .padStart(2, '0')
      const second = Math.floor(duration % 60)
        .toString()
        .padStart(2, '0')
      return minute + ':' + second
    }
  },
  methods: {
    // 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id', item.id)
      this.$router.push(`/home/mvDetail/?id=${item.id}`)
      // 向父组件传递更新事件
      this.$emit('getNewMv')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .container-img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        border-radius: 10px 10px 0 0;
      }

      .during {
        color: #fff;
        position: absolute;
        top: 7px;
        font-size: 13px;
        z-index: 1;
        left: 10px;
      }
    }

    .info-box {
      margin-left: 10px;
      display: flex;
      flex-wrap: wrap;
      padding: 5px 0;

      span {
        width: 100%;
      }

      .title {
        font-size: 14px;
        width: 100%;
        height: 18px;
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 5px;
      }

      .artist {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
