<template>
  <div>
    <!-- 上方描述区 -->
    <SongMenuHeader :playList="songDetailList" v-if="status"></SongMenuHeader>
    <!-- 下方内容区 -->
    <SongMenuContent :musicList="musicList"></SongMenuContent>
  </div>
</template>

<script>
import { reqSongMenuDettail } from '@/api/discover'
import { reqSongDetail } from '@/api/songMenu'

import SongMenuHeader from './children/SongMenuHeader.vue'
import SongMenuContent from './children/SongMenuContent.vue'
export default {
  components: {
    SongMenuHeader,
    SongMenuContent
  },
  data() {
    return {
      // 歌单详情
      songDetailList: [],
      // 歌单的歌曲
      musicList: [],
      // 在获取完数据后再传值
      // 解决成功渲染控制台却报 undefined 的问题
      status: false
    }
  },
  created() {
    let getId = window.sessionStorage.getItem('id')
    this.getSongDetail(getId)
  },
  methods: {
    // 获取歌单详情
    getSongDetail(id) {
      reqSongMenuDettail(id).then((res) => {
        this.songDetailList = res.data.playlist
        this.status = true
        let arr = []
        res.data.playlist.trackIds.find((item) => {
          arr.push(item.id)
        })
        reqSongDetail(arr).then((res) => {
          this.musicList = res.data.songs
        })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
