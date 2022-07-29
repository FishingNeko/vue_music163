<template>
  <div class="header-container">
    <!-- 标题 -->
    <div class="header-left">
      <i class="el-icon-menu" @click="scaleOrMove"></i>

      <div class="container-img">
        <a href="/"><img src="../../../assets/img/my-logo.png" alt="旅猫" /></a>
      </div>
    </div>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      v-model="searchVal"
      @keyup.enter.native="goSearch"
    ></el-input>
    <!-- 菜单 -->
    <el-menu
      v-if="isUpToHead"
      :default-active="activePath"
      router
      active-text-color="red"
      mode="horizontal"
      :collapse-transition="false"
    >
      <el-menu-item
        :index="item.path"
        v-for="(item, i) in menuList"
        :key="i"
        @click="upDataPath(item.path)"
      >
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
    <!-- 登录 -->
    <div class="header-right">
      <i class="el-icon-user"></i> <span>登录/注册</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 搜索的内容
      searchVal: '',
      menuList: [
        {
          path: '/home/personalization',
          title: '个性推荐'
        },
        {
          path: '/home/songMenu',
          title: '歌单推荐'
        },
        {
          path: '/home/newSong',
          title: '最新音乐'
        },
        {
          path: '/home/newMv',
          title: '最新mv'
        },
        {
          path: '/home/ranking',
          title: '排行榜'
        },
        {
          path: '/home/singer',
          title: '歌手'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('user', ['upDataPath', 'updataCollapse', 'updataUpToHead']),
    // 伸缩侧边栏或移动顶栏到侧边栏
    scaleOrMove() {
      // 如果是 导航栏在顶部
      // 由顶部 移动到 侧边
      if (this.isUpToHead) {
        this.updataUpToHead(false)
      }
      // 如果 导航栏在侧边
      // 开始伸缩模式
      else {
        this.updataCollapse(!this.isCollapse)
      }
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
  },
  computed: {
    ...mapState('user', ['activePath', 'isCollapse', 'isUpToHead'])
  }
}
</script>
<style lang="less" scoped>
.header-container {
  position: relative;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 2560px;
  overflow: hidden;

  .header-left {
    display: flex;
    width: 200px;
    height: 100%;
    align-items: center;

    i {
      display: block;
      cursor: pointer;
      margin-left: 20px;
    }

    .container-img {
      width: 100%;
      height: 60px;
      position: relative;

      img {
        position: absolute;
        height: 120px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .el-input__icon {
    font-size: 20px;
  }

  .el-input {
    width: 300px;
  }
  // scoped 对样式隔离,这里用 /deep/ 覆盖原样式
  /deep/ .el-input__inner {
    border-radius: 25px;
  }

  .header-right {
    position: absolute;
    right: 10%;
    font-size: 14px;
    cursor: pointer;
    color: rgb(243, 131, 109);
  }
}
</style>
