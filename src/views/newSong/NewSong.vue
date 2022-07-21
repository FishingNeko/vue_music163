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
    <!-- 表格音乐栏 -->
    <el-table :data="songList" stripe style="width: 100%" border>
      <!-- index -->
      <el-table-column type="index" label="#" width="40"> </el-table-column>
      <!-- 专辑图片 -->
      <el-table-column label="封面" type="index" width="240">
        <template v-slot="scope">
          <img v-lazy="scope.row.album.picUrl" alt="" @click="playMusic(scope.row)" />
        </template>
      </el-table-column>
      <!-- 歌名 -->
      <el-table-column prop="name" label="歌名" width="180"> </el-table-column>
      <!-- 歌手名 -->
      <el-table-column prop="album.artists[0].name" label="歌手" width="180">
      </el-table-column>
      <!-- 专辑名 -->
      <el-table-column prop="album.name" label="专辑"> </el-table-column>
      <!-- 音乐时长 -->
      <el-table-column label="时长">
        <template v-slot="scope">
          {{ scope.row.duration | formatDuration }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqNewSong, reqNewSongUrl } from '@/api/newSong'
export default {
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
    },
    // 播放音乐
    playMusic(row) {
      console.log(row);
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
    background-color: rgb(232, 230, 230);
  }
}

.cell > img {
  width: 70%;
  border-radius: 15px;
  cursor: pointer;
}
</style>
