<template>
  <div>
    <!-- 导航栏 -->
    <el-menu
      default-active="/home/personalization"
      @open="handleOpen"
      @close="handleClose"
      router
      text-color=""
      active-text-color="red"
    >
      <el-menu-item :index="item.path" v-for="(item, i) in menuList" :key="i">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 导航栏数据
      menuList: [
        {
          path: '/home/personalization',
          title: '个性推荐',
          icon: 'iconfont icon-shouye'
        },
        { path: '/home/songMenu', title: '歌单推荐', icon: 'el-icon-reading' },
        { path: '/home/newSong', title: '最新音乐', icon: 'iconfont icon-yinle' },
        {
          path: '/home/newMv',
          title: '最新mv',
          icon: 'iconfont icon-bofangMV'
        },
        {
          path: '/home/ranking',
          title: '排行榜',
          icon: 'el-icon-trophy'
        },
        {
          path: '/home/singer',
          title: '歌手',
          icon: 'iconfont icon-changge'
        }
      ]
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>
<style lang="less" scoped>
.el-menu-item > i {
  width: 18px;
  height: 18px;
  font-size: 18px;
}

// 与 element-ui 图标统一
.iconfont {
  font-size: 18px;
  margin-right: 5px;
}
</style>
