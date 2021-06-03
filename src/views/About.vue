<template>
  <div class="about">
    <h3 style="text-align:center">创建题目</h3>
    <form-box style="width:600px;margin:0 auto"></form-box>
    <h3 style="text-align:center">动态表单</h3>
    <add-form style="width:600px;margin:0 auto"></add-form>
  </div>
</template>
<script>
import AddForm from '../components/addForm';
import FormBox from '../components/FormBox.vue';
export default {
  components: {FormBox, AddForm},
  data () {
    return {

    };
  }
};
</script>
