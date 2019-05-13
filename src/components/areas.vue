<template>
  <el-cascader size="large" :options="options" :disabled="isdis" change-on-select filterable v-model="selectedOptions" @change="handleChange"></el-cascader>
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
    disabledArea:{
      type:Boolean
    }
  },
  data () {
    return{
      options: regionData,
      CodeToText,
      TextToCode,
      code:"",
      selectedOptions: [],
      isdis: false,
    }
  },
  created(){
    this.isdis = this.disabledArea;
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
        let regionCode = '';
        if(_this.areassq[2].length>0){
          regionCode = _this.TextToCode[_this.areassq[0]][_this.areassq[1]][_this.areassq[2]].code
        }
        _this.selectedOptions.push(provinceCode,cityCode,regionCode)
      }else{
        _this.selectedOptions=[]
      }
    }
  },
  watch: {
    areassq: function(){
      this.getRegionCode();
    },
  }

}
</script>
