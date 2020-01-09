<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/icon/leftBorder.png" alt="">
        机器人列表
        <el-form :model="form"  ref="form" label-width="111px" class="demo-ruleForm">
          <el-form-item label="按连接状态查询" prop="conStatus">
              <el-select class="robotList" v-model="form.conStatus" @change="change">
                  <el-option label="连接" value="1"></el-option>
                  <el-option label="未连接" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按工作状态查询" prop="workStatus">
              <el-select class="robotList" v-model="form.workStatus" @change="change2">
                <el-option label="运行" value="1"></el-option>
                <el-option label="未运行" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按组查询" prop="groupName">
              <el-select class="robotList" v-model="form.groupName" @change="change3">
                  <el-option v-for="item in items" :key="item.id" :label="item.groupName" :value="item.groupName"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按项目查询" prop="projectId">
              <el-select class="robotList" v-model="form.projectId" @change="change4">
                  <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="countentCen">
        <el-table
          class="equipmentTable"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="deviceType"
            label="设备型号">
          </el-table-column>
          <el-table-column
            prop="nodeId"
            label="设备ID">
          </el-table-column>
          <el-table-column
            prop="proName"
            label="所属项目">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="所属组别">
          </el-table-column>
          <el-table-column
            prop="con_status"
            label="连接状态"
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="work_status"
            label="工作状态"
            width="180"
            :formatter="formatter3">
          </el-table-column>
          <el-table-column
            prop="electric"
            label="电池电量"
            width="180"
            :formatter="formatter2">
          </el-table-column>
          <el-table-column
            prop="cur_work_time"
            label="工作时长(min)">
          </el-table-column>
          <el-table-column
            prop="sum_work_distance"
            label="行驶里程(m)">
          </el-table-column>
          <el-table-column
            prop="gather_time"
            label="上次运行时间"
            width="180">
          </el-table-column>
        </el-table>
        <div class="block">
          <p class="pageSize">每页 5 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'
export default {
  data () {
    return {
      currentPage:1,
      tableData: [],
      total:1,
      pageSize:5,
      Id:'',
      pId:2,
      gong:0,
      typea:'weather',
      form:{conStatus:'',workStatus:'',groupName:'',projectId:''},
      items:[],
      items2:[],
      projectId:'',
      groupName:'',
      conStatus:'',
      workStatus:''
    }
  },
  mounted () {
    this.project(this.pId);
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.groupName,this.conStatus,this.workStatus);
    },
    // 下拉框列表
    async project (pId) {
      const res = await this.$http.get(`/group/name/${pId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.items = data.data;

      const res2 = await this.$http.get(`/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.projectId = data2.data[0].id
      this.form.projectId = data2.data[0].name
      this.items2 = data2.data;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.groupName,this.conStatus,this.workStatus);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,projectId,groupName,conStatus,workStatus) {
      const res = await this.$http.get(`/device`,{params: {nowpage: currentPage,pagesize:pageSize,projectId:projectId,groupName:groupName,conStatus:conStatus,workStatus:workStatus}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data);
      if (data.status === '200') {
        this.total = data.data.total
        var g = data.data.total;
        if (g <= 5) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 5);
          this.gong =  gs;
        }
        this.tableData = data.data.rows;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    change:function(){
      // console.log(this.form.conStatus);
      this.currentPage = 1;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.groupName,this.form.conStatus,this.workStatus);
    },
    change2:function(){
      // console.log(this.form.workStatus);
      this.currentPage = 1;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.groupName,this.conStatus,this.form.workStatus);
    },
    change3:function(){
      // console.log(this.form.groupName);
      this.currentPage = 1;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.form.groupName,this.conStatus,this.workStatus);
    },
    change4:function(){
      // console.log(this.form.projectId);
      this.currentPage = 1;
      this.getData(this.currentPage,this.pageSize,this.form.projectId,this.groupName,this.conStatus,this.workStatus);
    },
    formatter(row, column) {
      if (row.con_status == "1") {
        return "连接"
      } else if (row.con_status == "0") {
        return "断开"
      }
    },
    formatter2(row, column) {
      return row.electric + "%"
    },
    formatter3(row, column) {
      if (row.work_status == "1") {
        return "工作中"
      } else if (row.work_status == "0") {
        return "未工作"
      }
    },
  }
}
</script>
<style scoped>
  .countentWorp .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    box-sizing: border-box;
  }
  .countentWorp .divActiveRight .shujuLog{
    font-size: 16px;
    color: #fff;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .el-form{
    float: right;
    /* height: 50px; */
  }
  .el-form-item{
    float: left;
    margin-bottom: 0!important;
  }
  .el-input__inner{
    height: 31px!important;
    line-height: 31px!important;
  }
  .el-table thead{
    background: #F5F6FA;
  }
  .el-pagination{
    float: right;
    margin: 24px -10px 0 0;
  }
</style>
