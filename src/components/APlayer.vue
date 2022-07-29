<template>
<div class="t">
 <aplayer ref="aplayer" :audio="audio" :lrcType="0" fixed />
</div>
 
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return { 
      // 音乐数据
      // id: '' 
      // name: '',
      // artist: '',
      // url: '',
      // cover: '',
      // lrc: ''
      audio: []
    }
  },
  computed: {
    ...mapState('aPlayer', ['musicData'])
  },
  watch: {
    musicData: function (newArr, oldArr) {
      this.getMusicValue(newArr)
    }
  },
  created() {},
  methods: {
    // 获取音乐数据
    getMusicValue(newArr) {
      console.log('新数据抵达Aplayer')
      this.audio.push(newArr)
    }
  }
}
</script>

<style lang="less" scoped>
.t {
  position:absolute;
  bottom: 0;
  left: 0;
}
</style>
