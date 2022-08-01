<template>
  <div>
    <!-- 轮播图区 -->
    <Swipper :swipperList="swipperList"></Swipper>
    <!-- 歌单推荐 -->
    <h3>
      <router-link to="/home/songMenu">
        歌单推荐
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <RecommendList :RecommendList="RecommendList"></RecommendList>
    <el-divider></el-divider>
    <!-- 最新音乐 -->
    <h3>
      <router-link to="/home/newSong">
        最新音乐
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <NewSong :newSongList="newSongList"></NewSong>
    <el-divider></el-divider>
    <!-- 最新 MV -->
    <h3>
      <router-link to="/home/newMv">
        最新MV
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h3>
    <NewMv :newMvList="newMvList"></NewMv>
  </div>
</template>
<script>
import Swipper from './children/Swipper.vue'
import RecommendList from '../../components/SongList.vue'
import NewSong from './children/NewSong.vue'
import NewMv from '../../components/MvList.vue'

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
    const { data: banners } = await reqBanner()
    const { data: result } = await reqRecommendList()
    const { data: songList } = await reqNewMusic()
    const { data: mvList } = await reqNewMV()
    this.swipperList = banners.banners
    this.RecommendList = result.result
    this.newSongList = songList.result
    this.newMvList = mvList.result.slice(0, 3)
    if (banners.code !== 200) return this.$message('网络错误!')
  }
}
</script>
<style lang="less" scoped></style>
