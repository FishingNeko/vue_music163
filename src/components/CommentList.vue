<template>
  <div>
    <!-- 发表评论区 -->
    <CommentSend></CommentSend>
    <!-- 其它用户评论区 -->
    <div class="container-get">
      <div class="item-hot" v-for="(item, i) in commentList" :key="i">
        <!-- 左侧用户头像 -->
        <div class="container-img">
          <img :src="item.user.avatarUrl" />
        </div>
        <!-- 右侧评论 -->
        <div class="item-content">
          <!-- 用户姓名 -->
          <div class="user-name">{{ item.user.nickname }}</div>
          <!-- 用户评论 -->
          <div class="user-content">{{ item.content }}</div>
          <!-- 发布时间 + 点赞 + 回复-->
          <div class="container-bottom">
            <span class="sub-time">{{ item.timeStr }}</span>
            <div class="like">
              <i class="iconfont icon-icon"></i>
              {{ item.likedCount }}
            </div>
            <span class="btn-reply" @click="reply">回复</span>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentSend from './CommentSend.vue'

export default {
  components: {
    CommentSend
  },
  props: {
    // 评论列表
    commentList: []
  },
  methods: {
    // 回复评论
    reply() {
      this.$message.warning('开发中...')
    }
  }
}
</script>

<style lang="less" scoped>
.container-get {
  width: 100%;

  .item-hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 10px 0;

    .container-img {
      display: flex;
      width: 100px;
      height: 100px;
      margin-right: 20px;

      img {
        margin: 0 auto;
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }

    .item-content {
      width: 80%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .user-name {
        width: 100%;
        font-size: 12px;
        font-weight: bold;
        line-height: 18px;
        padding-bottom: 4px;
        display: block;
        word-wrap: break-word;
        color: #6d757a;
      }

      .user-content {
        width: 100%;
        font-size: 14px;
      }

      .container-bottom {
        width: 100%;
        display: flex;
        align-items: center;
        color: #99a2aa;
        line-height: 14px;
        margin-top: 6px;
        font-size: 12px;

        .like {
          margin: 0 20px;
        }

        .btn-reply {
          display: block;
          cursor: pointer;
        }

        .btn-reply:hover {
          color: 'red';
          background-color: #e5e9ef;
        }
      }
    }
  }
}
</style>
