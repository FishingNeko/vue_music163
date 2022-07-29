<template>
  <div class="container">
    <div class="container-video">
      <video controls :src="url" autoplay></video>
    </div>
    <!-- mv详情区 -->
    <div class="container-detail">
      <!-- 标题 -->
      <h1>{{ mvDetail.name }}</h1>
      <!-- 播放信息 + 收藏等活动选项 -->
      <div class="container-info">
        <div class="info-box">
          <!-- 发布时间 + 播放量 -->
          <span>{{ mvDetail.playCount | ellipsisPlayVolume }}次观看</span>
          <span class="individe">•</span>
          <span>{{ mvDetail.publishTime }}</span>
        </div>
        <!-- 收藏 + 分享按钮 -->
        <div class="shareBox">
          <div class="praise red" @click="collection">
            <i class="iconfont icon-icon"></i>
            {{ mvInfo.likedCount | ellipsisPlayVolume }}
          </div>
          <div class="share red" @click="share">
            <i class="iconfont icon-shoucang1"></i>
            {{ mvInfo.shareCount | ellipsisPlayVolume }}
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 作者信息区 -->
      <div class="container-artists" v-if="mvDetail.artists">
        <!-- 头像 -->
        <div class="avatar" @click="goToArtist">
          <img :src="mvDetail.artists[0].img1v1Url" alt="" />
        </div>
        <!-- 基本信息与订阅 -->
        <div class="container-base">
          <div class="container-top">
            <div class="base-info" @click="goToArtist">
              <!-- 作者名 -->
              {{ mvDetail.artists[0].name }}
            </div>
            <!-- 订阅按钮 -->
            <div class="btn-sub" @click="sub">订阅</div>
          </div>
          <!-- 描述文本 -->
          <div class="container-bottom">
            {{ mvDetail.desc }}
          </div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    mvDetail: {},
    mvInfo: {}
  },
  methods: {
    // 收藏
    collection() {
      this.$message.warning('开发中...')
    },
    // 分享
    share() {
      this.$message.warning('开发中...')
    },
    // 前往作者详情页
    goToArtist() {
      this.$message.warning('开发中...')
    },
    // 订阅作者
    sub() {
      this.$message.warning('开发中...')
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
.container {
  display: flex;
  flex-direction: column;
  .container-video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .container-detail {
    width: 100%;

    .container-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;

      .individe {
        margin: 0 10px;
      }

      .shareBox {
        display: flex;

        .praise {
          margin-right: 10px;
        }

        .red {
          cursor: pointer;

          i {
            font-size: 20px;
          }
        }

        .red:hover {
          color: red;
        }
      }
    }

    .container-artists {
      display: flex;

      .avatar {
        width: 10%;
        display: flex;
        cursor: pointer;
        img {
          width: 56px;
          border-radius: 50%;
          margin: auto;
          height: 56px;
        }
      }

      .container-base {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
      }
      .container-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .base-info {
          cursor: pointer;
        }

        .btn-sub {
          padding: 5px 10px;
          color: #fff;
          background-color: red;
          cursor: pointer;
          height: 24px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
