<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel
      :interval="4000"
      type="card"
      height="250px"
      class="swipper"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item, i) in swipperList"
        :key="i"
        class="swipper-item"
        @click="goPlayById(item)"
      >
        <!-- 标题 -->
        <div class="swipper-title">
          <span>{{ item.typeTitle }}</span>
        </div>
        <!-- 图片 -->
        <img :src="item.imageUrl" class="swipper-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  methods: {
    // 通过 ID 前往播放页
    goPlayById(item) {
      window.sessionStorage.setItem('id', item.targetId)
      this.$router.push(`/home/detail/?id=${item.targetId}`)
    }
  },
  props: {
    // 轮播图的数据
    swipperList: []
  }
}
</script>
<style lang="less" scoped>
.swipper {
  position: relative;

  .swipper-item {
    height: 100%;
    overflow: hidden;

    .swipper-title {
      width: 70px;
      position: absolute;
      text-align: center;
      right: 0;
      line-height: 20px;
      height: 20px;
      bottom: 0;
      font-size: 12px;
      color: #fff;
      background-color: red;
      border-radius: 15px 0 15px 0;
    }

    .swipper-img {
      border-radius: 15px;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
