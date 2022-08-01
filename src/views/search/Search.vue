<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 单曲区 -->
      <el-tab-pane
        :label="'单曲(' + (song.total || 0) + ')'"
        name="first"
        v-if="song"
      >
        <SongTable :songList="song.song" :showImage="false"></SongTable>
        <el-pagination
          @size-change="handleSizeChangeSong"
          @current-change="handleCurrentChangeSong"
          :current-page="paramsSong.num"
          :page-sizes="[10, 30, 50]"
          :page-size="paramsSong.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="song.total"
          background
        >
        </el-pagination>
      </el-tab-pane>
      <!-- 歌单区 -->
      <el-tab-pane
        :label="'歌单(' + (songMenu.total || 0) + ')'"
        name="second"
        v-if="songMenu"
      >
        <SongMenu :RecommendList="songMenu.songMenu" :myWidth="18"></SongMenu>
        <el-pagination
          @size-change="handleSizeChangeSongMenu"
          @current-change="handleCurrentChangeSongMenu"
          :current-page="paramsSongMenu.num"
          :page-sizes="[10, 30, 50]"
          :page-size="paramsMv.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="songMenu.total"
          background
        >
        </el-pagination>
      </el-tab-pane>
      <!-- MV 区 -->
      <el-tab-pane
        :label="'MV(' + (mvList.total || 0) + ')'"
        name="third"
        v-if="mvList"
      >
        <MvList :newMvList="mvList.mvList" :myWidth="21"></MvList>
        <el-pagination
          @size-change="handleSizeChangeMv"
          @current-change="handleCurrentChangeMv"
          :current-page="paramsMv.num"
          :page-sizes="[10, 30, 50]"
          :page-size="paramsMv.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="mvList.total"
          background
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reqSearch } from '@/api/search'

import SongMenu from '@/components/SongList.vue'
import MvList from '@/components/MvList.vue'
import SongTable from '@/components/SongTable.vue'
export default {
  data() {
    return {
      // keywords 关键词 必选
      // limit : 返回数量 , 默认为 30
      // offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 :如下
      // ---
      // 歌曲:1
      // 歌单:1000
      // MV:1004
      // ---
      // 歌曲参数
      paramsSong: {
        keywords: '',
        limit: 10,
        offset: 0,
        type: 1,
        num: 1
      },
      //  歌单参数
      paramsSongMenu: {
        keywords: '',
        limit: 10,
        offset: 0,
        type: 1000,
        num: 1
      },
      //  mv 参数
      paramsMv: {
        keywords: '',
        limit: 10,
        offset: 0,
        type: 1004,
        num: 1
      },
      // 歌曲数据
      song: {
        song: [],
        total: 0
      },
      // 歌单数据
      songMenu: {
        songMenu: [],
        total: 0
      },
      // mv 数据
      mvList: {
        mvList: [],
        total: 0
      },
      // 触发的 tab 栏
      activeName: 'first'
    }
  },
  components: {
    SongMenu,
    MvList,
    SongTable
  },
  created() {
    this.getData()
    this.$bus.$on('search', () => {
      this.getData()
    })
  },
  beforeDestroy() {
    // 销毁监听事件
    this.$bus.$off('search')
  },
  methods: {
    // 刷新数据
    getData() {
      const keywords = this.$route.query.keywords
      this.paramsSong.keywords = keywords
      this.paramsSongMenu.keywords = keywords
      this.paramsMv.keywords = keywords
      this.getSongResult()
      this.getSongMenuResult()
      this.getMvResult()
    },
    // 获取 单曲 数据
    async getSongResult() {
      const { data: song } = await reqSearch(this.paramsSong)
      this.song.song = song.result.songs
      this.song.total = song.result.songCount
    },
    // 获取 歌单 数据
    async getSongMenuResult() {
      const { data: songMenu } = await reqSearch(this.paramsSongMenu)
      this.songMenu.songMenu = songMenu.result.playlists
      this.songMenu.total = songMenu.result.playlistCount
    },
    // 获取 MV 数据
    async getMvResult() {
      const { data: mv } = await reqSearch(this.paramsMv)
      this.mvList.mvList = mv.result.mvs
      this.mvList.total = mv.result.mvCount
    },
    // 监听 tab 栏切换
    handleClick(e) {
      this.activeName = e.name
    },
    handleSizeChangeSong(e) {
      this.paramsSong.limit = e
      this.getSongResult()
    },
    handleCurrentChangeSong(e) {
      this.paramsSong.num = e
      this.paramsSong.offset = (e - 1) * this.paramsSong.limit
      this.getSongResult()
    },
    handleSizeChangeSongMenu(e) {
      this.paramsSongMenu.limit = e
      this.getSongMenuResult()
    },
    handleCurrentChangeSongMenu(e) {
      this.paramsSongMenu.num = e
      this.paramsSongMenu.offset = (e - 1) * this.paramsSongMenu.limit
      this.getSongMenuResult()
    },
    handleSizeChangeMv(e) {
      this.paramsMv.limit = e
      this.getMvResult()
    },
    handleCurrentChangeMv(e) {
      this.paramsMv.num = e
      this.paramsMv.offset = (e - 1) * this.paramsMv.limit
      this.getMvResult()
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

<style lang="less" scoped></style>
