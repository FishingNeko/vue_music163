<template>
  <div>
    <!-- 轮播图区 -->
    <Swipper :swipperList="swipperList"></Swipper>
    <!-- 歌单推荐 -->
    <RecommendList :RecommendList="RecommendList"></RecommendList>
    <!-- 最新音乐 -->
    <NewSong :newSongList="newSongList"></NewSong>
    <!-- 最新 MV -->
    <NewMv :newMvList="newMvList"></NewMv>
  </div>
</template>
<script>
import Swipper from './children/Swipper.vue'
import RecommendList from '../../components/RecommendList.vue'
import NewSong from './children/NewSong.vue'
import NewMv from '../../components/Mv.vue'

import {
  reqBanner,
  reqRecommendList,
  reqNewMusic,
  reqNewMV
} from '@/api/discover'
export default {
  data() {
    return {
      // 轮播图数据
      swipperList: [],
      // 推荐歌单数据
      RecommendList: [],
      // 最新歌曲
      newSongList: [],
      // 最新 MV
      newMvList: []
    }
  },
  components: {
    Swipper,
    RecommendList,
    NewSong,
    NewMv
  },
  async created() {
    // const { data: banners } = await reqBanner()
    // const { data: result } = await reqRecommendList()
    // const { data: songList } = await reqNewMusic()
    // const { data: mvList } = await reqNewMV()
    // this.swipperList = banners.banners
    // this.RecommendList = result.result
    // this.newSongList = songList.result
    // this.newMvList = mvList.result.slice(0, 3)
    // if (banners.code !== 200) return this.$message('网络错误!')
  }
}
</script>
<style lang="less" scoped></style>
