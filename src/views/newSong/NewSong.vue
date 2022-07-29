<template>
  <div>
    <!-- 分类栏 -->
    <div class="tab-bar-container">
      <div
        class="tab-bar-item"
        v-for="(item, i) in tabbarList"
        :key="i"
        @click="getNewSong(item)"
        :class="{ actived: barActived === item.title }"
      >
        <button>{{ item.title }}</button>
      </div>
    </div>
    <!-- 下方音乐表格 -->
   <SongTable :songList="songList" ></SongTable>
  </div>
</template>

<script>
import { reqNewSong} from '@/api/newSong'
import SongTable from '@/components/SongTable.vue'

export default {
  components: {
    SongTable
  },
  data() {
    return {
      // 新歌列表
      songList: [],
      // 导航栏数据
      tabbarList: [
        { title: '全部', type: 0 },
        { title: '华语', type: 7 },
        { title: '欧美', type: 96 },
        { title: '日本', type: 8 },
        { title: '韩国', type: 16 }
      ],
      // 选中的导航栏
      barActived: '全部'
    }
  },
  created() {
    this.getSongList()
  },
  methods: {
    // 点击tabbar
    getNewSong(item) {
      // 重置远中的tabbar
      this.barActived = item.title
      // 传参
      this.getSongList(item.type)
    },
    // 获取音乐列表
    async getSongList(type) {
      const { data: res } = await reqNewSong(type)
      if (res.code !== 200) return this.$message.error('网络错误')
      this.songList = res.data.splice(0, 30)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-bar-container {
  display: flex;
  justify-content: flex-start;
  .tab-bar-item {
    margin-right: 10px;
    button {
      border-radius: 20px;
      padding: 12px 20px;
      border: 1px solid #f1f2f3;
      background-color: #f6f7f8;
      cursor: pointer;
    }
  }

  .actived > button {
    font-weight: bold;
    color: red;
  }
}
</style>
