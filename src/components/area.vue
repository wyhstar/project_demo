<template>
  <el-form-item :label='labels'>
    <el-cascader style="width: 100%;" size="large" :options="options" change-on-select filterable v-model="selectedOptions" @change="handleChange"></el-cascader>
  </el-form-item>
</template>
<style lang="less">
  .el-cols .el-form-item__label{
    width:110px;
    font-weight: normal;
  }
</style>
<script type="text/ecmascript-6">
import { regionData, CodeToText ,TextToCode} from 'element-china-area-data'
export default {
  props: {
    areassq:{
      type:Array
    },
    labels:{
      type:String
    },
    // 要显示的级别
    levels:{
      type:Number
    }
  },
  data () {
    var transData = this.$clone(regionData);
    if(this.levels == 2){
      for(var i=0;i<transData.length;i++){
        //省
        if(transData[i].children){
          for(var j=0;j<transData[i].children.length;j++){
            //市
            if(transData[i].children[j]){
              if(transData[i].children[j].children){
                transData[i].children[j].children = '';
              }
            }
          }
        }
      }
    }
    return{
      options: transData,
      CodeToText,
      TextToCode,
      code:"",
      selectedOptions: []
    }
  },
  watch:{
    regionData:function(val){
      // console.log(val);
      console.log(123123);
    }
  },
  methods: {
    handleChange () {
        let areaValue = this.CodeToText[this.selectedOptions[0]]+this.CodeToText[this.selectedOptions[1]]+this.CodeToText[this.selectedOptions[2]];
        let areaArry = [this.CodeToText[this.selectedOptions[0]],this.CodeToText[this.selectedOptions[1]],this.CodeToText[this.selectedOptions[2]]]
        this.$emit('areainfo',areaValue);
        this.$emit('areaArry',areaArry);
          this.$emit('getcodes',this.selectedOptions);
    },
    convertTextToCode (provinceText, cityText, regionText) {
      let code = ''
      if (provinceText && this.TextToCode[provinceText]) {
        const province = this.TextToCode[provinceText]
        code += province.code + ', '
        if (cityText && province[cityText]) {
          const city = province[cityText]
          code += city.code + ', '
          if (regionText && city[regionText]) {
            code += city[regionText].code
          }
        }
      }
      return code
    },
    getRegionCode(){
      var _this = this;
      if(Object.prototype.toString.call(_this.areassq) == "[object Array]" && _this.areassq.length > 2){
        let provinceCode = _this.TextToCode[_this.areassq[0]].code
        let cityCode = _this.TextToCode[_this.areassq[0]][_this.areassq[1]].code
        let regionCode = _this.TextToCode[_this.areassq[0]][_this.areassq[1]][_this.areassq[2]].code
        _this.selectedOptions.push(provinceCode,cityCode,regionCode)
      }
    }
  },
  watch: {
    areassq: function(){
      this.getRegionCode();
    }
  }

}
</script>
