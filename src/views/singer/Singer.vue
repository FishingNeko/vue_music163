<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="container-nav">
      <span>类别:</span>
      <div
        class="item-nav"
        v-for="(item, i) in tabbarList.type"
        :key="i"
        :class="{ actived: item.id === params.type }"
        @click="tabbarClick(item.id, params.area)"
      >
        <button>{{ item.name }}</button>
      </div>
    </div>
    <div class="container-nav">
      <span>地区:</span>
      <div
        class="item-nav"
        v-for="(item, i) in tabbarList.area"
        :key="i"
        :class="{ actived: item.id === params.area }"
        @click="tabbarClick(params.type, item.id)"
      >
        <button>{{ item.name }}</button>
      </div>
    </div>
    <!-- 主体内容区 -->
    <div class="container-content">
      <div
        class="content-item globe-shadow-box"
        v-for="(item, j) in singerList"
        :key="j"
      >
        <img v-lazy="item.img1v1Url" />
        <div class="item-name globe-overflow-text">{{ item.name }}</div>
      </div>
    </div>
    <!-- 分也区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.num"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="this.params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="500"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import { reqSingerList } from '@/api/singer'
export default {
  data() {
    return {
      // 歌手列表
      singerList: [],
      // 请求参数
      /**
       * @param  /artist/list 歌手分类列表
       * @param  type  -1:全部    1:男歌手    2:女歌手   3:乐队
       * @param  area  -1:全部     7: 华语   96: 欧美    8: 日本    16: 韩国    0:其他
       * @param  limit 返回数量，默认为 30
       * @param  offset 偏移数量，用于分页，如：如：（页数-1）*30，一个30为极限的值，默认为0
       * @param initial 按首字母索引查找参数，如/artist/list?type=1&area=96&initial=b返回内容名称可字段概要为b或者拼音开头为b为顺序排列,热门传-1,#传0
       * **/
      params: {
        type: -1,
        area: -1,
        limit: 15,
        offset: 0,
        initial: -1
      },
      // 导航页数据
      tabbarList: {
        type: [
          { name: '全部', id: -1 },
          { name: '男歌手', id: 1 },
          { name: '女歌手', id: 2 },
          { name: '乐队组合', id: 3 }
        ],
        area: [
          { name: '全部', id: -1 },
          { name: '华语', id: 7 },
          { name: '欧美', id: 96 },
          { name: '日本', id: 8 },
          { name: '韩国', id: 16 },
          { name: '其它', id: 0 }
        ]
      }
    }
  },
  created() {
    this.getSingerList()
  },
  methods: {
    // 获取歌手信息
    async getSingerList() {
      const { data: res } = await reqSingerList(this.params)
      if (res.code !== 200) return this.$message.error('网络错误')
      this.singerList = res.artists
    },
    // 点击导航栏
    tabbarClick(type, area) {
      this.params.type = type
      this.params.area = area
      this.getSingerList()
    },
    // 监听当前页面的变化
    handleCurrentChange(val) {
      this.params.offset = (val - 1) * this.params.limit
      this.getSingerList()
    },
    // 监听分页大小的变化
    handleSizeChange(val) {
      this.params.limit = val
      this.getSingerList()
    }
  }
}
</script>

<style lang="less" scoped>
.container-nav {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;

  .item-nav {
    margin: 0 10px;
  }
}

.container-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .content-item {
    width: 18%;

    img {
      width: 100%;
    }
  }

  .content-box:last-child {
    margin-right: auto;
  }
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
