<template>
    <el-main class="table_box">
        <!-- 查询条件 -->
        <div class="panel">
            <div class="panel-header">查询条件</div>
            <el-form :inline="true" :model="formInline" class="pt-20">
                <el-form-item label="查询参数">
                <el-input size="medium" placeholder="商户名称" v-model="formInline.orderNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="查询参数">
                    <el-select v-model="formInline.circleName" placeholder="请选择" clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询参数">
                <el-date-picker
                    size="medium"
                    v-model="formInline.placeStartTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择开始日期">
                </el-date-picker>
                <span>~</span>
                <el-date-picker
                    size="medium"
                    v-model="formInline.placeEndTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结束日期">
                </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" icon="el-icon-search" type="primary" @click="onInquiry">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" icon="el-icon-plus" type="success" @click="onAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="tableData"
            :loading="tableLoading"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
        <el-pagination class="pt-20 text-right"
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
    </el-main>
</template>

<script>
export default {
  data() {
    return {
        tableLoading: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, ],
        formInline: {
            orderNo: '',
            circleName: '',
            placeStartTime: '',
            placeEndTime: '',
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        pageSize: 10,
        total: 1,
    }
  },
  created(){

  },
  methods:{
      // 查询
      onInquiry(){
          console.log(111);
      },
      // 分页查询
      handleCurrentChange(val){
          console.log(val);
      },
      // 新增
      onAdd(){
          this.$router.push({
              path: '/tablepage/addTable',
          })
      },
  },
}
</script>

<style lang="less">
</style>
