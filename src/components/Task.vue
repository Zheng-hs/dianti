<template>
  <div>
    <el-card>
      <div class="title">已分配储位的任务</div>
      <el-table :data="taskList" border stripe style="font-size: 16px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="agvId" prop="agvId"></el-table-column>
        <el-table-column label="agvcId" prop="agvcId"></el-table-column>
        <el-table-column label="储位名称" prop="storageName">
          <template slot-scope="scope">
            <span style="color: red">{{ scope.row.storageName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务类型" prop="taskType">
          <template slot-scope="scope">
            {{
              scope.row.taskType === "MODEL"
                ? "已分配储位的任务"
                : "排队等待任务"
            }}
          </template>
        </el-table-column>
        <el-table-column label="任务id" prop="taskId"> </el-table-column>
        <el-table-column
          label="车辆进电梯楼层"
          prop="stationStart"
        ></el-table-column>
        <el-table-column label="车辆是否已经进入电梯" prop="inFloorStatus">
          <template slot-scope="scope">
            <span
              style="color: red"
              v-if="scope.row.inFloorStatus === 'FINISH'"
              >{{
                scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入"
              }}</span
            >
            <span v-else>{{
              scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车辆出电梯楼层"
          prop="stationEnd"
        ></el-table-column>
        <el-table-column label="车辆是否已经进入电梯" prop="outFloorStatus">
          <template slot-scope="scope">
            <span
              style="color: red"
              v-if="scope.row.outFloorStatus === 'FINISH'"
              >{{
                scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
              }}</span
            >
            <span v-else>{{
              scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row)"
              >详情</el-button
            >
            <el-button type="warning" size="mini" @click="traffic(scope.row)"
              >管制</el-button
            >
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" @click="removeById(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="title">排队等待任务</div>
      <el-table :data="taskList1" border stripe style="font-size: 16px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="agvId" prop="agvId"></el-table-column>
        <el-table-column label="agvcId" prop="agvcId"></el-table-column>
        <el-table-column label="储位名称" prop="storageName"></el-table-column>
        <el-table-column label="任务类型" prop="taskType">
          <template slot-scope="scope">
            {{
              scope.row.taskType === "MODEL"
                ? "已分配储位的任务"
                : "排队等待任务"
            }}
          </template>
        </el-table-column>
        <el-table-column label="任务id" prop="taskId"> </el-table-column>
        <el-table-column
          label="车辆进电梯楼层"
          prop="stationStart"
        ></el-table-column>
        <el-table-column label="车辆是否已经进入电梯" prop="inFloorStatus">
          <template slot-scope="scope">
            <span
              style="color: red"
              v-if="scope.row.inFloorStatus === 'FINISH'"
              >{{
                scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入"
              }}</span
            >
            <span v-else>{{
              scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车辆出电梯楼层"
          prop="stationEnd"
        ></el-table-column>
        <el-table-column label="车辆是否已经进入电梯" prop="outFloorStatus">
          <template slot-scope="scope">
            <span
              style="color: red"
              v-if="scope.row.outFloorStatus === 'FINISH'"
              >{{
                scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
              }}</span
            >
            <span v-else>{{
              scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row)"
              >详情</el-button
            >
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" @click="removeById(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="任务详情"
        :visible.sync="dialogVisible"
        width="50%"
        @close="dialogClosed"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">agvId: &nbsp;&nbsp;{{ detail.agvId }}</div>
          </el-col>
          <el-col :span="8">
            <div class="detail">agvcId: &nbsp;&nbsp;{{ detail.agvcId }}</div>
          </el-col>
          <el-col :span="8">
            <div class="detail">任务id: &nbsp;&nbsp;{{ detail.taskId }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              储位名称: &nbsp;&nbsp;{{ detail.storageName }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆储位申请时所在卡号: &nbsp;&nbsp;{{ detail.stationNow }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              任务类型: &nbsp;&nbsp;{{
                detail.taskType === "MODEL"
                  ? "已分配储位的任务"
                  : "排队等待任务"
              }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              车辆进电梯楼层: &nbsp;&nbsp;{{ detail.stationStart }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆是否已经进入电梯: &nbsp;&nbsp;
              <span  style="color: red"
              v-if="detail.inFloorStatus === 'FINISH'">{{
                detail.inFloorStatus === "FINISH" ? "已进入" : "未进入"
              }}</span>
              <span v-else>{{
                detail.inFloorStatus === "FINISH" ? "已进入" : "未进入"
              }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆出电梯楼层: &nbsp;&nbsp;{{ detail.stationEnd }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              车辆是否已经进入电梯: &nbsp;&nbsp;
              <span style="color: red"
              v-if="detail.outFloorStatus === 'FINISH'">{{
                detail.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
              }}</span>
              <span v-else>{{
                detail.outFloorStatus === "FINISH" ? "已驶出" : "未驶出"
              }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆任务类型: &nbsp;&nbsp;{{
                (detail.section = 0 ? "车辆跨楼层" : "车辆不跨楼层")
              }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆进电梯优先级: &nbsp;&nbsp;{{ detail.inFloorIndex }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              车辆出电梯优先级: &nbsp;&nbsp;{{ detail.outFloorIndex }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              创建时间: &nbsp;&nbsp;{{ detail.createTime | dataFormat }}
            </div>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="primary" @click="update">更新进电梯已完成</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="交管信息"
        :visible.sync="dialogVisible1"
        width="50%"
        @close="dialogClosed"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">agvId: &nbsp;&nbsp;{{ trafficList.agvId }}</div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              agvcId: &nbsp;&nbsp;{{ trafficList.agvcId }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              任务模板id: &nbsp;&nbsp;{{ trafficList.missionId }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              车辆进电梯楼层: &nbsp;&nbsp;{{ trafficList.stationStart }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆出电梯楼层: &nbsp;&nbsp;{{ trafficList.stationEnd }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              车辆任务类型: &nbsp;&nbsp;{{
                (trafficList.section = 0 ? "车辆跨楼层" : "车辆不跨楼层")
              }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              进电梯交管结果: &nbsp;&nbsp;{{
                trafficList.inActionReply === "NG" ? "不可通行" : "可通行"
              }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              进电梯交管阶段完成: &nbsp;&nbsp;{{
                trafficList.inFinish === "YES" ? "已完成" : "未完成"
              }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              进电梯动作完成卡号: &nbsp;&nbsp;{{ trafficList.inFinishPoint }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              出电梯交管结果: &nbsp;&nbsp;{{
                trafficList.outActionReply === "NG" ? "不可通行" : "可通行"
              }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              出电梯交管阶段完成: &nbsp;&nbsp;{{
                trafficList.outFinish === "YES" ? "已完成" : "未完成"
              }}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail">
              出电梯动作完成卡号: &nbsp;&nbsp;{{ trafficList.outFinishPoint }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="detail">
              储位名称: &nbsp;&nbsp;{{ trafficList.storageName }}
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskList: [],
      taskList1: [],
      dialogVisible: false,
      dialogVisible1: false,
      detail: {},
      trafficList: {},
    };
  },
  methods: {
    async getTask() {
      const { data: res } = await this.$http.get("/getAllTaskModel");
      this.taskList = res.data.taskModel;
      const { data: res1 } = await this.$http.get("/getAllWaitTask");
      this.taskList1 = res1.data.taskModel;
    },
    showEditDialog(row) {
      this.dialogVisible = true;
      this.detail = row;
    },
    async traffic(row) {
      const { data: res } = await this.$http.post(
        `/getTraffic?agvId=${row.agvId}&agvcId=${row.agvcId}`
      );
      this.trafficList = res.data.trafficList[0];
      this.dialogVisible1 = true;
    },
    dialogClosed() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
    },
    async removeById(row) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该任务, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post(
        `/deleteTaskById?agvId=${row.agvId}&agvcId=${row.agvcId}`
      );
      if (res.meta.status == 200) {
        this.$message.success("删除成功");
        this.getTask();
      }
    },
    async update() {
      const confirmResult = await this.$confirm(
        "是否要更新电梯状态?",
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
      const { data: res } = await this.$http.post(
        `/updateTaskInFinish?agvId=${this.detail.agvId}&agvcId=${this.detail.agvcId}`
      );
      if (res.meta.status == 200) {
        this.$message.success("更新成功");
        this.getTask();
        this.dialogVisible = false
      }
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.getTask();
      }, 2000); //1000毫秒调用一次this.webSocketClientOnopen(a,b)
    },
  },
  created() {
    this.getTask();
    this.setTime();
  },
  beforeDestroy() {
    //页面关闭时清除定时器
    clearInterval(this.clearTimeSet);
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 10px;
  font-size: 24px;
  font-weight: 600;
}
.el-table {
  margin: 10px;
}
.detail {
  margin: 20px;
}
.footer {
  text-align: right;
  margin-right: 5%;
}
</style>
