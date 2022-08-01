export default {
  namespaced: true,
  state: {
    // 播放音乐数据
    musicData: {}
  },
  mutations: {
    // 保存音乐播放信息
    receive_music_data(state, data) {
      state.musicData = data
    }
  }
}
