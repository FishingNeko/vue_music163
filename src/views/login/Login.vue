<template>
  <div class="container">
    <el-card width="800px">
      <!-- 左侧相册 -->
      <div class="container-img">
        <el-carousel direction="vertical" :autoplay="autoplay" :interval="5000">
          <el-carousel-item v-for="(item, i) in album" :key="i">
            <img :src="item.src" alt="" />
            <span>{{ item.des }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 右侧表单 -->
      <div class="form">
        <a href="/"
          ><img
            src="https://image.xumaobin.xyz/2022/07/31/d3ab73bcb59a7.png"
            alt="my-logo"
            class="logo"
        /></a>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 手机号登录 -->
          <el-tab-pane label="手机号登录" name="first">
            <el-form :rules="loginFormRules" ref="loginFormRef" :model="params">
              <el-form-item prop="phone">
                <el-input
                  v-model="params.phone"
                  placeholder="请输入手机号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  show-password
                  v-model="params.password"
                  placeholder="请输入密码"
                  clearable
                  @keyup.enter.native="login"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button
                  type="warning"
                  @click="signup"
                  @keyup.enter.native="login"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 验证码码登录 -->
          <el-tab-pane label="验证码登录" name="second">
            开发中...
          </el-tab-pane>
          <!-- 扫码登录 -->
          <el-tab-pane label="扫码登录" name="third"> 开发中... </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { reqPhoneLogin } from '@/api/user'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 渲染完成开始轮播
      autoplay: false,
      // 选中的 tab 栏
      activeName: 'first',
      // 请求参数
      params: {
        phone: '',
        password: ''
      },
      loginFormRules: {
        phone: [
          { required: true, message: '请输入手机号' },
          {
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 相册内容
      album: [
        {
          src: 'https://image.xumaobin.xyz/2022/07/31/c22dd0a19f902.jpg',
          des: "Aubrey ask me to take a picture for her new raincat,It's her favority color,pink!"
        },
        {
          src: 'https://image.xumaobin.xyz/2022/07/31/7ff4f53522076.jpg',
          des: 'Sleep in gift with the neko!!'
        },
        {
          src: 'https://image.xumaobin.xyz/2022/07/31/77831626789bb.jpg',
          des: 'Today is my birthday!!'
        },
        {
          src: 'https://image.xumaobin.xyz/2022/07/31/4cf4f189ab07a.jpg',
          des: 'After some begging,Omori come to join Mari for recital pratiace...Hehe...'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('user', ['updataUserInfo']),
    // 监听 tab 栏点击
    handleClick(e) {
      this.activeName = e.name
    },
    // 登录
    login() {
      // 格式验证
      this.$refs.loginFormRef.validate(async (result) => {
        if (!result) return this.$message.warning('格式不对,检查一下吧')
        const { data: res } = await reqPhoneLogin(this.params)
        console.log(res)
        if (res.code !== 200) return this.$message.warning(res.message)
        // 更新用户数据
        this.updataUserInfo(res)
        // 保存登录凭证
        window.sessionStorage.setItem('token', res.token)
        this.$message.success('登录成功!')
        this.$router.push('/home/personalization')
      })
    },
    signup() {
      this.$message.warning('这里注册不安全,去官网吧')
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  mounted() {
    this.autoplay = true
  }
}
</script>
<style lang="less" scoped>
.logo {
  height: 56px;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2)
    ),
    url(../../assets/img/background.svg);

  .el-card {
    margin: auto;
    border: none;
    width: 800px;

    /deep/ .el-card__body {
      display: flex;
      padding: 0;
      width: 100%;
    }

    .container-img {
      width: 50%;
      position: relative;

      /deep/ .el-carousel__container {
        height: 450px;
      }

      img {
        width: 100%;
      }

      span {
        position: absolute;
        width: 90%;
        bottom: 5%;
        left: 0;
        padding: 0 5%;
        font-size: 13px;
        height: 2.2rem;
        overflow: hidden;
        color: #61666d;
      }
    }

    .form {
      display: flex;
      flex-wrap: wrap;
      width: 50%;
      padding: 20px 0;
      justify-content: center;
      align-content: start;

      .el-tabs {
        margin-top: 20px;
        width: 85%;

        .el-button {
          width: 100%;
          margin: 10px 0;
        }
      }
    }
  }
}
// #e2f5ec
</style>
