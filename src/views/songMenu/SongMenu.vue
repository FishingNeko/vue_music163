<template>
  <div>
    <!-- 精品歌单推荐区 -->
    <Quality :playlists="playlists"></Quality>
    <!-- 歌单分类区 -->
    <Cate></Cate>
  </div>
</template>

<script>
import {reqHighQuality} from '@/api/songMenu'

import Quality from './children/Quality.vue'
import Cate from './children/Cate.vue'
export default {
  data () {
    return {
      playlists: []
  }
  },
  components: {
    Quality,
    Cate
  },
  async created () {
    const { data: playlists} = await reqHighQuality()
    this.playlists = playlists.playlists
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
