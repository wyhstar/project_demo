<template>
  <el-container>
    <el-aside :style="styleObject">
      <el-menu :default-openeds="selectOpen" :default-active="selectAside" class="el-menu-vertical-demo" background-color="#42485b" text-color="#fff" :collapse="isCollapse1" active-text-color="#20A0FF">
        <!-- 首页 -->
        <el-menu-item v-for="item in asideData.home" :index="item.index" :key="item.index" @click="routerClick(item,item.index)">
          <i :class="item.icon"></i>
          <span slot="title">{{$t(item.name)}}</span>
        </el-menu-item>
        <!-- 表格 -->
        <el-menu-item v-for="item in asideData.table" :index="item.index" :key="item.index" @click="routerClick(item,item.index)">
          <i :class="item.icon"></i>
          <span slot="title">{{$t(item.name)}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <div class="wrapper" :class="{marginLeftVal:isCollapse1==true}">
      <!-- <keep-alive> vue 的缓存 可以去掉 -->
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['isCollapse1'],
  data() {
    return {
      marginLeftVal: false,
      iconState: true,
      styleObject: {
        width: 200
      },
      selectAside: "",
      selectOpen: [],
      asideData: {
        home: [
          {
            router: "/home",
            name: "routers.homepage",
            icon: "iconfont icon-shouye",
            index: "1",
          }
        ],
        table: [
          {
            router: "/tablepage/table",
            name: "routers.table",
            icon: "iconfont icon-biaoge",
            index: "2",
          }
        ],
      },
    };
  },
  created() {
    this.selectAside = sessionStorage.getItem('indexItem');
  },
  methods: {
    routerClick: function(item, index,) {
      sessionStorage.setItem('indexItem',index);
      var host = document.domain;
      if (host == "localhost") {
        this.$router.push({ path: item.router });
        this.selectOpen = [index.split("-")[0]];
      } else {
        var isToken = this.$getCookie("Token");
        if (isToken == "undefined" || isToken == "") {
          window.location.href = "/";
          return;
        }
        this.$router.push({ path: item.router });
        this.selectOpen = [index.split("-")[0]];
      }
    }
  }
};
</script>
<style lang="less">
.el-menu-item-group__title {
  padding: 0;
}
.el-aside {
  width: inherit;
  height: 100%;
  position: fixed;
  left: 0;
  top: 70px;
  padding-bottom: 100px;
  z-index: 999;
  background-color: #42485b;
  .el-menu {
    width: 180px;
    border-right: none;
    .iconfont {
      color: #fff;
    }
  }
  .el-menu--collapse {
    border-right: none;
    width: 64px;
  }
  .el-menu-item.is-active {
    background: #fff !important;
    .iconfont {
      color: #409eff;
    }
  }
}

.el-menu-item-group__title {
  display: none !important;
}
</style>
