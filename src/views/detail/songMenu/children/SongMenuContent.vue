<template>
  <div>
    <!-- 导航区 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'歌曲列表(' + musicList.length + ')'" name="first">
        <!-- 音乐表格 -->
        <SongTable :songList="musicList" :dataType="0"></SongTable>
      </el-tab-pane>
      <!-- 评论列表 -->
      <el-tab-pane :label="'评论(' + newComments.total + ')'" name="second">
        <el-tabs v-model="activeNameSon" @tab-click="handleClickSon">
          <el-tab-pane
            :label="'热门(' + hotComments.total + ')'"
            name="second-first"
          >
            <CommentList
              :commentList="hotComments.comments"
              :total="hotComments.total"
            ></CommentList>
            <div class="btn" @click="showMore" v-if="showBtn">查看更多</div>
          </el-tab-pane>
          <el-tab-pane
            :label="'最新(' + newComments.total + ')'"
            name="second-second"
          >
            <CommentList
              :commentList="newComments.comments"
              :total="newComments.total"
            ></CommentList>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[15, 30, 50]"
              :page-size="paramsNew.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="newComments.total"
              background
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reqCommentHot, reqCommentNew } from '@/api/songMenu'
import CommentList from '@/components/CommentList.vue'
import SongTable from '@/components/SongTable.vue'
export default {
  components: {
    CommentList,
    SongTable
  },
  props: {
    // 音乐列表
    musicList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      activeNameSon: 'second-first',
      // 请求参数
      paramsHot: {
        id: 0,
        type: 2,
        limit: 15,
        offset: 0
      },
      paramsNew: {
        id: 0,
        type: 2,
        limit: 15,
        offset: 0
      },
      // 当前页
      current: 1,
      // 热门歌曲
      hotComments: {
        comments: [],
        total: 0
      },
      // 最新歌曲
      newComments: {
        comments: [],
        total: 0
      },
      // 是否显示加载更多按钮
      showBtn: false
    }
  },
  created() {
    this.getCommentHot()
    this.getCommentNew()
  },
  methods: {
    //
    handleRow() {},
    // 监听 tab栏 的点击
    handleClick(e) {
      this.activeName = e.name
    },
    // 监听 tab子栏 的切换
    handleClickSon(e) {
      this.activeNameSon = e.name
    },
    // 播放音乐
    playMusic(e) {
      console.log(e)
    },
    // 监听分页大小的变化
    handleSizeChange(val) {
      this.paramsNew.limit = val
      this.getCommentNew()
    },
    // 监听当前页的变化
    handleCurrentChange(val) {
      this.current = val
      this.paramsNew.offset = (val - 1) * this.paramsNew.limit
      this.getCommentNew()
    },
    // 获取热门评论评论
    async getCommentHot() {
      this.paramsHot.id = window.sessionStorage.getItem('id')
      const { data: hot } = await reqCommentHot(this.paramsHot)
      // 连接可能的新数据
      this.hotComments.comments = [
        ...this.hotComments.comments,
        ...hot.hotComments
      ]
      this.hotComments.total = hot.total
      if (hot.total > 15) this.showBtn = true
    },
    // 获取最新评论评论
    async getCommentNew() {
      this.paramsNew.id = window.sessionStorage.getItem('id')
      const { data: newComment } = await reqCommentNew(this.paramsNew)
      this.newComments.comments = newComment.comments
      this.newComments.total = newComment.total
      // console.log(newComment.comments);
    },
    // 显示更多热门评论
    showMore() {
      this.params.offset += 10
      this.getCommentHot()
    }
  },
  filters: {
    // 格式化播放时间
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
  }
}
</script>

<style lang="less" scoped>
img {
  width: 120px;
  cursor: pointer;
}

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
</style>
