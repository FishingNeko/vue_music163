<template>
   <div class="container-send">
        <textarea
          class="ipt-txt"
          cols="80"
          rows="5"
          placeholder="发一条友善的评论"
          v-model="txt"
        ></textarea>
        <button class="sub-btn" @click="sendReply">发表评论</button>
      </div>
</template>

<script>
export default {
  data () {
    return {
      // 要发送的评论
      txt: ''
  }
  },
  methods: {
    // 发送评论
    sendReply() {
      this.$message.warning('开发中...')
    }
  }
}
</script>

<style lang="less" scoped>
.container-send {
  display: flex;
  position: relative;

  .ipt-txt {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e9ef;
    overflow: auto;
    border-radius: 4px;
    color: #555;
    width: 60%;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
    outline: none;
    resize: none;
  }

  .sub-btn {
    width: 70px;
    height: 64px;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    margin-left: 20px;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: red;
    border: 1px solid #e05454;
  }
}
</style>
