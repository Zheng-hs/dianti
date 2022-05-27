<template>
  <div>
    <div class="top">
      <div class="header">
      <div class="title">继电器控制部分</div>
      <div class="title1">
        <div>电梯:</div>
        <div class="name">{{ liftName }}</div>
      </div>
      <div class="title2">
        <div>IP地址:</div>
        <div class="ip">{{ ip }}</div>
      </div>
      
    </div>
    <div class="error" v-if="list1.length == 0">电梯获取状态失败</div>
    </div>
    <div class="card">
      <el-card>
        <div class="title_name">给电梯指令</div>
        <div>门: &nbsp;&nbsp;{{ door }}</div>
        <div>楼层: &nbsp;&nbsp;{{ floor.toString() }}</div>
      </el-card>
      <el-card>
        <div class="title_name">电梯状态</div>
        <div>
          门: &nbsp;&nbsp;<span v-if="list1[1] === '1'">关</span
          ><span v-else-if="list1[0] === '1'">开</span
          ><span v-else>无状态</span>
        </div>
        <div>
          楼层: &nbsp;&nbsp;{{ floor1.toString() }}
        </div>
        <div>
          手/自动: &nbsp;&nbsp;<span v-if="list1[5] === '0'">手动</span
          ><span v-else-if="list1[5] === '1'">自动</span
          ><span v-else>无状态</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liftName: "",
      ip: "",
      list: [],
      list1: [],
      door: "",
      floor: [],
      door1: "",
      floor1: [],
      autoManual: "",
    };
  },
  methods: {
    async getIp() {
      const { data: res } = await this.$http.get("/getIoConfig");
      this.ip = res.data.ioConfig.ip;
      this.liftName = res.data.ioConfig.liftName;
    },

    async getStatus() {
      const { data: res } = await this.$http.get("/getSentIOStatus");
      this.list = res.data.sentIoData.split("").reverse();
      this.floor = [];
      if (res.data.sentIoData === '' || res.data.sentIoData == null) {
        this.floor = ['无指令'];
        this.door = "无指令";
      }     
      this.list.forEach((v, index) => {
        if (v === "1") {
          if (index + 1 == 1) {
            this.floor.push("3L外");
          } else if (index + 1 == 2) {
            this.floor.push("4L外");
          } else if (index + 1 == 3) {
            this.floor.push("5L外");
          } else if (index + 1 == 4) {
            this.floor.push("3L");
          } else if (index + 1 == 5) {
            this.floor.push("4L");
          } else if (index + 1 == 6) {
            this.floor.push("5L");
          } else if (index + 1 == 7) {
            this.door = "开";
          } else if (index + 1 == 8) {
            this.door = "关";
          }
        }
      });
      if (
        this.list[0] === "0" &&
        this.list[1] === "0" &&
        this.list[2] === "0" &&
        this.list[3] === "0" &&
        this.list[4] === "0" &&
        this.list[5] === "0"
      ) {
        this.floor = ["无指令"];
      }
      if (this.list[6] === "0" && this.list[7] === "0") {
        this.door = "无指令";
      }
    },
    async getIosStatus() {
      const { data: res } = await this.$http.get("/getIOStatus");
      this.floor1 = []
      this.list1 = res.data.ioStatus.IOStaticStr.split("").reverse();
      this.list1.forEach((v, index) => {
        if (v === "1") {
          if (index + 1 == 3) {
            this.floor1.push("3L");
          } else if (index + 1 == 4) {
            this.floor1.push("4L");
          } else if (index + 1 == 5) {
            this.floor1.push("5L");
          } 
        }
      });
      if(res.data.ioStatus.IOStaticStr===''||res.data.ioStatus.IOStaticStr==null) {
        this.floor1 = ['无状态']
      }
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.getStatus();
        this.getIosStatus();
      }, 2000); //1000毫秒调用一次this.webSocketClientOnopen(a,b)
    },
  },
  created() {
    this.getIp();
    this.getStatus();
    this.getIosStatus();
    this.setTime()
  },
   beforeDestroy() {
    //页面关闭时清除定时器
    clearInterval(this.clearTimeSet);
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  display: flex;
  font-size: 24px;
  align-items: center;
  margin-left: 10px;
  .title {
    margin: 10px;
    font-size: 28px;
  }
  .title1 {
    display: flex;
    margin: 10px;
    .name {
      color: red;
      margin-left: 10px;
    }
  }
  .title2 {
    display: flex;
    margin: 10px;
    .ip {
      color: red;
      margin-left: 10px;
    }
  }
}
.error {
  color: red;
  font-size: 30px;
  margin-right: 10px;
}
.card {
  display: flex;
}
.el-card {
  width: 30%;
  margin: 20px;
  div {
    margin: 20px;
    font-size: 26px;
  }
  .title_name {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
