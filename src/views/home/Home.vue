<template>
  <div>home</div>
</template>
<script>
import { reqBanner } from '@/api/discover'
export default {
  data() {
    return {
      // 轮播图数据
      banner: []
    }
  },
  activated() {},
  watch: {},
  async created() {
    // const { data: banners } = await reqBanner()
    // this.banners = banners.banners

  },
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped></style>
