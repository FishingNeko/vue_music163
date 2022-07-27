<template>
  <div class="container">
    <!-- 左侧 MV 与评论区 -->
    <div class="container-left">
      <MyVideo :url="url" :mvDetail="mvDetail" :mvInfo="mvInfo"></MyVideo>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="热门" name="first">
          <Comment :commentList="mvComment.hotComments"> </Comment>
        </el-tab-pane>
        <el-tab-pane label="最新" name="second">
          <Comment :commentList="mvComment.comments"></Comment>
          <div class="btn" @click="showMore">查看更多</div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="container-right">
      <Similar :mvSimilar="mvSimilar" @getNewMv="getNewMv"></Similar>
    </div>
  </div>
</template>

<script>
import {
  reqMvUrl,
  reqMvDetail,
  reqMvSimilar,
  reqMvComment,
  reqMvInfo
} from '@/api/newMv'

import Comment from '@/components/CommentList.vue'

import MyVideo from './children/Video.vue'
import Similar from './children/Similar.vue'

export default {
  components: {
    MyVideo,
    Similar,
    Comment
  },
  data() {
    return {
      activeName: 'first',
      url: '',
      mvDetail: {},
      mvComment: {
        hotComments: [],
        comments: []
      },
      mvSimilar: {},
      mvInfo: {},
      // 评论的请求参数
      params: {
        id: 0,
        offset: 0
      }
    }
  },
  created() {
   this.getNewMv()
  },
  methods: {
    // 刷新
    getNewMv() {
      this.getMvSimilar()
      this.getMvComment()
      this.getMvInfo()
      this.getMvDetail()
      this.getMvData()
    },
    // 获取 MV 地址
    async getMvData() {
      const id = window.sessionStorage.getItem('id')
      const { data: mvData } = await reqMvUrl(id)
      this.url = mvData.data.url
      console.log(mvData)
    },
    // 获取 MV 细节
    async getMvDetail() {
      const id = window.sessionStorage.getItem('id')
      const { data: mvDetail } = await reqMvDetail(id)
      this.mvDetail = mvDetail.data
    },
    // 获取 MV 评论
    async getMvComment() {
      this.params.id = window.sessionStorage.getItem('id')
      const { data: mvComment } = await reqMvComment(this.params)
      this.mvComment.comments = [
        ...this.mvComment.comments,
        ...mvComment.comments
      ]
      this.mvComment.hotComments = mvComment.hotComments
        ? mvComment.hotComments
        : this.mvComment.hotComments
    },
    // 获取相识 MV 信息
    async getMvSimilar() {
      const id = window.sessionStorage.getItem('id')
      const { data: mvSimilar } = await reqMvSimilar(id)
      this.mvSimilar = mvSimilar.mvs
    },
    // MV 点赞分享等信息
    async getMvInfo() {
      const id = window.sessionStorage.getItem('id')
      const { data: mvInfo } = await reqMvInfo(id)
      this.mvInfo = mvInfo
    },
    // 监听评论栏切换
    handleClick(val) {
      this.activeName = val.name
    },
    // 显示更多热门评论
    showMore() {
      this.params.offset += 20
      this.getMvComment()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .container-left {
    width: 70%;

    .btn {
      margin: 0 auto;
      background: #fff;
      border-radius: 15px;
      padding: 5px 10px;
      cursor: pointer;
      width: 80px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #cfd4db;
    }

    .btn:hover {
      color: red;
    }
  }

  .container-right {
    width: 25%;
  }
}
</style>
