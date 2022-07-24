<template>
  <div>
    <h2>官方榜</h2>
    <!--  -->
    <Offical :specialRankingList="specialRankingList"></Offical>
    <h2>全球榜</h2>
    <RecommendList :RecommendList="otherRankingList" :title="false" :myWidth="18"></RecommendList>
  </div>
</template>

<script>
import { reqRankingList } from '@/api/ranking'

import Offical from './children/Offical.vue'
import RecommendList from '@/components/RecommendList.vue'
export default {
  components: { Offical, RecommendList},
  data() {
    return {
      // 排行榜数据
      rankingList: []
    }
  },
  computed: {
    // 前五个特殊排行
    specialRankingList() {
      return this.rankingList.slice(0, 4)
    },
    // 其他排行
    otherRankingList() {
      return this.rankingList.slice(4, this.rankingList.length - 1)
    }
  },
  async created() {
    const { data: res } = await reqRankingList()
    if (res.code !== 200) return this.$message.error('网络错误')
    this.rankingList = res.list
  },
  methods: {}
}
</script> 

<style lang="less" scoped></style>
