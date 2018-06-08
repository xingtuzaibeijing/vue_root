<template class="classname">
  <div id="home">
    <input type="hidden" id="uid" name="uid">
    <input type="hidden" id="tokenNo" name="token_no">
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <div class="layui-logo" onclick="commitHome()"><img src="../static/img/logo.png"/>
        </div>
        <div style="text-align: right; background-color: rgb(36, 38, 46);; float: right;">
          <Dropdown style="margin-top: 20px;margin-right: 20px;"  @on-click="quit">
            <a href="javascript:void(0)" style=" color:white;">
                您好，{{cname}}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="quit" style="text-align: center;">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
          <Menu :open-names="['1']" class="folderMenu" @on-select="selectFn" ref="menu">
            <Submenu :name="menuIndex" :key="'menu'+menuIndex" v-for="(menu,menuIndex) in menus">
              <template slot="title" class="folderMenu">
                <a href="javascript:" >
                  <Icon type="ios-cog" size="20"></Icon>
                  {{menu.mname}}
                </a>
              </template>
              <MenuItem :name="note.mroute" :key="'note'+noteIndex" v-for="(note,noteIndex) in menu.sub_menus"
                        class="nodeMenu myLi"><label :ref="note.mroute" :title="note.mname">{{note.mname}}</label>
              </MenuItem>
            </Submenu>

          </Menu>
        </div>
      </div>
      <div class="layui-body">
        <div class="layui-tab layui-tab-card" style=" margin: 0px;padding-right: 110px;" lay-allowclose="true" >
          <template>
            <Tabs type="card" :value="cacheTag" @on-tab-remove="handleTabRemove" @on-click="changeTag">
              <TabPane v-for="tag in tags" :key="tag.name" :label="tag.label" :name="tag.name" :closable="tag.closable">
                <router-link :to="cacheTag"></router-link>
              </TabPane>
            </Tabs>
          </template>
            <div class="close-all-tag-con">
            <Dropdown  @on-click="handleTagsOption">
               <a href="javascript:void(0)" class=" ivu-btn ivu-btn-primary ivu-btn-large">
                  页面操作
                  <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem name="closeOthers">关闭其他</DropdownItem>
                  <DropdownItem name="closeAll">关闭全部</DropdownItem>
                  <DropdownItem name="reload">刷新当前</DropdownItem>
              </DropdownMenu>
          </Dropdown>
        </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
          <div class="single-page">
             <keep-alive v-if="$route.meta.keepAlive">
                    <router-view  v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view  v-if="!$route.meta.keepAlive"></router-view>
            <div class="layui-footer">
              ©2018上海粒数网络科技有限公司 沪ICP备17046827号-2
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: "Home",
    methods: {
      /**
       * 选择菜单
       */
      selectFn(name) {
        let this_=this;
        let label = this.$refs[name][0].title;
        //添加tab页
        let tab = {
          "label": label,
          "name": name,
          "closable": true
        };
        //判断该选项卡是否已打开
        let booOpen = false;
        for (let e of this.$store.state.tags) {
          if (e.name == name) {
            booOpen = true;
          }
        }
        // 如果已打开
        if (booOpen) {
          this.$store.commit("change", name);
        } else {
          //没有打开
          this.$store.commit("addTab", tab);
          this.$store.commit("change", name);
          localStorage.tags=JSON.stringify(this.$store.state.tags);
        }
        localStorage.cacheTag=name;
        this.$router.push({
          path: name
        });
      },
      changeTag(name) {
        localStorage.cacheTag=name;
        this.$store.commit("change", name);
        this.$router.push('/' + name);
      },
      handleTabRemove(name) {
        if (name != 'Mian') {
          let tags = this.$store.state.tags;
          let index = 0;
          for (let i = 0; i < tags.length; i++) {
            if (tags[i].name == name) {
              this.$store.commit("change", tags[i - 1].name);
              this.$router.push('/' + tags[i - 1].name);
              this.$store.commit("deleteTag", i);
            }
            index++;
          }
        }
      },
      quit(){
        localStorage.clear();
        Cookies.remove('sp_dmp_token');
        Cookies.remove('sp_dmp_uid');
        this.$router.push("/login");
        //跳转到登录清空store
        location.reload();
      },
      handleTagsOption(type){
          if(type=='closeAll'){
            this.$store.commit("closeAll");
            localStorage.tags=JSON.stringify(this.$store.state.tags);
            this.$router.push("Mian")
          }else if(type=='closeOthers'){
            this.$store.commit("closeOthers");
            localStorage.tags=JSON.stringify(this.$store.state.tags);
          }else{
            location.reload();
          }
      }
    },
    data() {
      return {
        shrink: false,
      };
    },
    computed: {
      cacheTag: function () {
        return this.$store.state.cacheTag
      },
      tags: function () {
        return this.$store.state.tags
      },
      cname: function () {
        return this.$store.state.cname;
      },
      menus: function () {
        return this.$store.state.menus;
      }
    },
    created () {
      //每次去访问资源菜单
      this.$api.queryUserLoginInfo().then((r) => {
        this.$store.commit("login", r.data);
        this.$store.commit("menus", r.data.menu_list);
        this.$store.commit("cname", r.data.cname);
        //获取已经开打的tab
        // localStorage.clear();
        if(localStorage.tags!=undefined){
          this.$store.commit("getTags",JSON.parse(localStorage.tags));
        }
        if(localStorage.cacheTag!=undefined) {
          this.$store.commit("change", localStorage.cacheTag);
        }
      });
    }
  }
</script>

<style scoped>
  .nodeMenu {
    background-color: #333;
    color: white;
  }

  .folderMenu {
    background-color: #1c1f23;
  }

  .nodeMenu.myLi.ivu-menu-item:hover {
    background: #009688;
    color: white;
  }
  .ivu-menu-vertical.ivu-menu-submenu-title:hover {
    background: #312d2d;
  }
  .ivu-menu-submenu-title:hover {
    background: #009688;
    color: white;
  }
  .ivu-menu {
    font-size: 16px;
    text-align: left;
  }

  .nodeMenu .myLi .ivu-menu-item {
    padding-left: 0px;
  }

  .ivu-menu-submenu-title {
    padding-left: 0px;
  }

   .ivu-menu-submenu ivu-menu-opened {
     background: #009688;
  }
  .close-all-tag-con{
    padding-top: 4px;
    height: 49px;
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 8px;
    text-align: center;
    width: 110px;
    background: white;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }
</style>
