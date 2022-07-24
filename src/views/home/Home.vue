<template>
  <el-container>
    <!-- 头部导航区 -->
    <el-header class="el-header">
      <Header></Header>
    </el-header>
    <el-container>
      <!-- 侧边栏导航区 -->
      <el-aside width="200px" class="el-aside">
        <Aside></Aside>
      </el-aside>
      <!-- 内容主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './children/Header.vue'
import Aside from './children/Aside.vue'
export default {
  components: { Header, Aside },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: rgba(249, 249, 249, 0.5);
  border-bottom: 1px red solid;
}

.el-container {
  height: 100%;
  overflow: hidden;
}
.el-aside {
  border-right: 1px rgba(200, 200, 200, 0.3) solid;
}

.el-main {
  padding: 10px 5% 100px;
}
</style>
