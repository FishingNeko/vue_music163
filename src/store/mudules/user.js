export default {
  namespaced: true,
  state: {
    // 存放用户资料
    userInfo: {
      profile: {}
      // myList: [],
      // subList: []
    },
    // 持久化存储,导航栏选中的路径
    activePath:
      window.sessionStorage.getItem('activePath') || '/home/personalization',
    // 导航栏是否伸缩
    isCollapse: true,
    // 导航栏是否移动到顶部
    isUpToHead: false
    // 持久化存储,登录凭证
    // token: window.sessionStorage.getItem('token') || ''
  },
  mutations: {
    // 更新导航栏路径
    upDataPath(state, path) {
      state.activePath = path
      window.sessionStorage.setItem('activePath', path)
    },
    // 更新导航栏伸缩状态
    updataCollapse(state, isCollapse) {
      state.isCollapse = isCollapse
    },
    // 更新导航栏位置状态
    updataUpToHead(state, isUpToHead) {
      state.isUpToHead = isUpToHead
    },
    // 更新用户信息
    updataUserInfo(state, userInfo) {
      state.userInfo.profile = userInfo.profile
      window.sessionStorage.setItem('userInfo', userInfo)
    }
    // 更新登录凭证
    // updataToken(state,token) {
    //   state.token = token
    //   window.sessionStorage.setItem('token', token)
    // }
  }
}
