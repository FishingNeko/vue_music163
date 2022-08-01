<template>
  <el-container>
    <!-- 头部导航区 -->
    <el-header class="el-header">
      <Header></Header>
    </el-header>
    <el-container class="container-middle">
      <!-- 侧边栏导航区 -->
      <el-aside
        :width="isCollapse ? 58 + 'px' : 200 + 'px'"
        v-show="!isUpToHead"
      >
        <Aside></Aside>
      </el-aside>
      <!-- 内容主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 音乐播放栏 -->
    <APlayer></APlayer>
  </el-container>
</template>
<script>
import Header from './children/Header.vue'
import Aside from './children/Aside.vue'
import APlayer from '@/components/APlayer.vue'
import { mapState } from 'vuex'
export default {
  components: { Header, Aside, APlayer },
  computed: {
    ...mapState('user', ['isCollapse', 'isUpToHead'])
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color:#fff;
  width: 100%;
  border-bottom: 1px rgba(200, 200, 200, 0.3) solid;
}

.el-container {
  height: 100%;
}

.container-middle {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.el-aside {
  border-right: 1px rgba(200, 200, 200, 0.3) solid;
  transition: width 0.3s;
}

.el-main {
  padding: 10px 8% 100px;
  width: 100%;
  max-width: 2560px;
}
</style>
