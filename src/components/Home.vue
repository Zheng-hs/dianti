<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <div class="toggle-button" @click="toggleCollapse">
        <i class="el-icon-s-fold"></i>
        <span>电梯系统</span>
      </div>
      <div>

      <el-button @click="change1">电梯1</el-button>
      <el-button @click="change">电梯2</el-button>
      </div>
    </el-header>
  
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-card>

    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div>
        <!-- <img src="../assets/logo.jpg" alt="" /> -->
      </div>
      <!-- 侧边栏菜单区域 -->
      <el-menu
        background-color="#fff"
        text-color="#000"
        active-text-color="#409EFF"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath"
      >
        <!-- 一级菜单 -->
        <el-menu-item index="/welcome">
          <i class="el-icon-monitor"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/task">
        <i class="el-icon-s-order"></i>
        <span slot="title">任务信息</span>
      </el-menu-item>
        <el-menu-item index="history">
        <i class="el-icon-document"></i>
        <span slot="title">历史任务</span>
      </el-menu-item>
        <el-menu-item index="/storage">
        <i class="el-icon-menu"></i>
        <span slot="title">储位信息</span>
      </el-menu-item>
      </el-menu>
    </el-aside>
      </el-card>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
      path: "",
      userCode: "",
    };
  },
  created() {
    window.sessionStorage.setItem('url','0')
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    change() {
      window.sessionStorage.setItem('url','1')
      this.$router.go(0)
    },
    change1() {
      window.sessionStorage.setItem('url','0')
      this.$router.go(0)
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #08aaf5;
  display: flex;
  justify-content: space-between;
  // padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .el-dropdown {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 150px;
  }
}

.el-aside {
  background-color: #eaedf1;
  }
  .el-menu {
    border-right: 0;
  }
.el-card {
  // margin: 20px;
}
.el-container {
   background-color: #eaedf1;
}
.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-weight: bold;
}
</style>
