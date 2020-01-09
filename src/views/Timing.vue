<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/icon/leftBorder.png" alt="">
        设备列表
        <el-form :model="form"  ref="form" label-width="111px" class="demo-ruleForm">
          <el-form-item label="按定时功能查询" prop="status">
              <el-select class="robotList" v-model="form.status" @change="change">
                  <el-option label="开启" value="1"></el-option>
                  <el-option label="关闭" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按项目查询" prop="projectId">
              <el-select class="robotList" v-model="form.projectId" @change="change2">
                  <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
              </el-select>
          </el-form-item>
          <el-button class="buttnBlue2" type="primary" @click="addPolice">批量设置</el-button>
        </el-form>
      </div>
      <div class="countentCen">
        <el-table
          class="equipmentTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            v-if="falg">
          </el-table-column>
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
            prop="projectName"
            label="所属项目">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="所属组别">
          </el-table-column>
          <el-table-column
            prop="isOpen"
            label="定时功能"
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="period"
            label="运行周期"
            :formatter="formatter2">
          </el-table-column>
          <el-table-column
            prop="first"
            label="运行时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button class="delbtnCss" size="small" type="primary" icon="edit" @click="modificationBox(scope.row)">修改
              </el-button>
              <el-dialog
                title="定时设置"
                :visible.sync="editFormVisible2"
                width="17%">
                <el-form :model="templete" ref="form" style="text-align: left;" label-width="100px" class="jSform demo-ruleForm">
                  <el-form-item label="清扫周期：间隔" prop="period">
                    <el-input width="60px" v-model="templete.period"></el-input>
                  </el-form-item>
                  <div class="">
                    <span class="demonstration">开始日期:</span>
                    <el-date-picker
                      v-model="templete.start"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                  <div class="">
                    <span class="demonstration">第一次:</span>
                    <el-time-picker
                      v-model="templete.first"
                      value-format="HH:mm:ss"
                      format="HH:mm:ss">
                    </el-time-picker>
                  </div>
                  <div class="">
                    <span class="demonstration">第二次:</span>
                    <el-time-picker
                      v-model="templete.second"
                      value-format="HH:mm:ss"
                      format="HH:mm:ss">
                    </el-time-picker>
                  </div>
                  <div class="">
                    <span class="demonstration">第三次:</span>
                    <el-time-picker
                      v-model="templete.third"
                      value-format="HH:mm:ss"
                      format="HH:mm:ss">
                    </el-time-picker>
                  </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogCancel">取 消</el-button>
                  <el-button type="primary" @click="modification">修 改</el-button>
                </span>
              </el-dialog>
            </template>
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
      form:{status:'',projectId:''},
      jSform:{name:'',style:'',addr:''},
      templete:{period:'',start:'',first:'',second:'',third:''},
      items:[],
      items2:[],
      projectId:'',
      isOpen:'',
      editFormVisible2:false,
      id:'',
      ids:[],
      falg:false,
    }
  },
  mounted () {
    this.project();
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.isOpen);
    },
    // 下拉框列表
    async project () {
      const res2 = await this.$http.get(`/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.projectId = data2.data[0].id
      this.form.projectId = data2.data[0].name
      this.items2 = data2.data;
      this.getData(this.currentPage,this.pageSize,this.projectId,this.isOpen);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,projectId,isOpen) {
      const res = await this.$http.get(`/schedule`,{params: {nowpage: currentPage,pagesize:pageSize,projectId:projectId,isOpen:isOpen}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data.data.total);
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
        console.log(this.ids);
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    change:function(){
      this.getData(this.currentPage,this.pageSize,this.projectId,this.form.status);
    },
    change2:function(){
      this.getData(this.currentPage,this.pageSize,this.form.projectId,this.isOpen);
    },
    async addPolice (){
      if (this.falg) {
        this.falg = false;
      } else {
        this.falg = true;
      }
      this.ids = [];
      // this.editFormVisible = true;
    },
    // 修改按钮
    async modificationBox (row){
      // console.log('点击修改按钮前数组：'+this.ids);
      this.ids.push(row.deviceId)
      // console.log('点击修改按钮后数组：'+this.ids);
      this.editFormVisible2 = true;
    },
    // 确认修改
    async modification (){
      let arr = this.ids;
      let set = new Set(arr);
      let newArr = Array.from(set);

      var json = {
        ids: newArr,
        projectId:this.projectId,
        templete:this.templete,
      }
      const res = await this.$http.post(`/schedule`, json, {headers: {'Content-Type': 'application/json'}})
      const data = res.data
      console.log(data);
      if (data.status == "200") {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.ids = [];
        this.editFormVisible2 = false;
        this.getData(this.currentPage,this.pageSize,this.projectId,this.isOpen);
      } else {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    formatter(row) {
      if (row.isOpen == "0") {
        return "关闭"
      } else if (row.isOpen == "1") {
        return "开启"
      }
    },
    formatter2(row) {
      return "间隔" + row.period + "天";
    },
    handleSelectionChange (val) {
      for (const value of val) {
        // console.log(value.deviceId);
        if (this.ids.indexOf(value.deviceId) == '-1') {
          this.ids.push(value.deviceId)
        }
        // console.log(this.ids);
      }
    },
    dialogCancel () {
      this.ids = [];
      this.editFormVisible2 = false;
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
  .shujuLog>.el-form{
    float: right;
    height: 50px;
  }
  .shujuLog .el-form-item{
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
  .delbtnCss{
    background: transparent;
    border: none;
    color: #fff;
  }
  .delbtnCssred{
    color: red;
  }
  .jSform{
    overflow: hidden;
  }
  .demonstration{
    line-height: 40px;
  }
</style>
