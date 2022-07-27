<template>
  <div class="container-send">
    <!-- 头像 -->
    <div class="container-img">
      <img v-if="isLogin" :src="isLogin" @click="goToInfo" class="img" />
      <div v-else class="img" @click="login">登录</div>
    </div>
    <div class="container-send">
      <!-- 评论框 -->
      <textarea
        class="ipt-txt"
        cols="80"
        rows="5"
        placeholder="发一条友善的评论"
        v-model="txt"
      ></textarea>
      <!-- 发送按钮 -->
      <button class="sub-btn" @click="sendReply">发表评论</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 要发送的评论
      txt: '',
      //
      isLogin: false
    }
  },
  created() {
    this.isLogin = window.sessionStorage.getItem('token')
  },
  methods: {
    // 发送评论
    sendReply() {
      this.txt = ''
      this.$message.warning('开发中...')
    },
    // 前往登录页
    login() {
      this.$router.push('/login')
      this.$message.warning('登录页开发中...')
    },
    //  前往个人信息页
    goToInfo() {
      this.$message.warning('个人信息页开发中...')
    }
  }
}
</script>

<style lang="less" scoped>
.container-send {
  display: flex;
  position: relative;
  justify-content: space-around;

  .container-img {
    width: 10%;
    display: flex;

    .img {
      display: flex;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: #f4f5f7;
      margin: auto;
      font-size: 12px;
      color: red;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .container-send {
    width: 90%;
    display: flex;
    justify-content: space-between;

    .ipt-txt {
      font-size: 12px;
      display: inline-block;
      box-sizing: border-box;
      background-color: #f4f5f7;
      border: 1px solid #e5e9ef;
      overflow: auto;
      border-radius: 4px;
      color: #555;
      width: 100%;
      height: 64px;
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
}
</style>
