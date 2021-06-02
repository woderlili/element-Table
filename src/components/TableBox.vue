<template >
  <div>
    <el-table :data="tableData"
              :id="id"
              row-class-name="rowClassName"
              :header-cell-style="{
                'background-color': '#f9fafb',
                'border-bottom': '1px #E8E8E8 solid'
              }"
              @cell-click="cellClick"
              @selection-change="handleSelectionChange">
      <el-table-column v-if="isSelect"
                       type="selection"
                       width="55">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHeader"
                       :key="index"
                       :prop="item.code"
                       :label="item.label"
                       :fixed='item.fixed'
                       :width="item.width"
                       :align='item.align'
                       :min-width='item.minWidth'>
        <template slot-scope="scope">
          <div :class="[item.rowStyle,item.taskNameHover]"
               :style="item.styleObj"
               :title="item.isHaveTitle?scope.row[item.code]: ''"
               @click="hanldeClick(item,scope.row)"
            >
            <span class="JH-taskBackMess">
              {{ scope.row[item.code]? scope.row[item.code] :'-'}}
            </span>
          </div>
        </template>
      </el-table-column>
      <!-- 插槽 可添加自己的业务逻辑代码 -->
      <slot></slot>
    </el-table>

  </div>
</template>
<script>
export default {
  name: 'TableBox',
  props: {
    // 是否显示选择框
    'isSelect': {
      type: Boolean,
      default: false
    },
    // 表格数据
    'tableData': {
      type: Array,
      default: []
    },
    // 表头
    'tableHeader': {
      type: Array,
      default: []
    },
    'id': {
      type: Number,
      default: Math.floor( Math.random() * 10 ) + 1
    }
  },

  data () {
    return {
      /*
       * tableData: dataJson.tableData,
       * tableHeader: dataJson.tableHeader
       */
    };
  },
  methods: {
    cellClick ( row, column ) {
      const obj = this.tableHeader.filter( ( item ) => {
        return item.code === column.property;
      } );

      if ( obj[0] && obj[0].isClick ) {
        this.$emit( 'cellClick', obj[0].clickEventName, row );
      }
    },
    handleSelectionChange ( val ) {
      this.$emit( 'handleSelectionChange', val );
    },
    hanldeClick ( item, row ){
      if ( item.taskNameHover ){
        this.$emit( 'hanldeClick', row );
      }
    }
  }
};
</script>
<style lang="scss">
// 表格列
.rowClassName {
  height: 48px;

  td {
    color: #515a6e;
    border-right: none !important;
  }

  .el-table-column--selection .cell {
    padding-left: 10px;
  }

  .oneRow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .twoRow {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 100%;
  }

  .taskName {
    cursor: pointer !important;

  }
  .taskName:hover {
    color: #409EFF;
  }
}
</style>