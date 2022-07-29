<template>
  <!-- 表格音乐栏 -->
  <el-table
    :data="songList"
    stripe
    style="width: 100%"
    border
    @row-click="handleRow"
  >
    <!-- index -->
    <el-table-column type="index" label="#" width="40"> </el-table-column>
    <!-- 专辑图片-可选显示 -->
    <el-table-column label="封面" type="index" v-if="showImage" width="180">
      <template v-slot="scope">
        <img v-lazy="dataType ? scope.row.album.picUrl : scope.row.al.picUrl" />
      </template>
    </el-table-column>
    <!-- 歌名 -->
    <el-table-column prop="name" label="歌名"> </el-table-column>
    <!-- 歌手名 -->
    <el-table-column label="歌手">
      <template v-slot="scope">
        <div>
          {{ dataType ? scope.row.artists[0].name : scope.row.ar[0].name }}
        </div>
      </template>
    </el-table-column>
    <!-- 专辑名 -->
    <el-table-column label="专辑">
      <template v-slot="scope">
        <div>
          {{ dataType ? scope.row.album.name : scope.row.al.name }}
        </div>
      </template>
    </el-table-column>
    <!-- 音乐时长 -->
    <el-table-column label="时长">
      <template v-slot="scope">
        {{ (scope.row.duration || scope.row.dt) | formatDuration }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapMutations } from 'vuex'
import { reqMusicLyric, reqNewSongUrl } from '@/api/newSong'
export default {
  data() {
    return {}
  },
  props: {
    // 表格数据
    songList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示图片栏
    showImage: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    // 后端传来的音乐表格有两种格式
    // 1 表示 scope.row.album.picUrl 格式，在搜索结果与最新音乐中
    // 0 表示 scope.row.al.picUrl 格式，在歌单中
    // n m m d !  写个der
    dataType: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 将新数据存储到 vuex 并传递到 APlayer 组件
    ...mapMutations('aPlayer', ['receive_music_data']),
    // 播放音乐
    async playMusic(row) {
      // 获取歌曲的 url 与 歌词
      const { data: resUrl } = await reqNewSongUrl(row.id)
      const { data: resLrc } = await reqMusicLyric(row.id)
      // 交给 APlayer 的数据对象
      const audio = {}
      audio.id = row.id
      audio.name = row.name
      audio.artist = this.dataType ? row.artists[0].name : row.ar[0].name
      audio.url = resUrl.data[0].url
      audio.cover = this.dataType ? row.album.picUrl : row.al.picUrl
      audio.lrc = resLrc.lrc.lyric
      this.receive_music_data(audio)
    },
    // 监听表格行的点击
    handleRow(row, event, column) {
      this.playMusic(row)
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
/deep/ .el-table__row {
  cursor: pointer;
}

.cell > img {
  width: 100px;
  border-radius: 15px;
  cursor: pointer;
}
</style>
