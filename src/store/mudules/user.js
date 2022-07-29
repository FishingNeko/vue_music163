import { RECEIVE_USER_INFO } from '../type'

import { reqLoginState } from '@/api/user'

export default {
  namespaced: true,
  state: {
    // 存放用户资料
    userInfo: {
      profile: {},
      myList: [],
      subList: []
    },
    // 持久化存储,导航栏选中的路径
    activePath:
      window.sessionStorage.getItem('activePath') || '/home/personalization',
    // 导航栏是否伸缩
    isCollapse: true,
    // 导航栏是否移动到顶部
    isUpToHead: false
  },
  mutations: {
    // 获取用户登录信息
    [RECEIVE_USER_INFO](state, payload) {
      state.userInfo = payload
    },
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
    }
  },
  // getters: {
  //   activePath: (state) => state.activePath
  // },
  actions: {
    // 获取用户信息
    async getUserData({ commit }) {
      const {
        data: { data: res }
      } = await reqLoginState()
      commit(RECEIVE_USER_INFO, res.profile)
    }
  }
}
