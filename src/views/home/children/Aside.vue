<template>
  <div>
    <!-- 导航栏 -->
    <el-menu
      :default-active="activePath"
      router
      active-text-color="red"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item
        :index="item.path"
        v-for="(item, i) in menuList"
        :key="i"
        @click="upDataPath(item.path)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-divider></el-divider>
      <!-- 移动到顶栏按钮 -->
      <el-menu-item @click="updataUpToHead(true)" class="btn-to-head">
        <i class="el-icon-arrow-up"></i>
        <span slot="title">移至顶栏</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
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
        {
          path: '/home/songMenu',
          title: '歌单推荐',
          icon: 'iconfont icon-gedan'
        },
        {
          path: '/home/newSong',
          title: '最新音乐',
          icon: 'iconfont icon-yinle1'
        },
        {
          path: '/home/newMv',
          title: '最新mv',
          icon: 'iconfont icon-bofangMV'
        },
        {
          path: '/home/ranking',
          title: '排行榜',
          icon: 'iconfont icon-paihang'
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
    ...mapMutations('user', ['upDataPath', 'updataUpToHead'])
  },
  computed: {
    ...mapState('user', ['activePath', 'isCollapse', 'isUpToHead'])
  }
}
</script>
<style lang="less" scoped>
.el-menu i {
  width: 18px;
  height: 18px;
  font-size: 18px;
  margin-right: 20px;
}

.btn-to-head {
  color: #9499a0;
}
</style>
