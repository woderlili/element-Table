<template>
  <div>
    <el-form ref="ruleForm"
             :model="dynamicValidateForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item v-for="(item,index) in dynamicValidateForm.fromData"
                    :key="index"
                    :label="item.label"
                    :rules="item.rulse"
                    :prop="'fromData.' + index + '.value'">
        <el-input v-if="item.type === 'input' "
                  v-model="item.value"></el-input>
        <el-input v-else-if="item.type === 'number'"
                  v-model.number="item.value"></el-input>
        <el-checkbox-group v-else-if="item.type === 'checkbox'"
                           v-model="item.value">
          <el-checkbox v-for="(checkbox,checkboxIndex) in item.option"
                       :key="checkboxIndex"
                       :label="checkbox.value"
                      >{{checkbox.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const dataJson = require( '../utils/table.json' );

export default {
  name: 'AddForm',
  data () {
    return {
      dynamicValidateForm: {
        fromData: dataJson.formData
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm ( formName ) {
      this.$refs[formName].validate( ( valid ) => {
        if ( valid ) {
          alert( 'submit!' );
        } else {
          console.log( 'error submit!!' );
          return false;
        }
      } );
    },
    resetForm ( formName ) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>