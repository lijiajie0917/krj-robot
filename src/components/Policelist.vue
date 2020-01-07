<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/leftBorder.png" alt="">
        报警列表
        <el-form :model="form"  ref="form" label-width="111px" class="demo-ruleForm">
          <el-form-item label="按处理状态查询" prop="status">
              <el-select class="robotList" v-model="form.status" @change="change">
                  <el-option label="已处理" value="1"></el-option>
                  <el-option label="未处理" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按项目查询" prop="projectId">
              <el-select class="robotList" v-model="form.projectId" @change="change2">
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
            prop="name"
            label="所属项目">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="所属组别">
          </el-table-column>
          <el-table-column
            prop="happen_time"
            label="报警时间">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="报警原因"
            width="180">
          </el-table-column>
          <el-table-column
            label="处理状态"
            width="180">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" :class="scope.row.status == '1' ? 'widther' : 'red' " type="text">{{scope.row.status == '1' ? '已处理' : '未处理'}}</el-button>
              <el-dialog
                class="poldialog"
                title="警报"
                :visible.sync="editFormVisible"
                width="40%">
                <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
                  <el-form-item label="设备型号" prop="deviceType">
                    <el-input v-model="jSform.deviceType" placeholder="请选择分组" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="所属组别" prop="groupName">
                    <el-input v-model="jSform.groupName" placeholder="请选择分组" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="设备 I D" prop="device_id">
                    <el-input v-model="jSform.device_id" placeholder="请选择分组" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="报警时间" prop="happen_time">
                    <el-input v-model="jSform.happen_time" placeholder="请选择分组" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="报警原因" prop="reason">
                    <el-input v-model="jSform.reason" placeholder="请选择分组" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="处理状态" prop="status">
                    <el-select class="chulistatus" v-model="jSform.status" placeholder="请选择设备">
                      <el-option label="已处理" value="1"></el-option>
                      <el-option label="未处理" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="jSform.desc"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editFormVisible = false">关 闭</el-button>
                  <el-button type="primary" @click="equipmentAdd">提 交</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column
            prop="hand_time"
            label="处理时间">
          </el-table-column>
          <el-table-column
            prop="des"
            label="备注">
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
      cgtableData:[],
      total:1,
      pageSize:5,
      pId:2,
      gong:0,
      typea:'weather',
      form:{projectId:'',status:''},
      jSform:{deviceType:'',groupName:'',device_id:'',happen_time:'',reason:'',status:'',desc:''},
      items:[],
      items2:[],
      projectId:'',
      groupName:'',
      conStatus:'',
      workStatus:'',
      status:'',
      editFormVisible:false,
      id:'',
    }
  },
  mounted () {
    this.project();
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.form.status);
    },
    // 下拉框列表
    async project () {
      const res2 = await this.$http.get(`/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.projectId = data2.data[0].id
      this.form.projectId = data2.data[0].name
      this.items2 = data2.data;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.status);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,projectId,status) {
      const res = await this.$http.get(`/warn`,{params: {nowpage: currentPage,pagesize:pageSize,projectId:projectId,status:status}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
      this.getData(this.currentPage,this.pageSize,this.projectId,this.form.status);
    },
    change2:function(){
      // console.log(this.form.workStatus);
      this.getData(this.currentPage,this.pageSize,this.form.projectId,this.status);
    },
    async handleEdit (row) {
			this.editFormVisible = true;
      this.jSform.groupName = row.groupName
      this.jSform.deviceType = row.deviceType
      this.jSform.device_id = row.device_id
      this.jSform.happen_time = row.happen_time
      this.jSform.reason = row.reason
      this.jSform.status = row.status
      this.id = row.id
      // console.log(row);
		},
    async equipmentAdd(){
      if (this.jSform.desc == '') {
        this.$message({
          message: '请填写备注信息',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        var json = Qs.stringify({
          id: this.id,
          status:this.jSform.status,
          des:this.jSform.desc,
        })
        const res = await this.$http.put(`/warn`,json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        // console.log(data);
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.editFormVisible = false;
          this.getData(this.currentPage,this.pageSize,this.projectId,this.status);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
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
    margin-bottom: 35px;
  }
  .shujuLog .el-form{
    float: right;
    height: 50px;
  }
  .el-form-item{
    float: left;
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
  .widther{
    color: #fff;
  }
  .red{
    color: red;
  }
</style>
