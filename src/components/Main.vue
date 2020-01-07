<template>
  <div class="warpBox">
    <!-- 头部 -->
    <div class="header">
      <b>智能清洁机器人平台监控系统</b>
      <div class="hRight">
        <el-dropdown v-show="dropown" trigger="click">
          <span class="el-dropdown-link">
            <img class="listImg" src="../assets/list.png" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/Grouping">
              <el-dropdown-item><img class="iconList2" src="../assets/1.png" alt="">分组管理</el-dropdown-item>
            </router-link>
            <router-link to="/Equipment">
              <el-dropdown-item><img class="iconList2" src="../assets/2.png" alt="">设备管理</el-dropdown-item>
            </router-link>
            <router-link to="/Policelist">
              <el-dropdown-item><img class="iconList2" src="../assets/3.png" alt="">报警管理</el-dropdown-item>
            </router-link>
            <router-link to="/Timing">
              <el-dropdown-item><img class="iconList2" src="../assets/4.png" alt="">定时管理</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
        <img class="mainPng" src="../assets/user.png" alt="">
        <span class="userName">{{userName}}</span>
        <img @click="logout" class="delPng" src="../assets/goback.png" alt="">
      </div>
    </div>
    <!-- 左侧菜单 -->
    <aside class="main-sidebar">
      <section  class="sidebar">
        <!-- nav -->
        <div class="leftNav">
          <div class="headerLogo">
            <img src="../assets/headerimg.png" alt="">
            <b>科瑞杰云平台</b>
          </div>
        </div>
        <el-menu
          default-active="1"
          class="sidebar-menu"
          @open="handleOpen"
          text-color="#fff"
          >
          <el-form :model="jSform" v-if="disFlag" ref="form" label-width="100px" class="jSformrobot demo-ruleForm">
            <el-form-item prop="groupName">
                <el-select class="robotList" v-model="jSform.groupName" @change="change">
                    <el-option v-for="prosItem in pros" :key="prosItem.id" :label="prosItem.name" :value="`${prosItem.hasGroup}|${prosItem.id}`"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <el-menu-item-group class="treeview-menu" v-if="disFlag">
            <template>
              <el-checkbox v-model="checked" @change="checkedAll" >分组查看设备</el-checkbox>
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  v-for="(data,index) in items"
                  :key="index"
                  @change="handleChange(data.groupName)"
                  :label="data.groupName">
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-menu-item-group>
          <div class="" v-else="disFlag">
            <router-link to="/Home">
              <el-menu-item class="treeview" index="2">
                <span class="blueBorder"></span>
                <i>
                  <img class="iconList" src="../assets/icon2.png" alt="">
                </i>
                <span slot="title">首页</span>
              </el-menu-item>
            </router-link>
            <router-link to="/Grouping">
              <el-menu-item class="treeview" index="3">
                <span class="blueBorder"></span>
                <i>
                  <img class="iconList" src="../assets/icon3.png" alt="">
                </i>
                <span slot="title">分组管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/Equipment">
              <el-submenu index="4">
                <template slot="title">
                  <span class="blueBorder"></span>
                  <i>
                    <img class="iconList" src="../assets/icon5.png" alt="">
                  </i>
                  <span>设备管理</span>
                </template>
                <el-menu-item-group class="treeviewMenu">
                  <router-link to="/Equipment">
                    <el-menu-item class="leftList" index="4-1"><i class="fa fa-circle-o"></i>机器人</el-menu-item>
                  </router-link>
                  <router-link to="/Gateway">
                    <el-menu-item class="leftList" index="4-2"><i class="fa fa-circle-o"></i>网关</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
            </router-link>
            <router-link to="/Policelist">
              <el-submenu index="5">
                <template slot="title">
                  <span class="blueBorder"></span>
                  <i>
                    <img class="iconList" src="../assets/icon5.png" alt="">
                  </i>
                  <span>报警管理</span>
                </template>
                <el-menu-item-group class="treeviewMenu">
                  <router-link to="/Policelist">
                    <el-menu-item class="leftList" index="5-1"><i class="fa fa-circle-o"></i>报警列表</el-menu-item>
                  </router-link>
                  <router-link to="/Policeset">
                    <el-menu-item class="leftList" index="5-2"><i class="fa fa-circle-o"></i>报警设置</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
            </router-link>
            <router-link to="/Timing">
              <el-menu-item class="treeview" index="6">
                <span class="blueBorder"></span>
                <i>
                  <img class="iconList" src="../assets/icon6.png" alt="">
                </i>
                <span slot="title">定时管理</span>
              </el-menu-item>
            </router-link>
          </div>
        </el-menu>
      </section>
    </aside>
    <!-- 内容区 -->
    <div class="countent">
      <div>
        <router-view></router-view>
        <!-- <hello :msg-father="checkList"></hello> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapAction} from 'vuex'
import $ from 'jquery'
export default {
  name: 'Main',
  components:{
      // hello
  },
  data () {
    return {
      access:'',
      meng: {},
      userName:'',
      pId:'',
      items:[],
      form:{
        type:[],
      },
      checked: true,
      checkList: [],
      aa:false,
      jSform:{groupName:''},
      pros:[],
      disFlag:true,
      dropown:true,
    }
  },
  created: function () {
    this.userName = localStorage.username
    var weekArray = JSON.parse(localStorage.getItem('pros'));
    this.pros = weekArray
    this.jSform.groupName = this.pros[0].name;
    localStorage.setItem("pId",this.pros[0].id);
    this.pId = this.pros[0].id
    this.project(this.pId);
    var r = this.$route.path
    if (r == '/Grouping' || r == '/Equipment' || r == '/Gateway' || r == '/Policeset' || r == '/Policelist' || r == '/Timing') {
      this.disFlag = false;
    }
  },
  watch: {
     $route(to,from){
       console.log(to.path);
       if (to.path == '/Grouping' || to.path == '/Equipment' || to.path == '/Gateway' || to.path == '/Policeset' || to.path == '/Policelist' || to.path == '/Timing') {
         this.disFlag = false;
         this.dropown = false;
       } else if (to.path == '/Home') {
         this.disFlag = true;
         this.dropown = true;
       }
     }
   },
  methods: {
    async project (pId) {
      const res = await this.$http.get(`/group/bind/${pId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

      const data = res.data
      // console.log(data.data);
      this.items = data.data;
      // console.log(data.data);
      var _this = this;
      this.items.forEach(function(item, index) {
        _this.checkList.push(item.groupName);
      });
    },
    handleChange(value) {
      this.$store.state.checkList = this.checkList;
    },
    checkedAll: function() {
        var _this = this;
        if (!_this.checked) { //实现反选
            _this.checkList = [];
            this.$store.state.checkList = _this.checkList;
            // console.log(_this.checkList);
        } else { //实现全选
            _this.checkList = [];
            this.items.forEach(function(item, index) {
                _this.checkList.push(item.groupName);
            });
            this.$store.state.checkList = _this.checkList;
            // console.log(_this.checkList);
        }
    },
    async handleOpen (key, keyPath) {
      // 每次打开菜单，就会获取到当前打开的菜单的key，将key作为标识，这样就可以点击设备，展示当前设备的信息
      // 只有当点击三级菜单的时候，才会发送请求
      // console.log(Number(key), keyPath)
      // console.log(key);
      // console.log(keyPath);
        // console.log(key)
        this.key = key
        var data = {
          ids: key,
          nowpage: 1,
          pagesize: 10,
          type: ''
        }
        // 通过父传子组件通信，将侧边栏菜单选择信息，传给子组件
        this.meng = data
    },
    async change () {
      let [lable,vaue] = this.jSform.groupName.split('|');
      console.log(lable);
      if (lable == 0) {
        this.$router.push({
          name: 'User'
        })
      } else if (lable == 1) {
        this.pId = vaue
        localStorage.setItem("pId",this.pId);
        this.$store.state.pId = this.pId;
        this.project(this.pId);
      }
    },
    async logout () {
      // 点击注销，将token删除

      this.$confirm('确定注销该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.get('/logout', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        // 如果注销成功，弹出成功弹窗
        if (res.data.status === '201') {
          window.localStorage.clear()
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          // window.location.reload();
          // 点击跳转到登录页面
          this.$router.push({
            name: 'Login'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        });
      });
    },
  }
}
</script>
<style>
html,
body {
  height: 100%;
  background-image:none;
  background: #42475d;
}
a{
  text-decoration: none;
}
img{vertical-align: top;}

.header{
  height: 60px;
  line-height: 60px;
  background: #31374C;
  box-shadow:0px 2px 10px 0px rgba(80,125,255,0.2);
  position: fixed;
  width: 100%;
  z-index: 10;
  color: #fff;
}
.header b{
  margin-left: 199px;
  float: left;
  font-size: 15px;
}
.header .hRight{
  position: absolute;
  right: 0;
}
.header .hRight .mainPng{
  margin:19px 15px 0 0;
}
.header .hRight .userName{
  display: inline-block;
  height: 12px;
}
.header .hRight .delPng{
  margin:21px 20px 0 20px;
}
.el-header{
  padding: 0;
}

.leftNav{
  width:180px;
}
.leftNav .headerLogo{
  width:180px;
  height:60px;
  line-height: 60px;
  color: #fff;
  background:#31374C;
}
.leftNav .headerLogo img{
  width: 25px;
  margin:17px 15px 0 20px;
}
.leftNav .headerLogo b{
  color: #fff;
  font-size: 15px;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #31374C; }
    /* .sidebar-menu > .treeview:hover, .sidebar-menu > .treeview.active{
      background:linear-gradient(90deg,rgba(66,187,255,1),rgba(29,43,54,1));
    } */
    .sidebar-menu > .treeview.active{
      margin-top: 11px;
    }
    .el-menu-item:focus, .el-menu-item:hover{
      background: transparent;
    }
    .el-submenu__title:focus, .el-submenu__title:hover{
      background: transparent;
    }
    .sidebar-menu .treeview-menu {
      background:linear-gradient(90deg,rgba(65,71,95,1),rgba(65,71,95,0));}
        .main-sidebar{
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          min-height: 100%;
          width: 180px;
          z-index: 810;
          background: #31374C;
        }

        .countent{
           background:#42475d;
           margin-left: 180px;
           padding: 82px 20px 60px 20px;
           /* overflow: auto; */
           min-height: 100%;
           /* position: fixed; */
         }
         .countent .divActive{
           background: transparent;
         }
         .countent .weatherMonitor .divActive{
           padding: 30px 0 19px 0;
           height: 129px;
           width: 100%;
           margin-bottom: 30px;
           box-sizing: border-box;
         }
         .countent .weatherMonitor .divActive .MonitorTab{
           height: 61px;
           border-right: 1px dashed #dde3ff;
           float: left;
           width: 25%;
           text-align: center;
           box-sizing: border-box;
         }
         .countent .weatherMonitor .divActive .MonitorTab:last-child{
           border-right: none;
         }
         .countent .weatherMonitor .divActive .MonitorTab img{
           position: relative;
           top: -15px;
         }
         .countent .weatherMonitor .divActive .MonitorTab p{
           font-size: 16px;
           color: #666666;
         }
         .el-menu{
           border-right: 0;
         }
         .navTag{
           display: none;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active p{
           color: #000;
           font-weight: bold;
           position: relative;
           bottom: 9px;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active .navTag{
           display: block;
           margin: 0 auto;
           position: relative;
           top: -18px;
           width: 72px;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active .navTagActive{
           display: none;
         }
         .sidebar-menu>.router-link-active{
           display: block;
           /* background:linear-gradient(90deg,rgba(66,187,255,1),rgba(29,43,54,1)); */
         }
         .sidebar-menu>.router-link-active>li>i{
           color: #fff;
         }
         .sidebar-menu>.router-link-active>.is-active,.sidebar-menu>a>.is-active{
           color: #fff;
         }
         .iconList{
           margin: 0 8px;
         }
         /* .leftList{
           color: #555555!important;
         } */
         .router-link-active li{
           color: #fff;
         }
         .omit img{
           margin-top: 22px;
         }
         .shouyeqh .el-submenu__title{
           padding-left: 8px!important;
         }
         .el-submenu__title i{
           color: #fff;
         }
         .shouyeqh .el-submenu__title span{
           display: inline-block;
          border: 1px solid #5D6C94;
          height: 34px;
          line-height: 34px;
          width: 155px;
          border-radius: 4px;
          padding-left: 8px;
         }
         .el-submenu__icon-arrow{
           top: 54%;
         }
         .listImg{
           margin-top: 23px;
           margin-right: 15px;
         }
         .iconList2{
           margin: 12px 17px 0 0;
         }
         .el-dropdown-menu .router-link-active li{
           color:#333333;
         }
         .el-checkbox{
           width: 125px;
           display: block;
           margin-left: 30px;
           height: 47px;
           line-height: 47px;
         }
         .treeviewMenu{
              background: #292E42;
         }
         .sidebar-menu>div>.router-link-active>li,.sidebar-menu>div>.is-opened{
           background:linear-gradient(90deg,rgba(65,71,95,1),rgba(65,71,95,0));
         }
         .sidebar-menu>div>.router-link-active>li .blueBorder{
           display: block;
           background-image: url("../assets/blue-border.png");
            position: absolute;
            height: 56px;
            width: 3px;
            left: 2px;
         }
</style>
