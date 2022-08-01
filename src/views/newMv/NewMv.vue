<template>
  <div>
    <!-- 导航栏区 -->
    <div class="row-container">
      <!-- 分类 -->
      <span>地区:</span>
      <!-- 导航 item 项 -->
      <div
        v-for="(item, i) in tabbarList.area"
        :key="i"
        class="item"
        :class="{ actived: params.area === item }"
        @click="tabbarClick(item, params.type, params.order)"
      >
        <button>
          {{ item }}
        </button>
      </div>
    </div>
    <div class="row-container">
      <!-- 分类 -->
      <span>分类:</span>
      <!-- 导航 item 项 -->
      <div
        v-for="(item, j) in tabbarList.type"
        :key="j"
        class="item"
        :class="{ actived: params.type === item }"
        @click="tabbarClick(params.area, item, params.order)"
      >
        <button>
          {{ item }}
        </button>
      </div>
    </div>
    <div class="row-container">
      <!-- 分类 -->
      <span>排序:</span>
      <!-- 导航 item 项 -->
      <div
        v-for="(item, k) in tabbarList.order"
        :key="k"
        class="item"
        :class="{ actived: params.order === item }"
        @click="tabbarClick(params.area, params.type, item)"
      >
        <button>
          {{ item }}
        </button>
      </div>
    </div>

    <!-- 内容主体区 -->
    <NewMv :newMvList="mvList" :myWidth="23"></NewMv>
    <!-- 分页栏区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Number(params.num)"
      :page-sizes="[8, 16, 32, 64]"
      :page-size="Number(params.limit)"
      layout="total, sizes, prev, pager, next, jumper"
      :total="params.total"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import { reqNewMv } from '@/api/newMv'
import NewMv from '@/components/MvList.vue'
export default {
  data() {
    return {
      // mv 数据列表
      mvList: [],
      // tabbar 导航数据
      tabbarList: {
        area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        type: ['全部', '官方版', '现场版', '网易出品'],
        order: ['上升最快', '最热', '最新']
      },
      // 请求参数列表
      // 1. `area`: 地区,可选值为：全部、内地、港台、欧美、日本、韩国、不填则为全部
      // 2. `type`: 类型,可选值为：全部、官方版、原生 (已删除)、现场版、网易出品,不填则为全部
      // 3. `order`: 排序,可选值为：上升最快、最热、最新、不填则为上升最快
      // 4. `limit`: 取出数量 , 默认为 30
      // 5. `offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认 为 0
      params: {
        area: '全部',
        type: '全部',
        order: '上升最快',
        limit: 16,
        offset: 0,
        num: 1, // 当前页数
        total: 0 // 总数量
      }
    }
  },
  created() {
    this.getNewMv()
    const newMvChecked1 = window.sessionStorage.getItem('newMvChecked1'),
      newMvChecked2 = window.sessionStorage.getItem('newMvChecked2'),
      newMvChecked3 = window.sessionStorage.getItem('newMvChecked3'),
      numMvNum = window.sessionStorage.getItem('numMvNum'),
      numMvPageSize = window.sessionStorage.getItem('numMvPageSize')
    this.params.area = newMvChecked1 ? newMvChecked1 : this.params.area
    this.params.type = newMvChecked2 ? newMvChecked2 : this.params.type
    this.params.order = newMvChecked3 ? newMvChecked3 : this.params.order
    this.params.num = numMvNum ? numMvNum : this.params.num
    this.params.limit = numMvPageSize ? numMvPageSize : this.params.limit
  },
  methods: {
    // 获取新 MV
    async getNewMv() {
      const { data: res } = await reqNewMv(
        this.params.area,
        this.params.type,
        this.params.order,
        this.params.limit,
        this.params.offset
      )
      if (res.code !== 200) return this.$message.error('网络错误')
      this.mvList = res.data
      // 在请求分页数据时，接口不会发送count值
      if (res.count) {
        this.params.total = res.count
      }
    },
    // 点击 tabbar
    tabbarClick(area, type, order) {
      this.params.num = 1
      this.params.area = area
      this.params.type = type
      this.params.order = order
      window.sessionStorage.setItem('newMvChecked1', area)
      window.sessionStorage.setItem('newMvChecked2', type)
      window.sessionStorage.setItem('newMvChecked3', order)
      this.getNewMv()
    },
    // 监听当前页面的变化
    handleCurrentChange(val) {
      this.params.num = val
      this.params.offset = (val - 1) * this.params.limit
      this.getNewMv()
      window.sessionStorage.setItem('numMvNum', val)
    },
    // 监听分页大小的变化
    handleSizeChange(val) {
      this.params.limit = val
      this.getNewMv()
      window.sessionStorage.setItem('numMvPageSize', val)
    }
  },
  components: {
    NewMv
  }
}
</script>

<style lang="less" scoped>
.row-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  align-items: center;
  font-size: 14px;

  .item {
    margin: 0 10px;
  }
}

button {
  border-radius: 20px;
  padding: 12px 20px;
  border: 1px solid #f1f2f3;
  background-color: #f6f7f8;
  cursor: pointer;
}

.actived > button {
  font-weight: bold;
  color: red;
}
</style>
