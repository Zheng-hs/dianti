<template>
  <div>
    <el-card>
      <div class="header">
        <div class="title">继电器控制部分</div>
        <div class="title1">
          <div>电梯:</div>
          <div class="name">{{liftName}}</div>
        </div>
        <div class="title2">
          <div>IP地址:</div>
          <div class="ip">{{ip}}</div>
        </div>
      </div>
      <div class="btn_list">
        <div class="circle1">
          <div class="gray"></div>
          <div>未链接</div>
        </div>
        <div class="circle2">
          <div class="red"></div>
          <div>打开</div>
        </div>
        <div class="circle3">
          <div class="green"></div>
          <div>关闭</div>
        </div>
        <div class="circle4">
          <div class="yellow"></div>
          <div>未知</div>
        </div>
        <div class="btn">
          <el-button type="info" plain @click="getAllStatus">获取状态</el-button>
          <el-button type="info" plain @click="control('close', 'allclose')">全部关闭</el-button>
        </div>
      </div>
      <div class="off_title">输出控制</div>
      <div class="table">
        <div class="tb1">
          <div class="text">3F外呼叫</div>
          <div :class="{ c1: list[0] === '0', c2: list[0] === '1',c3:list.length==0 }"></div>
          <el-button
            type="info"
            plain
            v-if="list[0] === '1'"
            @click="control('close', 1)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 1)"
            >打开</el-button
          >
        </div>
        <div class="tb2">
          <div class="text">4F外呼叫</div>
          <div :class="{ c1: list[1] === '0', c2: list[1] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[1] === '1'"
            @click="control('close', 2)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 2)"
            >打开</el-button
          >
        </div>
        <div class="tb3">
          <div class="text">5F外呼叫</div>
          <div :class="{ c1: list[2] === '0', c2: list[2] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[2] === '1'"
            @click="control('close', 3)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 3)"
            >打开</el-button
          >
        </div>
        <div class="tb4">
          <div class="text">去3F</div>
          <div :class="{ c1: list[3] === '0', c2: list[3] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[3] === '1'"
            @click="control('close', 4)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 4)"
            >打开</el-button
          >
        </div>
        <div class="tb5">
          <div class="text">去4F</div>
          <div :class="{ c1: list[4] === '0', c2: list[4] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[4] === '1'"
            @click="control('close', 5)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 5)"
            >打开</el-button
          >
        </div>
        <div class="tb6">
          <div class="text">去5F</div>
          <div :class="{ c1: list[5] === '0', c2: list[5] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[5] === '1'"
            @click="control('close', 6)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 6)"
            >打开</el-button
          >
        </div>
        <div class="tb7">
          <div class="text">开门</div>
          <div :class="{ c1: list[6] === '0', c2: list[6] === '1' ,c3:list.length==0 }"></div>
          <el-button
            type="info"
            plain
            v-if="list[6] === '1'"
            @click="control('close', 7)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 7)"
            >打开</el-button
          >
        </div>
        <div class="tb8">
          <div class="text1">关门</div>
          <div :class="{ c1: list[7] === '0', c2: list[7] === '1',c3:list.length==0  }"></div>
          <el-button
            type="info"
            plain
            v-if="list[7] === '1'"
            @click="control('close', 8)"
            >关闭</el-button
          >
          <el-button type="info" plain v-else @click="control('open', 8)"
            >打开</el-button
          >
        </div>
      </div>
      <div class="off_title">输入控制</div>
      <div class="table">
        <div class="tb1">
          <div class="text">开门到位</div>
          <div :class="{ c1: list1[0] === '0', c2: list1[0] === '1' ,c3:list1.length==0 }"></div>
        </div>
        <div class="tb2">
          <div class="text">关门到位</div>
          <div :class="{ c1: list1[1] === '0', c2: list1[1] === '1' ,c3:list1.length==0}"></div>
        </div>
        <div class="tb3">
          <div class="text">电梯到达3F</div>
          <div :class="{ c1: list1[2] === '0', c2: list1[2] === '1' ,c3:list1.length==0}"></div>
        </div>
        <div class="tb4">
          <div class="text">电梯到达4F</div>
          <div :class="{ c1: list1[3] === '0', c2: list1[3] === '1' ,c3:list1.length==0}"></div>
        </div>
        <div class="tb5">
          <div class="text">电梯到达5F</div>
          <div :class="{ c1: list1[4] === '0', c2: list1[4] === '1' ,c3:list1.length==0}"></div>
        </div>
        <div class="tb6">
          <div class="text">手动/自动模式</div>
          <div :class="{ c1: list1[5] === '0', c2: list1[5] === '1',c3:list1.length==0 }"></div>
        </div>
        <div class="tb7">
          <div class="text">继电器7</div>
          <div :class="{ c1: list1[6] === '0', c2: list1[6] === '1' ,c3:list1.length==0}"></div>
        </div>
        <div class="tb8">
          <div class="text1">继电器8</div>
          <div :class="{ c1: list1[7] === '0', c2: list1[7] === '1' ,c3:list1.length==0}"></div>
        </div>
      </div>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="title">电梯进楼层</div>
           <el-select v-model="inFloor" placeholder="请选择">
            <el-option v-for="item in selectList" :key="item.value" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <div class="title">电梯出楼层</div>
           <el-select v-model="outFloor" placeholder="请选择">
            <el-option v-for="item in selectList" :key="item.value" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button @click="task">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      list1: [],
      liftName: '',
      ip: '',
      selectList:[
        {
          name: '3F',
          value: 3
        },
        {
          name: '4F',
          value: 4
        },
        {
          name:'5F',
          value: 5
        }
      ],
      inFloor: '',
      outFloor: '',
    };
  },
  methods: {
    async task() {
      const confirmResult = await this.$confirm(
        "是否选择从"+this.inFloor + "楼进电梯，从" + this.outFloor + "楼出电梯",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }

      const {data: res} = await this.$http.post(`/testTask?in=${this.inFloor}&out=${this.outFloor}`)
      if(res.meta.status == 200) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      this.inFloor = ''
      this.outFloor = ''
    },
    async getStatus() {
      const { data: res } = await this.$http.get("/getSentIOStatus");
      this.list = res.data.sentIoData.split("").reverse();
      if(res.data.sentIoData === '') {
        this.list = []
      }
    },
    async getIosStatus() {
      const { data: res } = await this.$http.get("/getIOStatus");
      this.list1 = res.data.ioStatus.IOStaticStr.split("").reverse();
      if(res.data.ioStatus.IOStaticStr === '') {
        this.list1 = []
      }
    },
    async control(type, order) {
      const { data: res } = await this.$http.post("/webControlLiftIO", {
        type: type,
        order: order,
      });
      if (res.meta.status == 200) {
        this.$message.success("操作成功");
      }
      this.getStatus();
      this.getIosStatus();
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
       this.getStatus();
      this.getIosStatus(); //定义一个方法 这里调用这方法传入setTime()中传入的a,b参数
      }, 1000); //1000毫秒调用一次this.webSocketClientOnopen(a,b)
    },
    getAllStatus() {
      this.getStatus();
      this.getIosStatus();
    },
    async getIp(){
        const {data: res} = await this.$http.get('/getIoConfig')
        this.ip = res.data.ioConfig.ip
        this.liftName = res.data.ioConfig.liftName
    }
  },
  created() {
    this.getStatus();
    this.getIosStatus();
    this.setTime();
    this.getIp()
  },
  beforeDestroy() {
    //页面关闭时清除定时器
    clearInterval(this.clearTimeSet);
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 40px;
}
.el-col {
  display: flex;
  align-items: center;
  .title {
    width: 40%;
    margin: 10px;
  }
}
.header {
  display: flex;
  font-size: 24px;
  align-items: center;
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
.btn_list {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .btn {
    margin: 0 20px;
    .el-button {
      margin: 0 10px;
    }
  }
  .circle1 {
    display: flex;
    align-items: center;
    .gray {
      border: 1px solid #000;
      background-color: gray;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin: 10px;
    }
  }
  .circle2 {
    display: flex;
    align-items: center;
    .red {
      border: 1px solid #000;
      background-color: red;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin: 10px;
    }
  }
  .circle3 {
    display: flex;
    align-items: center;
    .green {
      border: 1px solid #000;
      background-color: #06eb00;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin: 10px;
    }
  }
  .circle4 {
    display: flex;
    align-items: center;
    .yellow {
      border: 1px solid #000;
      background-color: yellow;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin: 10px;
    }
  }
}
.off_title {
  margin: 20px 10px;
  font-size: 20px;
  font-weight: 600;
}
.table {
  display: flex;
  margin: 10px;
  width: 100%;
  .tb1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb5 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb6 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb7 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .tb8 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10%;
  }
  .text {
    border: 1px solid #bbb;
    width: 100%;
    text-align: center;
    border-right: 0;
    padding: 10% 2%;
  }
  .text1 {
    border: 1px solid #bbb;
    width: 100%;
    text-align: center;
    padding: 10% 2%;
  }
  .c1 {
    border: 1px solid #000;
    background-color: #06eb00;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 20px;
  }
  .c2 {
    border: 1px solid #000;
    background-color: red;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 20px;
  }
  .c3 {
    border: 1px solid #000;
    background-color: gray;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 20px;
  }
}
</style>
