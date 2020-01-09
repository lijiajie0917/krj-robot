<template>
  <div class="countentWorp">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <img class="leftBorder" src="../assets/icon/leftBorder.png" alt="">
        设备列表
      </div>
      <div class="countentProject">
        <el-card class="box-card" v-for="(item,index) in tableData" :class = "isactive == index ? 'addclass' : '' " @click.native="clickCard(item.groupName,index)" :key="item.groupName">
            <div slot="header" class="clearfix">
              <span>{{item.groupName}}</span>
            </div>
            <div class="text item">
              <img class="robotImg" src="../assets/icon/robot.png" alt="">
              <p class="conStatus">连接状态:
                <img class="imgUrl" :src="item.conStatus == '0' ? imgUrl : imgUrl2 " alt="">
                {{item.conStatus == '0' ? '断开' : '连接'}}</p>
              <p class="workStatus">工作状态:
                <img class="imgUrl" :src="item.isOk == '0' ? imgUrl3 : imgUrl4 " alt="">
                {{item.isOk == '0' ? '故障' : '运行'}}</p>
            </div>
        </el-card>
      </div>
      <div class="down" v-show="downFlg">
        <img src="../assets/icon/down.png" alt="">
      </div>
    </div>
    <div class="divActive divActiveRight">
      <div v-show="down" class="shujuLog">
        <p class="headerName"><img class="leftBorder" src="../assets/icon/leftBorder.png" alt="">{{headerName}}</p>
        <div class="shujulogRight">
          <!-- {{checkList2}} -->
          <el-checkbox v-model="checked" @change="checkedAll" >批量设置</el-checkbox>
          <el-button class="modification" type="primary" @click="modification">定 时</el-button>
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
              <el-button @click="editFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="modificationBtn">修 改</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div class="countentWorpList" v-for="item2 in tableData2">
        <template>
          <el-checkbox-group v-model="checkList2">
            <el-checkbox :label="item2.id"></el-checkbox>
          </el-checkbox-group>
        </template>
        <div class="countLeft">
          <div :id="item2.nodeId" class="pie"></div>
          <div class="leftRightBtn">
            <img @click="switchBtn(item2.gatewayId,item2.nodeId,item2.work_status,1)" src="../assets/icon/leftImg.png" alt="">
            <img @click="switchBtn(item2.gatewayId,item2.nodeId,item2.work_status)" class="countentImhg" :src="item2.work_status == '0' ? imgStart : imgStop " alt="">
            <img @click="switchBtn(item2.gatewayId,item2.nodeId,item2.work_status,2)" src="../assets/icon/rightImg.png" alt="">
          </div>
          <p class="rst">
            <button @click="switchBtn(item2.gatewayId,item2.nodeId,2)" type="button" name="button">复位</button>
          </p>
          <p class="rst titleName">
            设备 ID
          </p>
          <p class="equipment">
            {{item2.nodeId}}
          </p>
        </div>
        <div class="countRight">
          <div class="text item">
            <p class="conStatus">连接状态:
              <img class="imgMargin imgUrl" :src="item2.con_status == '0' ? imgUrl : imgUrl2 " alt="">
              {{item2.con_status == '0' ? '断开' : '连接'}}</p>
            <p class="workStatus">工作状态:
              <img class="imgMargin imgUrl" :src="item2.work_status == '0' ? imgUrl3 : imgUrl4 " alt="">
              <span>{{item2.isOk == '0'? '故障' :(item2.work_model == '1'? '手动' :(item2.work_model == '2'? '自动' :'待机'))}}</span>
              <!-- <span v-else>{{item2.isOk == '0' ? '故障' : '运行'}}</span> -->
            </p>
          </div>
          <ul class="statusWrap">
            <li class="bottommargin">
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                运行速度
              </p>
              <p class="statusTwo">
                <span class="">{{item2.speed}}</span>
                m/min
              </p>
              <div class="block">
                <el-slider
                  @change="changeSlider(item2.gatewayId,item2.nodeId,item2.work_status,0,item2.speed,item2.roll_speed)"
                  v-model="item2.speed"
                  :max="15"
                  >
                </el-slider>
              </div>
            </li>
            <li>
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                当前工作时长
              </p>
              <p class="statusTwo">
                <span class="">{{Math.round(item2.cur_work_time / 60)}}</span>
                min
              </p>
            </li>
            <li class="bottommargin">
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                滚刷速度
              </p>
              <p class="statusTwo">
                <span class="">{{item2.roll_speed}}</span>
                r/min
              </p>
              <div class="block">
                <el-slider
                  @change="changeSliderrol(item2.gatewayId,item2.nodeId,item2.work_status,0,item2.speed,item2.roll_speed)"
                  v-model="item2.roll_speed"
                  :max="90"
                  >
                </el-slider>
              </div>
            </li>
            <li>
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                电池电量
              </p>
              <p class="statusTwo">
                <span class="">{{item2.electric}}</span>
                %
              </p>
            </li>
            <li>
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                累计工作时长
              </p>
              <p class="statusTwo">
                <span class="">{{Math.round(item2.sum_work_time / 60)}}</span>
                min
              </p>
            </li>
            <li>
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                电箱温度
              </p>
              <p class="statusTwo">
                <span class="">{{item2.tempture}}</span>
                ℃
              </p>
            </li>
            <li>
              <p class="statusOne">
                <img src="../assets/icon/bounce.png" alt="">
                累计行驶里程
              </p>
              <p class="statusTwo">
                <span class="">{{item2.sum_work_distance}}</span>
                m
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import $ from 'jquery'
import Qs from 'qs'
import {mapState,mapGetters,mapAction} from 'vuex'
export default {
  data () {
    return {
      currentPage:1,
      pageSize:5,
      total:1,
      gong:0,
      tableData: [],
      tableData2:[],
      items:[],
      items2:[],
      pId:'',
      pType:'',
      dataList:[],
      imgUrl:require('../assets/icon/break.png'),
      imgUrl2:require('../assets/icon/connect.png'),
      imgUrl3:require('../assets/icon/white.png'),
      imgUrl4:require('../assets/icon/blue.png'),
      imgStop:require('../assets/icon/stop.png'),
      imgStart:require('../assets/icon/start.png'),
      headerName:'',
      msgFather:[],
      checkList:[],
      checkList2:[],
      changeRed:'',
      checked:false,
      editFormVisible2:false,
      templete:{period:'',start:'',first:'',second:'',third:''},
      value8: 0,
      down:false,
      fsg:'',
      downFlg:false,
      isactive : -1,
    }
  },
  created:function(){

  },
  mounted: function () {
    this.pId = localStorage.pId
    this.getData(this.pId,this.checkList);
  },
  computed:{
    ...mapGetters([
      'getCheckList',
      'getpId'
    ])
  },
  watch: {
     getCheckList: function(li) { //li就是改变后的wifiList值
       this.getData(this.pId,li);
     },
     getpId: function(pId) { //li就是改变后的wifiList值
       this.getData(pId,this.checkList);
     }
   },
    methods:{
      // 数据渲染列表
      async getData (pId,msgFather) {
        var json = msgFather;
        const res = await this.$http.post(`/group/status/${pId}`, json, {headers: {'Content-Type': 'application/json'}})
        const data = res.data
        // console.log(data.data.length);
        if (data.data.length >= 4) {
          this.downFlg = true;
        }
        if (data.status === '200') {
          this.tableData = data.data;
          // console.log(this.tableData);
          // this.clickCard();
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      },
      async clickCard (row,index){
        this.isactive = index;
        this.down = true;
        this.headerName = row
        const res = await this.$http.get(`/group/device`, {params: {projectId: this.pId,groupName:this.headerName}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        if (data.status === '200') {
          this.tableData2 = data.data;
          this.$nextTick(() => {
            for (var i = 0; i < this.tableData2.length; i++) {

              // console.log(this.tableData2[i].isOk);
              if (this.tableData2[i].isOk == 0) {
                this.fsg = false;
              } else {
                this.fsg = true;
              }

              var dom = document.getElementById(this.tableData2[i].nodeId);
              var myChart = this.echarts.init(dom)
              const option = {
                  grid: {
                      top: 5,
                      bottom: 5,
                  },
                  color: ['#44D5FF', 'rgba(128, 128, 128, 0.1)'],
                  series: [{
                      name: 'valueOfMarket',
                      type: 'pie',
                      center: ['50%', '50%'], // 饼图的圆心坐标
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      hoverAnimation: true,
                      label: { //  饼图图形上的文本标签
                          normal: { // normal 是图形在默认状态下的样式
                              show: true,
                              position: 'center',
                              color: '#fff',
                              fontSize: 14,
                              fontWeight: 'bold',
                              formatter: '{c}\n{b}' // {b}:数据名； {c}：数据值； {d}：百分比
                          }
                      },
                      itemStyle:{
                              show:false,
                              borderColor:'#9CB7BF',
                              borderWidth:1,
                          },
                      data: [
                          {
                              value: 20,
                              name: '米/分',
                              label: {
                                  normal: {
                                      show: true
                                  }
                              }
                          },
                          {
                              value: 100 - 20,
                              name: '',
                              label: {
                                  normal: {
                                  show: false
                                  }
                              }
                          }
                      ]
                  }]
                }
              myChart.setOption(option);
            }
          })
          // this.clickCard();
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      },
      checkedAll: function() {
          var _this = this;
          if (!_this.checked) { //实现反选
              _this.checkList2 = [];
          } else { //实现全选
              _this.checkList2 = [];
              this.tableData2.forEach(function(item, index) {
                  _this.checkList2.push(item.id);
              });
          }
      },
      // 定时按钮
      async modification (){
        this.editFormVisible2 = true;
      },
      async modificationBtn (){
        console.log(this.checkList2);
        var json = {
          ids: this.checkList2,
          projectId: this.pId,
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
          this.editFormVisible2 = false;
          this.getData(this.pId,this.checkList);
        } else {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      },
      async cmd (gatewayId,nodeId,status,direction,speed,rollSpeed) {
        var json = {
          gatewayId: gatewayId,
          nodeId: nodeId,
          status:status,
          direction:direction,
          speed:speed,
          rollSpeed:rollSpeed,
        }
        const res = await this.$http.post(`/cmd`, json, {headers: {'Content-Type': 'application/json'}})
        const data = res.data
        console.log(data);
        if (data.status == "200") {

          this.down = true;
          this.clickCard(this.headerName);
          this.getData(this.pId,this.checkList);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      },
      async switchBtn (gatewayId,nodeId,work_status,direction){
        console.log(work_status);
        var status;
        if (work_status == 0) {
          status = 1;
        } else if (work_status == 1) {
          status = 0;
        } else if (work_status == 2) {
          status = 2;
        }
        this.cmd(gatewayId,nodeId,status,direction);
      },
      async changeSlider (gatewayId,nodeId,status,direction,slider,sliderroll) {
        console.log(slider);
        if (slider >= 5 ) {
          this.cmd(gatewayId,nodeId,status,direction,slider,sliderroll)
        } else {
          this.$message({
            message: '运行速度不可低于5m/min',
            type: 'error'
          })
        }
      },
      async changeSliderrol (gatewayId,nodeId,status,direction,slider,sliderroll) {
        if (sliderroll >= 30 ) {
          this.cmd(gatewayId,nodeId,status,direction,slider,sliderroll)
        } else {
          this.$message({
            message: '滚刷速度不可低于30m/min',
            type: 'error'
          })
        }
      },
    }
}
</script>
<style scoped>
  ul,ol{
    list-style: none;
  }
  .countentWorp .divActive{
    float: left;
  }
  .countentWorp .divActiveLeft{
    /* width: 497px; */
    width: 30%;
    height: 419px;
    /* margin-right: 10px; */
  }
  .tableTitle{
    color: #333333;
    font-size: 16px;
    border-bottom: 0.018519rem dashed #dde3ff;
    margin: 22px 20px 0 19px;
    padding-bottom: 21px;
  }
  #main {
    width: 100%;
    height: 356px;
  }
  .countentWorp .divActiveRight{
    /* width: 703px; */
    width: 100%;
    float: right;
    box-sizing: border-box;
  }
  .countentWorp .divActiveRight .shujuLog{
    font-size: 16px;
    color: #fff;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .countentWorp .divActiveRight .shujuLog .headerName{
    float: left;
    position: relative;
    top: 22px;
  }
  .countentWorp .divActiveRight .shujuLog .headerName img{
    margin-right: 10px;
  }
  /* .el-form{
    float: right;
    height: 50px;
  } */
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
    line-height: 40px;
  }
  .el-card{
    height: 180px;
    width: 30%;
    float: left;
    background: #353B53;
    color: #fff;
    border-radius: 6px 6px 6px 6px;
    border: none;
    margin-right: 19px;
    position: relative;
    cursor: pointer;
  }
  .el-card:hover{
    background: #31374C;
  }
  .countentWorpList{
    width: 43%;
    float: left;
    background: #353B53;
    color: #fff;
    border-radius: 6px 6px 6px 6px;
    margin-right: 20px;
    height: 475px;
    padding: 30px;
    margin-bottom: 30px;
  }
  .robotImg{
    float: left;
    margin-top: 25px;
  }
  .conStatus,.workStatus{
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .imgUrl{
    margin: 14px 15px 0 15px;
  }
  .countentProject{
    overflow: hidden;
  }
  .down{
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
  .pie {
    width:175px;
    height:175px;
  }
  .countLeft{
    float: left;
    height: 429px;
    width: 175px;
    margin-right: 76px;
  }
  /* .countRight{
    float: left;
  } */
  .leftRightBtn{
    text-align: center;
  }
  .countentImhg{
    margin: 0 25px;
  }
  .rst{
    margin-top: 26px;
    text-align: center;
  }
  .rst button{
    width: 50px;
    height: 31px;
    line-height: 31px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background: #44D5FF;
  }
  .titleName{
    font-size: 14px;
    color: #C1C9D6;
    margin-top: 43px;
    margin-bottom: 18px;
  }
  .equipment{
    font-size: 16px;
    text-align: center;
  }
  .imgMargin{
    margin-left: 48px;
    margin-right: 21px;
  }
  .statusWrap{
    margin-top: 30px;
    overflow: hidden;
  }
  .statusWrap li{
    float: left;
    width: 50%;
    margin-bottom: 34px;
  }
  .statusWrap .bottommargin{
    margin-bottom: 0;
  }
  .statusWrap .statusOne{
    color: #C1C9D6;
    font-size: 14px;
    line-height: 27px;
  }
  .statusWrap .statusOne img{
    margin-right: 11px;
  }
  .statusWrap .statusTwo span{
    font-size: 24px;
    font-weight: 500;
  }
  .countRight>div p{
    text-align: left;
  }
  .red{
    background: #31374C;
  }
  .shujulogRight{
    float: right;
  }
  .shujulogRight label{
    float: left;
    color: #fff;
    padding-top: 13px;
    height: 10px;
  }
  .block{
    margin-left: 7px;
  }
  .modification{
    width: 50px;
    height: 31px;
    line-height: 7px;
    padding: 0;
    margin-top: 19px;
    background: #44D5FF;
  }
  .addclass{
    background: #31374C;
  }
</style>
