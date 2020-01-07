import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
     checkList:[],
     pros:[],
     pId:'',
     //要设置的初始属性值
   };
const getters={
   getCheckList: state => {
     return state.checkList;
   },
   getpId: state => {
     return state.pId;
   }
};
const store = new Vuex.Store({
  state,
  getters
});

export default store;
