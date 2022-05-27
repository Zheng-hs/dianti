<template>
  <div>
    <el-card>
      <el-table :data="storageList" border stripe style="font-size: 16px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="储位名称" prop="storageName"></el-table-column>
        <el-table-column label="分配优先级" prop="alloIndex"></el-table-column>
        <el-table-column label="是否已分配" prop="allowed">
          <template slot-scope="scope">
            {{ scope.row.allowed === "YES" ? "已分配" : "未分配" }}
          </template>
        </el-table-column>
        <el-table-column label="卡号" prop="point"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storageList: [],
    };
  },
  methods: {
    async getStorage() {
      const { data: res } = await this.$http.get("/getAllStorage");
      this.storageList = res.data.storageList;
    },
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.getStorage();
      }, 2000); //1000毫秒调用一次this.webSocketClientOnopen(a,b)
    },
  },
  created() {
    this.getStorage();
    this.setTime();
  },
  beforeDestroy() {
    //页面关闭时清除定时器
    clearInterval(this.clearTimeSet);
  },
};
</script>

<style lang="less" scoped></style>
