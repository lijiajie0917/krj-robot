<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight divUser">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/leftBorder.png" alt="">
        分组列表
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="groupName">
            <div class="sub-title">添加分组</div>
            <el-input class="groupName" placeholder="请输入分组名称" v-model="form.groupName">
            </el-input>
          </el-form-item>
          <el-button class="buttnBlue" type="primary" @click="search">保存</el-button>
        </el-form>
      </div>
      <div class="countentCen" v-for="(tableDataGroups,i) in tableData">
        <div class="tableHeader">
          <span>组名：{{tableDataGroups.groupName}}</span>
          <span>数量：{{tableDataGroups.sum}}</span>
          <span>
            <el-button class="delbtnCss" size="small" type="primary" icon="edit" @click="dialogVisible(tableDataGroups.groupName)">添加设备
            </el-button>
            <el-dialog
              title="添加设备"
              :visible.sync="editFormVisible"
              width="30%">
              <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="选择分组" prop="groupName">
                  <el-input v-model="jSform.groupName" placeholder="请选择分组" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="选择设备" prop="deviceId">
                  <el-select v-model="jSform.deviceId" placeholder="请选择设备">
                    <el-option v-for="item2 in items2" :key="item2.deviceId" :label="item2.nodeId" :value="item2.deviceId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="equipmentAdd">添 加</el-button>
              </span>
            </el-dialog>
            <el-button @click="changeName(tableDataGroups.groupName)" class="delbtnCss" size="small" type="primary" icon="edit">修改昵称
            </el-button>
            <el-dialog
              title="修改昵称"
              :visible.sync="editFormVisible2"
              width="30%">
              <el-form :model="jSform2" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="分组名称" prop="newName">
                  <el-input v-model="jSform2.newName" placeholder="请输入修改名称"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="modification">修 改</el-button>
              </span>
            </el-dialog>
          </span>
        </div>
        <el-table class="tableDataGroups" :data="tableDataGroups.groups" style="width: 100%">
          <el-table-column
            v-for="(col,index) in cols" :key="index"
            :prop="col.prop" :label="col.label">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="delbtnCss" size="small" type="primary" icon="edit" @click="handleEdit(scope.row)">解绑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      tableData: [],
      tableDataGroups:[],
      pId:2,
      // name:'',
      form:{groupName:''},
      cols: [
          {prop: 'deviceType', label: '设备型号'},
          {prop: 'deviceId', label: '设备ID'},
      ],
      editFormVisible:false,
      editFormVisible2:false,
      jSform:{groupName:'',deviceId:''},
      jSform2:{newName:''},
      items:[],
      items2:[],
    }
  },
  mounted () {
    this.project(this.pId);
    this.unbind(this.pId);
    this.getData(this.pId);
  },
  created: function () {
    if (localStorage.access == 2) {
      this.falg = false;
    }
  },
  methods:{
    // 解绑
    async handleEdit (a){
      this.$confirm('确定解绑该设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        var json = Qs.stringify({
          _method: 'delete',
          deviceId: a.id,
        })
        const res = await this.$http.post(`/group/device`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          });
          this.getData(this.pId);
          this.unbind(this.pId);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });
      });
    },
    // 选择分组下拉框
    async project (pId) {
      const res = await this.$http.get(`/group/name/${pId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      this.items = data.data;
    },
    // 选择设备下拉框
    async unbind (pId) {
      const res2 = await this.$http.get(`/group/unbind/${pId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      // console.log(data2);
      this.items2 = data2.data;
    },
    // 分组列表渲染
    async getData (pId) {
      const res = await this.$http.get(`/group/info/${pId}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      if (data.status === '200') {
        this.tableData = data.data;
        // this.tableDataGroups = data.data[1].groups;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 分组保存
    async search () {
      if (this.form.groupName == '') {
        this.$message({
          message: '请输入分组名称',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        var form = Qs.stringify({
          projectId: 2,
          groupName:this.form.groupName,
        })
        const res = await this.$http.post(`/group`,form,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        console.log(data);
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '添加分组成功!'
          });
          this.getData(this.pId);
        } else if (data.status == "003001") {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
      }
    },
    // 确认添加设备
    async equipmentAdd(){
      if (this.jSform.groupName == '') {
        this.$message({
          message: '请选择分组',
          type: 'error'
        })
      } else if (this.jSform.deviceId == '') {
        this.$message({
          message: '请选择设备',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const jSform = Qs.stringify(this.jSform)
        const res = await this.$http.post(`/group/device`,jSform,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '设备添加成功!'
          });
          this.editFormVisible = false;
          this.getData(this.pId);
          this.unbind(this.pId);
          this.jSform.deviceId = '';
        } else if (data.status == "003001") {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
      }
    },
    // 点击添加设备按钮
    async dialogVisible(groupName){
      this.editFormVisible = true;
      this.jSform.groupName = groupName;
    },
    // 点击修改昵称按钮
    async changeName (groupName){
      this.editFormVisible2 = true;
      this.jSform.groupName = groupName;
      // console.log(this.jSform.groupName);
    },
    // 提交修改昵称
    async modification(){
      // console.log(this.jSform.groupName);
      // console.log(this.jSform2.newName);
      this.$confirm('确定修改分组名称?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        var json = Qs.stringify({
          _method: 'put',
          projectId: 2,
          groupName:this.jSform.groupName,
        })
        const res = await this.$http.post(`/group/${this.jSform2.newName}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.editFormVisible2 = false;
          this.jSform2.newName = '';
          this.getData(this.pId);
        } else  {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
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
  .el-form{
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
  .demonstration{
    float: left;
    margin-top: 32px;
  }
  .el-form-item__content{
    margin-left: 10px
  }
  .jSform{
    float: none;
    height: 100px;
  }
  .tableHeader{
    background: #31374C;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  .tableHeader span{
    display: inline-block;
    width: 33%;
    text-align: center;
    color: #44D5FF;
  }
  .tableHeader .delbtnCss{
    font-size: 16px;
  }
  .delbtnCss{
    background: transparent;
    border: none;
    color: #44D5FF;
  }
  .groupName{
    float: left;
    width: 200px;
    margin-right: 41px;
  }
  .sub-title{
    float: left;
    margin-right: 10px;
  }
  .divUser .countentCen{
    margin-bottom: 70px;
    padding-bottom: 0;
  }
</style>
