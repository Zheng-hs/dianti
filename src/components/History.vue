<template>
  <div>
    <el-card>
        <el-row :gutter="20">
        <el-col :span="6" >
          <span>agvId</span>
           <el-input
            placeholder="请输入agvId"
            v-model="queryInfo.agvId"
            clearable
            @clear="getTask"
          >
          </el-input>
        </el-col>
        <el-col :span="6" >
          <span>agvcId</span>
           <el-input
            placeholder="请输入agvcId"
            v-model="queryInfo.agvcId"
            clearable
            @clear="getTask"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <span>数据源</span>
          <el-input
            placeholder="请输入数据源"
            v-model="queryInfo.dataSource"
            clearable
            @clear="getTask"
          >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button
              icon="el-icon-search"
              @click="getTask"
            >搜索</el-button>
        </el-col>
      </el-row>

      <el-table :data="taskList" border stripe style="font-size: 16px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="agvId" prop="agvId"></el-table-column>
        <el-table-column label="agvcId" prop="agvcId"></el-table-column>
        <el-table-column label="储位名称" prop="storageName">
            <template slot-scope="scope">
                <span style="color: red">{{scope.row.storageName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="任务类型" prop="taskType">
             <template slot-scope="scope">
            {{ scope.row.taskType === "MODEL" ? "已分配储位的任务" : "排队等待任务" }}
          </template>
        </el-table-column>
        <el-table-column label="任务id" prop="taskId"> </el-table-column>
        <el-table-column
          label="车辆进电梯楼层"
          prop="stationStart"
        ></el-table-column>
        <el-table-column label="车辆是否已经进入电梯" prop="inFloorStatus">
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.inFloorStatus === 'FINISH'">{{ scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入" }}</span>
            <span v-else>{{ scope.row.inFloorStatus === "FINISH" ? "已进入" : "未进入" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车辆出电梯楼层"
          prop="stationEnd"
        ></el-table-column>
        <el-table-column
          label="车辆是否已经进入电梯"
          prop="outFloorStatus"
        >
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.outFloorStatus === 'FINISH'">{{ scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出" }}</span>
            <span v-else>{{ scope.row.outFloorStatus === "FINISH" ? "已驶出" : "未驶出" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据源" prop="dataSource"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-dialog 
      title="任务详情"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="detail">agvId: &nbsp;&nbsp;{{detail.agvId}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">agvcId: &nbsp;&nbsp;{{detail.agvcId}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">任务id: &nbsp;&nbsp;{{detail.taskId}}</div>
                
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="detail">储位名称: &nbsp;&nbsp;{{detail.storageName}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">车辆储位申请时所在卡号: &nbsp;&nbsp;{{detail.stationNow}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">任务类型: &nbsp;&nbsp;{{detail.taskType === "MODEL" ? "已分配储位的任务" : "排队等待任务"}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="detail">车辆进电梯楼层: &nbsp;&nbsp;{{detail.stationStart}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">车辆是否已经进入电梯: &nbsp;&nbsp;{{detail.inFloorStatus === "FINISH" ? "已进入" : "未进入"}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">车辆出电梯楼层: &nbsp;&nbsp;{{detail.stationEnd}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="detail">车辆是否已经进入电梯: &nbsp;&nbsp;{{detail.outFloorStatus === "FINISH" ? "已驶出" : "未驶出" }}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">车辆任务类型: &nbsp;&nbsp;{{detail.section = 0 ? "车辆跨楼层" : "车辆不跨楼层"}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">车辆进电梯优先级: &nbsp;&nbsp;{{detail.inFloorIndex}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="detail">车辆出电梯优先级: &nbsp;&nbsp;{{detail.outFloorIndex}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">创建时间: &nbsp;&nbsp;{{detail.createTime | dataFormat}}</div>
            </el-col>
            <el-col :span="8">
                <div class="detail">数据源: &nbsp;&nbsp;{{detail.dataSource}}</div>
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
      queryInfo: {
        agvId: "",
        agvcId: "",
        dataSource: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      total:0,
      taskList: [],
      dialogVisible: false,
      detail: {},
      selectList: [
        { label: 'agvId', value: 'agvId' },
        { label: 'agvcId', value: 'agvcId' },
        { label: '数据源', value: 'dataSource'}
      ],
      select: ''
    };
  },
  methods: {
    async getTask() {
        const { data: res } = await this.$http.post(`/getAllMission?pagenum=${this.queryInfo.pagenum}&pagesize=${this.queryInfo.pagesize}&agvId=${this.queryInfo.agvId}&agvcId=${this.queryInfo.agvcId}&dataSource=${this.queryInfo.dataSource}`);
        this.taskList = res.data.pageData.missionList;
        this.total = res.data.pageData.total  
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTask()
    //   if (this.queryInfo.query === "") {
    //     this.getUserList();
    //   } else {
    //     this.getUserList1();
    //   }
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTask()
    //   if (this.queryInfo.query === "") {
    //     this.getUserList();
    //   } else {
    //     this.getUserList1();
    //   }
    },
     showEditDialog(row) {
        this.dialogVisible = true
        this.detail = row
    },
     dialogClosed () {
     this.dialogVisible = false
    },
    clearInput(){
        this.queryInfo.query = ''
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
       this.getTask();
      }, 5000); //1000毫秒调用一次this.webSocketClientOnopen(a,b)
    },
  },
  created() {
      this.getTask();
      this.setTime()
  },
  beforeDestroy() {
    //页面关闭时清除定时器
    clearInterval(this.clearTimeSet);
  },
};
</script>

<style lang="less" scoped>
.detail {
    margin: 20px;
}
.el-col {
  display: flex;
  align-items: center;
  span {
    width: 25%;
  }
}
</style>
