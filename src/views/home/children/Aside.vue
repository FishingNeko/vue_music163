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
    </el-menu>
    <el-divider></el-divider>
    <div class="up" @click="upToHead">
      <i class="el-icon-arrow-up"></i>
      <span>{{ isCollapse ? '' : '移至顶栏' }}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      spanText: '移至顶栏',
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
    ...mapMutations('user', ['upDataPath', 'updataUpToHead']),
    // 移动到顶栏
    upToHead() {
      this.updataUpToHead(1)
      console.log('触发顶栏');
    }
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

.up {
  padding: 0 20px;
  cursor: pointer;

  i {
    width: 18px;
    height: 18px;
    font-size: 18px;
    margin-right: 20px;
  }

  span {
    font-size: 12px;
    color: #303133;
    cursor: pointer;
  }
}

.up:hover {
  color: red;
  span {
    color: red;
  }
}
</style>
