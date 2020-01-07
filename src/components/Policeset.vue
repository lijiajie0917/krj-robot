<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/leftBorder.png" alt="">
        报警设置
        <el-form :model="form"  ref="form" label-width="111px" class="demo-ruleForm">
          <el-form-item label="按项目查询" prop="projectId">
              <el-select class="robotList" v-model="form.projectId" @change="change2">
                  <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
              </el-select>
          </el-form-item>
          <el-button class="buttnBlue2" type="primary" @click="addPolice">增加报警</el-button>
          <el-dialog
            title="增加报警"
            :visible.sync="editFormVisible"
            width="30%">
            <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
              <el-form-item label="接收人员" prop="name">
                <el-input v-model="jSform.name" placeholder="请输入接收人员"></el-input>
              </el-form-item>
              <el-form-item label="接收方式" prop="style">
                <el-select class="chulistatus" v-model="jSform.style" placeholder="请选择接收方式">
                  <el-option label="短信" value="0"></el-option>
                  <el-option label="邮件" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接收地址" prop="addr">
                <el-input v-model="jSform.addr" placeholder="请输入接收地址"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="equipmentAdd">添 加</el-button>
            </span>
          </el-dialog>
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
            prop="name"
            label="接收人员">
          </el-table-column>
          <el-table-column
            prop="proName"
            label="所属项目">
          </el-table-column>
          <el-table-column
            prop="style"
            label="接收方式"
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button class="delbtnCss" size="small" type="primary" icon="edit" @click="modificationBox(scope.row)">修改
              </el-button>
              <el-dialog
                title="修改报警"
                :visible.sync="editFormVisible2"
                width="30%">
                <el-form :model="jSform2" ref="form" label-width="100px" class="jSform demo-ruleForm">
                  <el-form-item label="接收人员" prop="name">
                    <el-input v-model="jSform2.name" placeholder="请输入接收人员"></el-input>
                  </el-form-item>
                  <el-form-item label="接收方式" prop="style">
                    <el-select class="chulistatus" v-model="jSform2.style" placeholder="请选择接收方式">
                      <el-option label="短信" value="0"></el-option>
                      <el-option label="邮件" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="接收地址" prop="addr">
                    <el-input v-model="jSform2.addr" placeholder="请输入接收地址"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editFormVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="modification">修 改</el-button>
                </span>
              </el-dialog>
              <el-button class="delbtnCss delbtnCssred" size="small" type="primary" icon="edit" @click="remove(scope.row)">删除
              </el-button>
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
      form:{status:''},
      jSform:{name:'',style:'',addr:''},
      jSform2:{name:'',style:'',addr:''},
      items:[],
      items2:[],
      projectId:'',
      groupName:'',
      conStatus:'',
      workStatus:'',
      editFormVisible:false,
      editFormVisible2:false,
      id:'',
    }
  },
  mounted () {
    this.project();
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.projectId);
    },
    // 下拉框列表
    async project () {
      const res2 = await this.$http.get(`/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.projectId = data2.data[0].id
      this.form.projectId = data2.data[0].name
      this.items2 = data2.data;
      this.getData(this.currentPage,this.pageSize,this.projectId);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,projectId) {
      const res = await this.$http.get(`/notify`,{params: {nowpage: currentPage,pagesize:pageSize,projectId:projectId}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
    change2:function(){
      this.getData(this.currentPage,this.pageSize,this.projectId);
    },
    // 增加报警
    async equipmentAdd(){
      if (this.jSform.name == '') {
        this.$message({
          message: '请输入接收人员',
          type: 'error'
        })
      } else if (this.jSform.style == '') {
        this.$message({
          message: '请选择接收方式',
          type: 'error'
        })
      } else if (this.jSform.addr == '') {
        this.$message({
          message: '请输入接收地址',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const jSform = Qs.stringify({
          projectId:this.projectId,
          name:this.jSform.name,
          style:this.jSform.style,
          addr:this.jSform.addr,
        })
        const res = await this.$http.post(`/notify`,jSform,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        // console.log(data);
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.editFormVisible = false;
          this.getData(this.currentPage,this.pageSize,this.projectId);
        } else {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    async addPolice (){
      this.editFormVisible = true;
    },
    // 修改按钮
    async modificationBox (row){
      this.jSform2.name = row.name;
      this.jSform2.style = row.style;
      this.jSform2.addr = row.addr;
      this.editFormVisible2 = true;
      this.id = row.id;
    },
    // 确认修改
    async modification (){
      var json = Qs.stringify({
        _method: 'put',
        id: this.id,
        name:this.jSform2.name,
        style:this.jSform2.style,
        addr:this.jSform2.addr,
      })
      const res = await this.$http.post(`/notify`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      console.log(res)
      const data = res.data
      if (data.status == "200") {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.editFormVisible2 = false;
        this.getData(this.currentPage,this.pageSize,this.projectId);
      } else {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 删除
    async remove (row) {
      this.$confirm('确定删除该报警?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.delete(`/notify/${row.id}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData(this.currentPage,this.pageSize,this.projectId);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    formatter(row) {
      if (row.style == "0") {
        return "短信"
      } else if (row.style == "1") {
        return "邮件"
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
  .shujuLog>.el-form{
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
</style>
