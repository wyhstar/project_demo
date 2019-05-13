<template>
  <el-container>
    <div class="header">
      <el-header>
        <div class="zoom" @click="openAside">
          <i v-show="opens" class="iconfont icon-icon_paging_left"></i>
          <i v-show="!opens" class="iconfont icon-icon_paging_right"></i>
        </div>
        <div class="header-left">
          KITADMIN 1.0
        </div>
        <div class="header-right">
          <div class="pointer_s mr_30">
            <theme></theme>
          </div>
          <div class="pointer_s mr_30">
            <span class="header-lang" :class="lang == 'cn'? 'is-active': ''" @click="changeCN">中文</span>
            <span>/</span>
            <span class="header-lang" :class="lang == 'en'? 'is-active': ''" @click="changeEN">En</span>
          </div>
          <el-dropdown trigger="click" class="userinfo">
            <div class="pointer_s changec">
              <img class="headimg" :src="headImg" alt="">
              <span class="ml_2">Admin</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown" placement="bottom">
              <div class="down_box">
                <div class="list borb">
                  <i class="el-icon-setting"></i>
                  {{$t('dropDown.setting')}}
                </div>
                <div class="list">
                  <i class="el-icon-close"></i>
                  {{$t('dropDown.logout')}}
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    </div>
  </el-container>
</template>

<script type="text/ecmascript-6">
import theme from '@/components/Theme.vue';
export default {
  components:{
    theme
  },
  data () {
    return{
      opens: true,
      headImg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2802691956,955693789&fm=27&gp=0.jpg',
      lang: 'cn',
    }
  },
  created() {
    this.lang = sessionStorage.lang == undefined?'cn':sessionStorage.lang;
    this.$i18n.locale = sessionStorage.lang == undefined?'cn':sessionStorage.lang;
  },
  methods: {
    // 打开侧边栏
    openAside(){
      this.opens = !this.opens;
      this.$emit('sisterSaid',!this.opens);
    },
    // 点击退出清空cookies
    singout:function(){
      this.$delCookie("Token");
      this.$delCookie("SSData");
      window.location.href="/"
    },
    // 切换中文
    changeCN(){
      this.lang = 'cn';
      this.$i18n.locale = 'cn';
    },
    // 切换英文
    changeEN(){
      this.lang = 'en';
      this.$i18n.locale = 'en';
    },
  }
}

</script>
<style lang="less">
.header{
  background: #373d41;
  width: 100%;
  height: 70px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  .el-header {
    width: 100%;
    padding: 0 20px 0 0;
    height: 100% !important;
    color: #fff;
    line-height: 70px;
    box-shadow: 2px 2px 2px hsla(0,0%,90%,.5);
    .header-left{
      float: left;
      height: 70px;
      font-size: 18px;
    }
    .zoom{
      float: left;
      height: 70px;
      line-height: 70px;
      width: 70px;
      cursor: pointer;
      text-align: center;
    }
    .header-right{
      float: right;
      height: 70px;
      text-align: left;
      overflow: hidden;
      font-size: 15px;
      .pointer_s{
        float: left;
        cursor: pointer;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        .header-lang{
          opacity: .7;
        }
        .is-active{
          opacity: 1;
        }
        .headimg{
          width: 30px;
          height: 30px;
          margin-right: 6px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .userinfo{
        color: #fff;
      }
      .mr_30{
        margin-right: 30px;
      }
    }
  }
}
.zoom:hover{
  background-color: #2a2f32;
  color: #409EFF;
  transition: all .2s;
  -webkit-transition: all .3s;
}
.ml_2{
  margin-right: 2px;
}
.down_box{
 width: 150px;
 height: auto;
 .list{
   line-height: 30px;
   padding: 6px 20px;
   cursor: pointer;
   transition: all .36s;
 }
 .borb{
   border-bottom: 1px solid #EBEEF5
 }
}
.down_box .list:hover{
  color: #409EFF;
}
.pointer_s .el-color-picker{
  vertical-align: middle;
}
.pointer_s .el-color-picker__trigger,
.pointer_s .el-color-picker__color{
  border: none;
}
</style>
