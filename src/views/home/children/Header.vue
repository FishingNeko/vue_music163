<template>
  <div class="header-container">
    <!-- 标题 -->
    <div class="header-left">
      <i class="el-icon-menu" @click="scaleOrMove"></i>
      <div class="container-img">
        <a href="/"
          ><img
            src="https://image.xumaobin.xyz/2022/07/31/d3ab73bcb59a7.png"
            alt="旅猫"
        /></a>
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
    <!-- 信息栏 -->
    <div class="header-right">
      <!-- 登录后的头像 -->
      <div class="userImg" v-if="userInfo.profile.avatarUrl">
        <el-dropdown placement="bottom" @command="handleCommand">
          <img :src="userInfo.profile.avatarUrl" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout"
              ><i class="iconfont icon-ico_dengchu"></i>
              退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 未登录的信息 -->
      <div class="login" @click="login" v-else>
        <i class="el-icon-user"></i> <span>登录</span>
      </div>
      <!-- 其它站点 -->
      <el-dropdown placement="bottom">
        <div class="website">
          <span> 关于我<i class="el-icon-arrow-down el-icon--right"></i> </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a href="https://gitee.com/aubrey-xu/vue_music163" target="blank"
              ><i class="iconfont icon-gitee"></i> 本站码云</a
            >
          </el-dropdown-item>
          <el-dropdown-item
            ><a href="http://manage.xumaobin.xyz" target="blank"
              >后台管理系统</a
            ></el-dropdown-item
          >
          <el-dropdown-item divided
            ><a href="https://blog.xumaobin.xyz" target="blank"
              >个人博客</a
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><a href="https://image.xumaobin.xyz" target="blank">免费图床</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reqLogout } from '@/api/user'
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
    ...mapMutations('user', [
      'upDataPath',
      'updataCollapse',
      'updataUpToHead',
      'updataUserInfo'
    ]),
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
    },
    // 前往登录页
    login() {
      this.$router.push('/login')
    },
    // 登出
    async logout() {
      const token = window.sessionStorage.getItem('token')
      const { data: res } = await reqLogout(token)
      if (res.code !== 200) return this.$message.error('网络异常')
      // 移除登录信息
      this.$message.success('登出成功')
      this.updataUserInfo({ profile: {} })
      window.sessionStorage.removeItem('token')
    },
    // 监听下拉栏的点击
    handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      }
    }
  },
  computed: {
    ...mapState('user', ['activePath', 'isCollapse', 'isUpToHead', 'userInfo'])
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
      height: 100%;
      position: relative;

      img {
        position: absolute;
        height: 42px;
        top: 48%;
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

  /deep/ .el-input__inner {
    border-radius: 25px;
  }

  .header-right {
    position: absolute;
    display: flex;
    right: 10%;
    font-size: 14px;
    cursor: pointer;
    align-items: center;
    color: rgb(243, 131, 109);

    .userImg {
      width: 42px;
      height: 42px;
      margin-right: 10px;
      img {
        border-radius: 50%;
        height: 42px;
        width: 42px;
        border: 1px solid pink;
      }
    }

    .login {
      margin-right: 10px;
    }

    .gitee {
      color: red;
      margin: 0 10px;
    }
  }
}
</style>
