<template>
    <el-form-item label="地址定位" class="mapposition is-required">
      <el-input v-model="mapsearch"></el-input>
      <el-button type="primary"  icon="el-icon-search" @click="search(mapsearch)" class="mapsearch">查询</el-button>
      <div id="container"></div>
    </el-form-item>
</template>

<script>
export default {
  props: {
      mapsearch:{
        type: String
      },
      dataState:{
        type: Boolean
      }
  },
  data () {
    return{
      markersArray:[],
      geocoder:"",
      MapX:"",
      MapY:"",
    }
  },
  mounted:function(){
    this.init()
    this.defaultSearch()
  },
  methods: {
    init:function () {
      var _this = this;
      var center = new qq.maps.LatLng(39.908815,116.397357);
      var map = new qq.maps.Map(document.getElementById('container'),{
          center: center,
          zoom: 13
      });
      var marker = new qq.maps.Marker({
        map: map
      });
      //调用地址解析类
      this.geocoder = new qq.maps.Geocoder({
          complete : function(result){
            _this.MapX = result.detail.location.lng;
            _this.MapY = result.detail.location.lat;
            marker.setPosition(result.detail.location);
            map.setCenter(result.detail.location);

          }
      });
    },
    defaultSearch: function(){
      let _this = this;
      setTimeout(function() {
        _this.geocoder.getLocation(_this.mapsearch);
      }, 800);
    },
    search :function() {
      //通过getLocation();方法获取位置信息值
      var _this = this;
      _this.geocoder.getLocation(_this.mapsearch);
      setTimeout(function() {
        let mapxy = [_this.MapX,_this.MapY]
        let inputVal = _this.mapsearch;
        _this.$emit('Location',inputVal);
        _this.$emit('mapxy',mapxy);
      }, 800);
    }

  }
}
</script>
<style lang="less">
  #container{
    width: 670px;
    height: 400px;
    margin: 25px 0 0;
  }
  .mapposition{
    position: relative;
    .el-form-item__content{
      padding-right: 94px;
    }
    .mapsearch{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
