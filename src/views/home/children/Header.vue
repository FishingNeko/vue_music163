<template>
  <div class="header-container">
    <!-- 标题 -->
    <div class="header-left">
      <div class="img-container">
        <a href="/"
          ><img src="../../../assets/img/网易云音乐-01.png" class="header-img"
        /></a>
      </div>
      <!-- 前进后退 -->
      <div class="history">
        <el-button
          @click="go(-1)"
          icon="el-icon-arrow-left"
          size="mini"
          circle
          type="info"
        ></el-button>
        <el-button
          @click="go(1)"
          icon="el-icon-arrow-right"
          size="mini"
          circle
          type="info"
        ></el-button>
      </div>
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchVal"
        @keyup.enter.native="goSearch"
      ></el-input>
    </div>
    <!-- 登录 -->
    <div class="header-right">登录/注册</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索的内容
      searchVal: ''
    }
  },
  methods: {
    // 前进后退
    go(index) {
      window.history.go(index)
    },
    // 前往搜索页
    goSearch() {
      // 去除首尾空格
      this.searchVal = this.searchVal.trim()
      if (this.searchVal) {
        this.$router.push(`/home/search?keywords=${this.searchVal}`)
        // 必须在如路由跳转后才能 $emit serach 标志
        // 此时组件创建 $on 监听 serach
        this.$bus.$emit('search')
      } else return this.$message.warning('请输入要搜索的内容')
    }
  }
}
</script>
<style lang="less" scoped>
.header-container {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 2560px;

  .header-left {
    display: flex;
    width: 600px;
    height: 100%;
    justify-content: space-around;
    align-items: center;

    .el-button > i {
      font-size: 18px;
    }

    .img-container {
      height: 250%;
      .header-img {
        height: 100%;
      }
    }
    .el-input {
      width: 300px;
    }
    // scoped 对样式隔离,这里用 /deep/ 覆盖原样式
    /deep/ .el-input__inner {
      border-radius: 25px;
    }
  }
}
</style>
