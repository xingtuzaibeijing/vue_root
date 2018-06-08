/**
 * Created by superman on 17/2/16.
 */
import "babel-polyfill"
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    URL:types.URL,
    token: null,
    cname: null,
    uid: null,
    userAccount: [],
    auditStatus:[
    {"status_label":"待审批","status_key":"10"},
    {"status_label":"已取消","status_key":"12"},
    {"status_label":"已驳回","status_key":"14"},
    {"status_label":"审批通过","status_key":"16"},
    {"status_label":"待发送","status_key":"18"},
    {"status_label":"发送中","status_key":"20"},
    {"status_label":"发送成功","status_key":"22"},
    {"status_label":"失败","status_key":"24"}
        ],
    title: '',
    //选项卡
    tags: [
      {"label": "后台总览", "name": "Mian", "closable": false},
    ],
    menus: [],
    //当前选中选项卡
    cacheTag: "Mian",
  },
  mutations: {
    [types.CHANGE]: (state, data) => {
      state.cacheTag = data;
    },
    userAccount: (state, data) => {
      state.userAccount = data;
    },
    cname: (state, data) => {
      state.cname = data;
    },
    menus: (state, data) => {
      state.menus = data;
    }
    ,
    deleteTag: (state, tab) => {
      let tags = state.tags;
      let newTags = [];
      for (let i = 0; i < tags.length; i++) {
        if (i == tab) {
          continue;
        }
        newTags.push(tags[i]);
      }
      state.tags = newTags;
    },
    addTab: (state, tab) => {
      state.tags.push(tab);
    },
    [types.LOGIN]: (state, data) => {
      state.token = data.token_no;
      state.uid = data.uid;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    getTags: (state, data) => {
      state.tags = data;
    },
    closeOthers:(state)=>{
        let length=state.tags.length;
        let tags=state.tags;
        for (var i = tags.length - 1; i >= 0; i--) {
          let tag =tags[i]
          if(tag.name!='Mian'&&tag.name!=state.cacheTag){
               state.tags.splice(i, 1);
            }
        }
    },
    closeAll:(state)=>{
      for (var i = state.tags.length - 1; i >= 0; i--) {
            let tag=state.tags[i];
            if(tag.name!='Mian'){
                state.tags.splice(i, 1);
            }
        }
    },
  }
})
