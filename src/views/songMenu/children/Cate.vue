<template>
  <div>
    <!-- 分类栏 -->
    <div class="tab-bar-container">
      <div
        class="tab-bar-item"
        v-for="(item, i) in tabbarList"
        :key="i"
        @click="getNewCate(item)"
        :class="{ actived: params.cate === item }"
      >
        <button>{{ item }}</button>
      </div>
    </div>
    <!-- 分类内容 -->
    <SongList
      :RecommendList="RecommendList"
      :myWidth="18"
    ></SongList>
    <!-- 底部切页栏 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.num"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="this.params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.params.total"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import SongList from '../../../components/SongList.vue'

import { reqSongMenu } from '@/api/songMenu'
export default {
  data() {
    return {
      // 分类栏的数据
      tabbarList: [
        '全部',
        '粤语',
        'ACG',
        '华语',
        '流行',
        '欧美',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        '怀旧'
      ],
      // 推荐歌单
      RecommendList: [],
      // 请求参数
      params: {
        total: 0, // 获取的总数量
        num: 1, // 当前页
        cate: '全部', // 分类
        limit: 15, // 当前页显示的数据
        offset: 0 // 分页偏移量
      }
    }
  },
  components: {
    SongList
  },
  created() {
    this.getSongList()
  },
  methods: {
    // 根据标签获取新数据
    getNewCate(item) {
      this.params.cate = item
      this.params.num = 1
      this.getSongList()
    },
    // 根据参数获取新数据
    async getSongList() {
      const { data: res } = await reqSongMenu(
        this.params.limit,
        this.params.cate,
        this.params.offset
      )
      if (res.code !== 200) return this.$message.error('网络错误')
      this.RecommendList = res.playlists
      this.params.total = res.total
    },
    // 监听显示页面的改变
    handleSizeChange(val) {
      this.params.limit = val
      this.getSongList()
    },
    // 监听当前页面的改变
    handleCurrentChange(val) {
      this.params.num = val
      this.params.offset = (val - 1) * this.params.limit
      this.getSongList()
    }
  }
}
</script>

<style lang="less" scoped>
.tab-bar-container {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

button {
  border-radius: 20px;
  padding: 12px 20px;
  border: 1px solid #f1f2f3;
  background-color: #f6f7f8;
  cursor: pointer;
}

.actived > button {
  font-weight: bold;
  color: red;
}
</style>
