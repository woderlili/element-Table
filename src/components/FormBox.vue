<template>
  <div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="题目名称："
                    prop="name">
        <el-input v-model="form.name"
                  @change="handleChangeTitle"></el-input>
        <div style="font-size:12px"
             v-if="form.type === 4">
          填空题请在需要填写答案的地方输入中文（），例如：小明在（）学校上学，今年（）岁
        </div>
      </el-form-item>
      <el-form-item label="题目类型："
                    prop="type">
        <el-select v-model="form.type"
                   placeholder="请选择题目类型"
                   @change="handleChange">
          <el-option v-for="(option,optionIndex) in questionType"
                     :key="optionIndex"
                     :label="option.label"
                     :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难易程度："
                    prop="rate">
        <el-rate v-model="form.rate"></el-rate>
      </el-form-item>
      <el-form-item label="选项设置："
                    prop="question"
                    v-if="form.type != 4">
        <!-- 单选题 多选-->
        <template v-if="form.type === 1 || form.type === 2">
          <el-form-item v-for="(item,index) in form.question"
                        :key="index"
                        :prop="'question.' + index + '.content'"
                        :label="'选项'+ item.label + '：'"
                        :rules="rules.content"
                        label-width="80px">
            <el-input style="width: 78%;display: inline-block;margin-right: 8px;"
                      v-model="item.content"></el-input>
            <el-button class="el-icon-delete"
                       type="text"
                       style="font-size:18px"
                       v-if="form.question.length >4 "
                       @click="handleDelete(form.question,index,item)"
                       title="删除选项"></el-button>
          </el-form-item>
          <el-button @click="handleAdd"
                     :disabled='form.question.length === letter.length'>增加选项</el-button>
        </template>
        <!-- 判断 -->
        <template v-else-if="form.type ===3">
          <el-radio-group v-model="form.radio">
            <el-radio label="正确"></el-radio>
            <el-radio label="错误"></el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="答案："
                    prop="textarea">
        <template v-if="form.answer.length > 1">
          <el-input v-for="(items,index) in form.answer"
          style="margin-bottom:20px"
                    :key="index"
                    type="textarea"
                    v-model="items.jsonContent"></el-input>
        </template>
        <el-input  v-else
                  type="textarea"
                  v-model="form.textarea"></el-input>
      </el-form-item>
      <el-form-item>

        <el-button type="primary"
                   @click="onSubmit">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const dataJson = require( '../utils/table.json' );

export default {
  data () {
    const rateCheck = ( rule, value, callback ) => {
      if ( !value ) {
        callback( new Error( '请选择难易程度' ) );
      } else {
        callback();
      }
    };

    return {
      letter: dataJson.letter,
      form: {
        name: '',
        type: 1,
        rate: 0,
        textarea: '',
        answer: [],
        desc: '',
        question: dataJson.question,
        radio: ''
      },
      questionType: dataJson.questionType,
      rules: {
        name: [
          {required: true, message: '请输入题目名称', trigger: 'blur'},
          {min: 1, max: 200, message: '长度在 1 到 200个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择题目类型', trigger: 'blur'}
        ],
        rate: [
          {required: true, validator: rateCheck, trigger: 'blur'}
        ],
        question: [
          {type: 'array', required: true, message: '请填写选项设置', trigger: 'change'}
        ],
        textarea: [
          {required: true, message: '请输入答案及解析', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入选项内容', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate( ( valid ) => {
        if ( valid ) {
          alert( 'submit!' );
        } else {
          console.log( 'error submit!!' );
          return false;
        }
      } );
    },
    resetForm () {
      this.$refs.form.resetFields();
    },
    // 删除
    handleDelete ( arr, index, item ) {
      arr.splice( index, 1 );
      for ( let i = 0; i < arr.length; i++ ) {
        arr[i].label = this.letter[i];
      }
      this.$set( arr );
    },
    // 新增
    handleAdd () {
      this.form.question.push( {
        label: this.letter[this.form.question.length],
        content: ''
      } );
    },
    handleChange ( val ) {
      if ( val === 1 || val === 2 ) {
        this.form.question = dataJson.question;
      }
      this.form.answer = [];
    },
    handleChangeTitle () {
      if ( this.form.type === 4 ) {
        let testStr = this.form.name;

        testStr = testStr.replace( /\(/g, '（' );
        let testArray = testStr.split( '' );
        let a = testArray.reduce( function ( prev, next ) {
          if ( next in prev ) {
            prev[next]++;
          } else {
            prev[next] = 1;
          }
          return prev;
        }, {} );
        let count = a['（'];

        console.log( count );
        this.form.answer = [];
        for ( let i = 0; i < count; i++ ) {
          this.form.answer.push( {jsonContent: ''} );
        }


      }
    }
  }
};
</script>