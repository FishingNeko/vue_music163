import {
  RECEIVE_MUSIC_MV,
  // RECEIVE_MUSIC_DATA,
  RECEIVE_MUSIC_LIST,
  SAVE_SONGS_ID,
  RECEIVE_SONGS_DETAIL
} from '../type'

import { reqMusicLyric, reqNewSongUrl } from '@/api/newSong'

export default {
  namespaced: true,
  state: {
    // 歌单音乐数组
    musicList: [],
    // 保存mv信息
    mv_Data: {},
    // 存放歌单列表
    songDetailList: {},
    // 保存歌单ID_sessionStorage代替
    songId: '',
    // 播放音乐数据
    musicData: {}
  },
  mutations: {
    // 保存歌单列表
    [RECEIVE_SONGS_DETAIL](state, payload) {
      state.songDetailList = payload
    },
    // 保存歌单 id
    [SAVE_SONGS_ID](state, id) {
      state.songId = id
    },
    // 保存音乐id信息
    [RECEIVE_MUSIC_LIST](state, payload) {
      state.musicList = payload
    },
    // 保存音乐播放信息
    receive_music_data(state, data) {
      state.musicData = data
      console.log('保存到了vuex')
    },
    // 保存mv信息
    [RECEIVE_MUSIC_MV](state, data) {
      state.mv_Data = data
    }
  },
  actions: {
    // 获取播放音乐信息
    async getAudioInfo({ commit }, id) {
      console.log(id)
      const { data: res } = await reqNewSongUrl(id)
      console.log(res)
      // const { data: lyric } = await reqMusicLyric(payload.id)
      // console.log(lyric)
      // const obj = {}
      // obj.info = song.songs[0]
      // lyric.lrc ? (obj.lyric = lyric.lrc.lyric) : '没有歌词!'
      // obj.url = res[0].url
      // commit(RECEIVE_MUSIC_DATA, id)
    }
  }
}
