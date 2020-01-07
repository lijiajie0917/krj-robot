<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
/* .el-input__inner{
  height: 31px!important;
  line-height: 31px!important;
} */
.el-table th, .el-table tr{
  background:transparent!important;
}
.tableDataGroups .has-gutter>tr{
  background: #3F445A!important;
}
.equipmentTable .has-gutter>tr{
  background: #31374C!important;
}
.equipmentTable .has-gutter>tr th .cell{
  color: #44D5FF;
}
.has-gutter tr th{
  text-align: center;
}
.el-table__body tr td{
  text-align: center;
}
.buttomCount>div{
  margin-left:10px;
}
.tableData td{
  border-bottom: 0;
}
.tableData .el-table__body tr:hover>td{
  background: transparent;
}
.el-switch__label--left{
  position: relative;
  left: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right.is-active{
  z-index: 1111;
  color: #fff !important;
}
.el-switch__label--left.is-active{
  z-index: 1111;
  color: #9c9c9c !important;
}
.el-button--text{
  padding: 0!important;
}
.el-table th>.cell{
  color: #fff;
}
.el-table .cell{
  color:#fff;
}
.el-submenu .el-menu-item{
  margin-left: 34px!important;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding: 0!important;
  /* border-left: 1px solid #3c8dbc; */
  text-indent: 3px;
}
.el-menu-item-group__title{
  padding:0!important;
}
.leftList .fa{
  position: relative;
  left: -11px;
}
.el-menu-item.is-active{
  color: #fff!important;
}
.el-table__body tbody{
  background: #3F445A;
}
.el-table td, .el-table th.is-leaf{
  border: none!important;
}
.el-table::before{
  width: 0;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #3B4056!important;
}
.el-table__empty-block{
  background: #3F445A;
}
.groupName input,.robotList div input{
  border: 1px solid rgba(89,104,144,1)!important;
  border-radius: 6px 6px 6px 6px;
  background: transparent!important;
  color: #BFC9D7!important;
  height: 38px;
  line-height: 38px;
}
.robotList div input::placeholder{
  color: #fff;
}
.el-dialog__body .el-form-item__content{
  margin-left: 106px!important;
  width: 179px;
}
.el-dialog__body form>div{
  margin-bottom: 10px;
}
.el-form-item__label,.el-select .el-input .el-select__caret{
  color: #fff!important;
}
.poldialog .el-dialog,.poldialog .el-dialog .el-dialog__body{
  overflow: hidden;
}
.jSform .el-form-item__label{
  color: #666666!important;
}
.chulistatus .el-input i{
  color: #c0c4cc!important;
}
.el-card__header{
  text-align: center;
  font-weight: bold;
  border-bottom: 1px dashed #686D80!important;
  font-size: 18px;
  padding: 7px 0;
}
.leftBorder{
  margin-top: 1.4px;
  margin-right: 5px;
}
.countentWorpList .el-checkbox__label{
  display: none!important;
}
.el-slider__button{
  border: 0.037037rem solid #44D5FF!important;
  background-color: #44D5FF!important;
  width: 10px!important;
  height: 10px!important;
}
.el-slider__bar{
  background: #44D5FF;
}
.jSformrobot .el-form-item__content{
  margin-left: 0!important;
}
.jSformrobot .el-form-item{
  padding: 8px 8px 0 8px;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #fff!important;
}
.el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: #fff!important;
  border-color: transparent!important;
}
.el-checkbox__inner::after{
  -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 0.018519rem solid #000!important;
    border-left: 0!important;
    border-top: 0!important;
    height: 0.12963rem;
    left: 0.074074rem;
    position: absolute;
    top: 0.018519rem;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 0.055556rem;
    -webkit-transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: -webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms,-webkit-transform .15s cubic-bezier(.71,-.46,.88,.6) 50ms;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.el-pager li{
  border: 1px solid rgba(89,104,144,1);
  border-radius: 3px 3px 3px 3px!important;
  color: #fff!important;
  background: transparent!important;
}
.el-pagination.is-background .btn-prev,.el-pagination.is-background .btn-next{
  background-color: transparent!important;
  color: #c0c4cc;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #409EFF!important;
  background: rgba(0,0,0,0.5)!important;
}
.el-pager li.active+li{
  border-left: 1px solid rgba(89,104,144,1);
}
.pageSize{
  float: left;
  margin-top: 32px;
  color: #BFC9D7;
  margin-left: 20px;
}
.countentCen{
  overflow: hidden;
  padding-bottom: 20px;
  box-shadow: 0px 2px 8px 0px rgba(10,11,30,0.3);
  border-radius: 6px;
}
.buttnBlue{
  width: 50px;
  height: 31px;
  line-height: 7px!important;
  padding: 0!important;
  background: #44D5FF;
  margin-top: 3px;
}
.buttnBlue2{
  width: 80px;
  height: 31px;
  line-height: 7px!important;
  padding: 0!important;
  background: #44D5FF;
  margin-top: 3px!important;
  margin-left: 30px!important;
}
.tableDataGroups th.is-leaf{
  border-bottom: 1px dashed rgba(104,109,128,1)!important;
}
.el-menu-item.is-active i{
  color: #44D5FF!important;
}
.el-date-editor{
  float: right;
  width: 180px!important;
}
.el-slider__runway{
  width: 68%!important;
  margin: 0!important;
  margin-top: 10px!important;
}
.el-table:before{
  background-color: transparent!important;
}
.el-table th.el-table-column--selection,.el-table td.el-table-column--selection{
  text-align: left;
}
.el-table-column--selection .cell{
  padding-left: 0;
}
.el-form-item__label{
  padding: 0;
}
</style>
