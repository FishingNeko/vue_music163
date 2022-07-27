<template>
  <div class="container">
    <!-- 左侧图片区 -->
    <div class="container-img">
      <img :src="playList.coverImgUrl" />
      <PlauNum :playCount="playList.playCount"></PlauNum>
      <!-- 标签 -->
      <div class="tags-box">
        <div class="tags-item" v-for="(item, i) in playList.tags" :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 细节区 -->
    <div class="container-detail">
      <!-- 歌单名 -->
      <h2>{{ playList.name }}</h2>
      <!-- 作者信息区 -->
      <div class="artist-box">
        <!-- 头像 -->
        <img :src="playList.creator.avatarUrl" />
        <!-- 作者名 -->
        <span class="name">{{ playList.creator.nickname }}</span>
        <!-- 创建时间 -->
        <span>{{ playList.createTime | dateShow }}创建</span>
      </div>
      <!-- 播放按钮与加入播放列表 -->
      <div class="btn">
        <button class="playBtn" @click="playThisSongMenu">
          <i class="el-icon-video-play"> </i> 播放所有
        </button>
        <el-tooltip
          class="item"
          effect="dark"
          content="添加到我的歌单"
          placement="top"
          @click="addToMySongMenu"
        >
          <button class="addBtn">+</button>
        </el-tooltip>
      </div>
      <OverFlowText
        :hiddenBtn="true"
        :info="playList.description"
        :lineClamp="6"
      ></OverFlowText>
    </div>
  </div>
</template>

<script>
// import { reqSongMenuDettail } from '@/api/discover'
import { dateFormat } from '@/lib/utils'

import PlauNum from '@/components/PlayNum.vue'
import OverFlowText from '@/components/OverFlowText.vue'
export default {
  components: {
    PlauNum,
    OverFlowText
  },
  props: {
    // 歌单信息
    playList: {}
  },
  data() {
    return {
      // 描述是否展开
      isOpen: false,
      des: '查看更多'
    }
  },
  methods: {
    // 显示所有描述
    showAll() {
      if (this.des === '查看更多') {
        this.des = '收起'
        this.isOpen = true
      } else {
        this.des = '查看更多'
        this.isOpen = false
      }
    },
    // 添加到我的歌单
    addToMySongMenu() {
      this.$message.warning('开发中...')
    },
    // 播放该歌单的所有歌曲
    playThisSongMenu() {
      this.$message.warning('开发中...')
    }
  },
  filters: {
    // 时间戳转化为 2001-9-29 格式
    dateShow(value) {
      const date = new Date(value * 1)
      return dateFormat(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-start;

  .container-img {
    position: relative;
    margin-right: 20px;
    width: 200px;
    img {
      border-radius: 10px;
      width: 200px;
      height: 200px;
    }

    .tags-box {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 30px;

      .tags-item {
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        width: auto;
        padding: 0 10px;
        border: 1px solid #f1f2f3;
        background-color: #f6f7f8;
        font-size: 12px;
      }
    }

    .introduction {
      max-width: 100px;
    }
  }

  .container-detail {
    display: flex;
    flex-wrap: wrap;

    .artist-box {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .name {
        color: rgb(80, 125, 175);
        margin-right: 10px;
      }
    }

    .btn {
      display: flex;
      align-items: center;
      height: 30px;
      width: 100%;

      .playBtn {
        color: #fff;
        background-color: red;
        border-radius: 15px 0 0 15px;
        border: none;
        border-right: 1px solid gray;
        height: 100%;
        cursor: pointer;
      }
      .addBtn {
        color: #fff;
        background-color: red;
        border-radius: 0 15px 15px 0;
        border: none;
        height: 100%;
        cursor: pointer;
      }
    }

    .introduction {
      width: 100%;
      line-height: 18px;
      white-space: pre-wrap;
      height: 60px;
      font-size: 14px;
      overflow: hidden;
    }

    .open {
      height: auto;
    }
  }
}
</style>
