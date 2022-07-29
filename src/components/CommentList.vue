<template>
  <div>
    <!-- 发表评论区 -->
    <CommentSend></CommentSend>
    <el-divider></el-divider>
    <!-- 空评论提醒 -->
    <div class="empty" v-if="!commentList.length">
      空空如也~快来当第一条评论吧
    </div>
    <!-- 其它用户评论区 -->
    <div class="container-get">
      <div class="item" v-for="(item, i) in commentList" :key="i">
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
            <div class="like" @click="like">
              <i class="iconfont icon-icon"></i>
              {{ item.likedCount }}
            </div>
            <span class="btn-reply" @click="reply">回复</span>
          </div>
          <!-- 其它人的回复 -->
          <div class="container-get reply">
            <div
              v-for="(item2, i) in item.beReplied"
              :key="i + 'reply'"
              class="item"
            >
              <!-- 左侧用户头像 -->
              <div class="container-img-son">
                <img :src="item2.user.avatarUrl" />
              </div>
              <!-- 右侧评论 -->
              <div class="item-content">
                <!-- 用户姓名 -->
                <div class="user-name">{{ item2.user.nickname }}</div>
                <!-- 用户评论 -->
                <div class="user-content">{{ item2.content }}</div>
                <!-- 回复-->
                <div class="container-bottom">
                  <span class="btn-reply" @click="reply">回复</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
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
    },
    // 点赞
    like() {
      this.$message.warning('开发中...')
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  margin: 20px auto;
  padding: 5px 10px;
  color: #6d757a;
  font-size: 14px;
  text-align: center;
}
.container-get {
  width: 100%;

  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 10px 0;

    .container-img {
      display: flex;
      width: 10%;

      img {
        margin: 0 auto;
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }
    }

    .container-img-son {
      display: flex;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin: 0 auto;
      }
    }

    .item-content {
      width: 90%;
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
          cursor: pointer;
        }

        .like:hover {
          color: red;
        }

        .btn-reply {
          display: block;
          cursor: pointer;
          padding: 0 5px;
          border-radius: 5px;
        }

        .btn-reply:hover {
          color: 'red';
          background-color: #e5e9ef;
        }
      }

      .reply {
        background-color: #f2f3f5;
        border-radius: 4px;
      }
    }
  }
}
</style>
