<template>
  <div class="home">
    <table-box :tableData='tableData'
               :tableHeader='tableHeader'
               :isSelect='true'
               @cellClick='handleCellClick'
               @handleSelectionChange='handleSelectionChange'
               @hanldeClick='handleDeital'
               style="width:700px;margin:0 auto">
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="text"
                     @click="handleDeital(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </table-box>
    <table-box :tableData='tableData'
               :tableHeader='tableHeader'
               style="width:700px;margin:50px auto">
    </table-box>
  </div>
</template>

<script>
const dataJson = require( '../utils/table.json' );

import TableBox from '../components/TableBox.vue';

export default {
  name: 'Home',
  components: {
    TableBox
  },
  data () {
    return {
      tableData: dataJson.tableData,
      tableHeader: dataJson.tableHeader
    };
  },
  methods: {
    handleEdit ( row ) {
      console.log( row );
    },
    handleDeital ( row ) {
      console.log( row );
    },
    handleCellClick ( clickEventName, row ) {
      console.log( clickEventName, row );
    },
    handleSelectionChange ( val ) {
      console.log( val );
    }
  }
};
</script>
