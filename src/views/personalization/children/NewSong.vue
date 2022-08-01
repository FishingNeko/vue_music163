<template>
  <div>
    <!-- 内容区 -->
    <div class="container">
      <div
        v-for="(item, i) in newSongList"
        :key="i"
        class="item globe-shadow-box"
        @mouseleave="MouseMove = false"
        @mousemove="MouseMove = i"
        @click="playMusic(item)"
      >
        <!-- 图片区 -->
        <div class="img-container">
          <img v-lazy="item.picUrl" class="item-img" />
          <!-- 播放图标 -->
          <div class="content-icon" v-show="MouseMove === i">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <!-- 音乐名与作者名 -->
        <div class="item-des">
          <div class="item-songname globe-overflow-text">{{ item.name }}</div>
          <span class="item-artist globe-overflow-text">{{
            item.song.artists[0].name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { reqMusicLyric, reqNewSongUrl } from '@/api/newSong'
export default {
  data() {
    return {
      MouseMove: false
    }
  },
  methods: {
    // 将新数据存储到 vuex 并传递到 APlayer 组件
    ...mapMutations('aPlayer', ['receive_music_data']),
    async playMusic(item) {
      // 获取歌曲的 url 与 歌词
      const { data: resUrl } = await reqNewSongUrl(item.id)
      const { data: resLrc } = await reqMusicLyric(item.id)
      // 交给 APlayer 的数据对象
      const audio = {}
      audio.id = item.id
      audio.name = item.name
      audio.artist = item.song.artists[0].name
      audio.url = resUrl.data[0].url
      audio.cover = item.picUrl
      audio.lrc = resLrc.lrc.lyric
      this.receive_music_data(audio)
    }
  },
  props: {
    newSongList: []
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;

  .item {
    display: flex;
    justify-content: left;
    width: 30%;

    .img-container {
      position: relative;
      width: 30%;

      .item-img {
        width: 100%;
        height: 100%;
      }

      .content-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: red;
        font-size: 40px;
      }
    }

    .item-des {
      width: 60%;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-evenly;

      .item-songname {
        width: 100%;
      }

      .item-artist {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
